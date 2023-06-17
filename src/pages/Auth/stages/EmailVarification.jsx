import React from "react";
import { useNavigate } from "react-router-dom";

import {
  useCreateUserMutation,
  useGetVerificationCodeQuery,
  useVerifyAccountMutation,
} from "../../../redux/API";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Loading from "../../../components/Loading.jsx";
import Logo from "../../../assets/icons/Logo.jsx";

/* <------------- JSX --------------> */
export default function EmailVarification({ Error, form }) {
  //<------ OBJECT DECONSTRACTING ----->
  const { formError, setFormError } = Error;
  const { formData } = form;

  //<---------API CALL --------->
  const [
    createUser,
    { error: regersteringError, isLoading: isRegisteringUser },
  ] = useCreateUserMutation();
  const [
    verifyAccount,
    {
      error: VerificationCodeError,
      isLoading: isSendingVerificationCode,
      data: VerificationCode,
    },
  ] = useVerifyAccountMutation();

  //<-------- REACT ROUTER ------>
  const navigate = useNavigate();
  //<-------- REFS -------->
  const CodeRefs = React.useRef([]);

  //<--------- STATES --------->
  const [resendCountDown, setResendCountDown] = React.useState(4);
  const [ReadyToVerify, setReadyToVerify] = React.useState(false);
  const [CurrentVerificationCode, setCurrentVerificationCode] =
    React.useState();
  //<------ INPUTS EVENT HANDLING ------>
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    const digits = pasteData.slice(0, 6).replace(" ", "").split("");
    if (digits.length >= 6) {
      CodeRefs.current.forEach((inp, index) => {
        inp.value = digits[index];
      });
    }
  };
  const handleInput = (e, index) => {
    if (/\W/.test(e.target.value)) {
      CodeRefs.current[index].style.border = "solid red thin";
      return;
    }

    if (CodeRefs.current[index].value) {
      if (CodeRefs.current[index] && CodeRefs.current[index + 1]) {
        CodeRefs.current[index + 1].focus();
      }
    }
    if (CodeRefs.current.every((x) => x.value)) {
      setReadyToVerify(true);
    } else {
      setReadyToVerify(false);
    }
  };
  const handleSubmit = async () => {
    if (
      CodeRefs.current.every((x) => x.value) &&
      +CodeRefs.current.map((x) => x.value).join("") === VerificationCode
    ) {
      createUser(data);
      if (!isRegisteringUser && !regersteringError) {
        navigate(`/hello`);
      }
    } else {
      setFormError(
        (c) =>
          (c = !CodeRefs.current.every((x) => x.value)
            ? `please submit a valid verificaiton code before submiting your code`
            : !+CodeRefs.current.map((x) => x.value).join("") ===
              VerificationCode
            ? `incorrect verification code`
            : `invalid code`)
      );
    }
  };
  //<------USEEFFECT------->
  React.useEffect(() => {
    verifyAccount(JSON.stringify({ email: `${formData.email}` }))
      .unwrap()
      .then((response) => {
        if (response && response.data) {
          setCurrentVerificationCode(
            JSON.stringify(response.data)?.verificationCode
          );
          console.log(
            `${JSON.stringify(response.data)} : the verification code is `
          );
        } else {
          setFormError(`An error occurred, please try again later.`);
          console.log(response);
        }
      })
      .catch((error) => {
        setFormError(`An error occurred: ${error.message}`);
        console.log(error);
      });
  }, []);

  /* RESEND COUNTER */
  React.useEffect(() => {
    let done = false;
    const resendTimer = setInterval(() => {
      setResendCountDown((current) => current - 1);
      if (resendCountDown <= 0) {
        done = true;
        setResendCountDown(0);
      }
      if (done) clearInterval(resendTimer);
    }, 1000);

    return () => {
      clearInterval(resendTimer);
    };
  }, [resendCountDown]);

  return (
    <div className={`flex h-[100%] w-full items-center justify-center`}>
      <div
        className={`z-[2] flex h-[260px] min-h-[280px] w-[80%] min-w-[380px] max-w-[500px]  flex-col items-center justify-center gap-y-[20px] overflow-hidden rounded-md bg-white bg-opacity-[0.9] px-[25px] backdrop-blur-lg`}
      >
        <div
          className={`flex  h-[30%] w-full items-center  justify-between border border-black `}
        >
          <h2
            className={`w-1/2 self-center   pl-[15px] text-start font-[now] text-[30px] font-semibold  uppercase leading-[26px] `}
          >
            verify your Account
          </h2>
          <p className={`w-[45%] font-[garet] text-[15px] leading-[15px] `}>
            an email was sent to :<b>{formData?.email}</b>
          </p>
        </div>

        <div className={`flex w-full items-center justify-between gap-x-[5px]`}>
          {new Array(6).fill("").map((digit, index) => (
            <input
              onPaste={handlePaste}
              ref={(ref) => (CodeRefs.current[index] = ref)}
              key={`varifyAccount${index}`}
              maxLength={1}
              onInput={(e) => handleInput(e, index)}
              onBlur={(e) =>
                (CodeRefs.current[index].style.border = "solid black thin")
              }
              className={`aspect-square w-[13%] rounded-sm border border-black bg-gradient-to-tl from-gray-50 to-gray-100 text-center font-[opensauce] text-[30px] focus:outline-none`}
            />
          ))}
        </div>

        {/*THE TWO  BUTTONS CONTAINER */}
        <div className={`flex h-[15%] w-full items-center justify-between`}>
          {/* <---- SUBMIT BUTTON ----> */}
          <div
            onClick={handleSubmit}
            style={{
              transition: `background 500ms ease`,
            }}
            className={`group flex h-[100%] w-[45%] cursor-pointer  select-none items-center justify-center  self-start rounded-full border  font-[Poppins] font-semibold hover:bg-black    ${
              ReadyToVerify ? `border-green-700` : `border-black`
            }`}
          >
            <p
              className={`flex items-center justify-center transition-transform duration-[500ms] ${
                ReadyToVerify ? `group-hover:translate-x-[-10px]` : ``
              } group-hover:text-gray-50`}
            >
              <b
                className={` group-hover:text-green-400 ${
                  ReadyToVerify
                    ? `group-hover:text-green-400 `
                    : `group-hover:text-gray-50`
                }`}
              >
                {ReadyToVerify ? `go` : `verify`}
              </b>
            </p>

            <BsArrowRight
              style={{
                transition: `transform 350ms 500ms , opacity 200ms 500ms ease`,
              }}
              className={`absolute translate-x-[15px] text-green-400 opacity-0  ${
                ReadyToVerify
                  ? `group-hover:translate-x-[20px] group-hover:opacity-[1] `
                  : ``
              }`}
            />
          </div>
          {/*<---- RESEND EMAIL BUTTON ---> */}
          <div
            onClick={() => {
              setResendCountDown(70);
            }}
            style={{
              transition: `width 600ms ease-in-out`,
            }}
            className={`relative flex h-[100%] cursor-pointer select-none items-center  justify-center rounded-full border border-black ${
              resendCountDown
                ? `pointer-events-none w-[9.4%] overflow-visible`
                : `pointer-events-auto w-[40%] overflow-hidden`
            }`}
          >
            {/* RESEND COUNT DOWN */}
            <div
              className={`absolute right-[5px] flex aspect-square w-[30px] items-center justify-center    font-[brandinkLight] text-[12px]   font-bold text-black `}
            >
              {/* RESEND COUNT DOWN BG ON READY */}

              <div
                style={{
                  transition: `transform ${
                    resendCountDown ? `0ms 0ms` : ` 500ms 200ms`
                  } , background 300ms ease`,
                }}
                className={`absolute z-[-1] h-full w-full rounded-full border border-orange-500 ${
                  resendCountDown
                    ? `scale-[1] bg-orange-300`
                    : `scale-[17] bg-green-400`
                }`}
              />
              {/* RESEND COUNT DOWN BG ON COUNTING */}
              <div
                style={{
                  transition: `transform 400ms 100ms ease`,
                }}
                className={`absolute z-[-1] h-full w-full rounded-full bg-white ${
                  !resendCountDown ? `scale-[1]` : `scale-[0]`
                }`}
              />
              <p>{resendCountDown}</p>
            </div>
            {/* RESEND TEXT */}
            <div
              className={`flex items-center  justify-center font-[openSauce] text-[14px]`}
            >
              <p
                style={{
                  transition: `opacity 200ms 150ms , transform 400ms 350ms ease`,
                }}
                className={`${
                  !resendCountDown
                    ? `scale-[1] opacity-[1]`
                    : `scale-[0] opacity-0`
                }`}
              >
                Resend
              </p>
              <p
                style={{
                  transition: `transform 600ms ease`,
                }}
                className={`absolute right-[50px] w-max  text-gray-600 ${
                  resendCountDown
                    ? `scale-[1] opacity-[1]`
                    : `scale-0 opacity-0`
                }`}
              >
                {resendCountDown < 64
                  ? `Resend email After `
                  : `Email was Sent `}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

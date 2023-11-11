import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  useCreateUserMutation,
  useVerifyAccountMutation,
  useLoginMutation,
  LocationApi,
  useNotifyMutation,
} from "../../../redux/API";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Loading from "../../../components/Loading.jsx";
import Logo from "../../../assets/icons/Logo.jsx";

/* <------------- JSX --------------> */
export default function EmailVarification({ Error, form, location, ErrorNav }) {
  //<------ OBJECT DECONSTRACTING ----->
  const { formError, setFormError } = Error;
  const { formData, setFormData } = form;
  const { navigateOnClick, setNavigateOnClick } = ErrorNav;
  const { locationData } = location;

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
      mutate: refetchData,
    },
  ] = useVerifyAccountMutation();


React.useEffect(()=> {console.log(VerificationCode)} , [])

  const [
    Notify,
    { error: NotifyingError, isLoading: isNotifying, data: NotificationStatus },
  ] = useNotifyMutation();

  //<-------- REACT ROUTER ------>
  const navigate = useNavigate();

  //<-------- REFS -------->
  const CodeRefs = React.useRef([]);

  //<--------- STATES --------->
  const [resendCountDown, setResendCountDown] = React.useState(70);
  const [ReadyToVerify, setReadyToVerify] = React.useState(false);
  const [CurrentVerificationCode, setCurrentVerificationCode] =
    React.useState();
  const [VerificationAttempt, setVerificationAttempt] = React.useState(1);

  /* <------MEMORIZING VERIFICATIONCODE -----> */
  const CurrentVerificationCodeMemo = React.useMemo(
    () => CurrentVerificationCode,
    [CurrentVerificationCode]
  );

  //<------ INPUTS EVENT HANDLING ------>
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    const digits = pasteData.slice(0, 6).replace(" ", "").split("");
    if (digits.length >= 6) {
      CodeRefs.current.forEach((inp, index) => {
        inp.value = digits[index];
      });
      validRequest();
    }
  };
  const handleInput = (e, index) => {
    if (/\W/.test(e.target.value)) {
      CodeRefs.current[index].style.border = "solid red thin";
      return;
    }
    //focusing on the next input when one is valid
    if (CodeRefs.current[index].value) {
      if (CodeRefs.current[index] && CodeRefs.current[index + 1]) {
        CodeRefs.current[index + 1].focus();
      }
    }
    if (CodeRefs.current.every((x) => x.value)) {
      setReadyToVerify(true);
      validRequest();
    } else {
      setReadyToVerify(false);
    }
  };
  const handleSubmit = async () => {
    if (CodeRefs.current.every((x) => x.value)) {
      validRequest();
    }
  };

  //<------USEEFFECT------->
  //<------ VERIFYING ACCOUNT STATE UPDATE ------>
  const FetchVerificationCode = async () => {
    const VerificationRespond = await verifyAccount({ email: formData.email });
    console.log(VerificationRespond);
    if (VerificationRespond.data) {
      console.log(VerificationRespond);
      setCurrentVerificationCode(VerificationRespond.data.verificationCode);
    }
    if (VerificationRespond.error) {
      console.log(VerificationRespond.error.data);
    }
  };
  const validRequest = async () => {
    if (
      parseInt(CodeRefs.current.map((x) => x.value).join("")) ===
      CurrentVerificationCodeMemo
    ) {
      /* REGISTER REQUIEST HANDLING */
      if (Object.values(formData).length > 2) {
        createUser(formData)
          .then((res) => {
            console.log(res);
            if (res.data) {
              console.log(res.data);
              localStorage.setItem("user", JSON.stringify(res.data));
              if (!isRegisteringUser && !regersteringError) {
                let Redirected = false;
                const redirectTimer = setTimeout(() => {
                  Redirected = true;
                  navigate(`/GetReady`);
                }, 2000);
                Redirected && clearTimeout(redirectTimer);
              } else {
                setFormError(
                  (c) =>
                    (c = `${regersteringError.message} occured while registering user`)
                );
              }
            } else if (res.error) {
              
              setFormError(`${res.error.data} `);
            }
          })
          .catch((err) => setFormError(`an error occured : ${err.message}`));
      } else if (Object.values(formData).length < 3) {
        login(formData).then((res) => {
          if (res.data) {
            if (res.data.admin) {
              Notify({ ip: location.query })
                .then((res) => {
                  if (res.data) {
                    try {
                      localStorage.setItem("user", JSON.stringify(res.data));
                    } catch {
                      setFormData(`please enable cookies to continue`);
                    }
                    navigate("/Dashboard");
                  } else {
                    setFormError(
                      `can't log in as an admin failed to notify admin`
                    );
                  }
                })
                .catch((err) => console.log(err));
            } else {
              localStorage.setItem("user", JSON.stringify(res.data));
              navigate(import.meta.VITE_BASEURL);
            }
          }
        });
      }
    } else {
      /* updating the attemps counter state */
      setVerificationAttempt((c) => c + 1);
      /* Apply some Styling on Wrong Verification Attempt Input */
      CodeRefs.current.map((x) => {
        x.style.border = "solid red thin";
        x.style.rotate = "10deg";

        let done = false;
        const resetErrorStyling = setTimeout(() => {
          x.style.border = "solid black thin";
          x.style.rotate = "0deg";
          done = true;
        }, 2000);
        done && clearTimeout(resetErrorStyling);
      });
    }
  };

  /* console.log(CurrentVerificationCodeMemo); */

  React.useEffect(() => {
    FetchVerificationCode();
  }, []);
  //<---- TOO MANY ATTEMPTS HANDLING ------>
  React.useEffect(() => {
    const AttempsLimit = 15;
    if (VerificationAttempt >= AttempsLimit) {
      setFormError(`too many wrong Attemps , please try again later `);
      let redirected = false;
      const redirestTimer = setTimeout(() => navigate(`/`), 2500);
      redirected && clearTimeout(redirestTimer);
    }

    console.log(VerificationAttempt);
  }, [VerificationAttempt]);

  /* console.log(CurrentVerificationCodeMemo || ""); */

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

  /* <---- REGISTERING THE USER ------> */
  React.useEffect(() => {
    if (isRegisteringUser) {
      CodeRefs.current.forEach((x) => {
        x.style.border = `solid green thin`;
        let validAnimationPlayed = false;
        let resetStyling = setTimeout(() => {
          x.style.border = `solid black thin`;
          validAnimationPlayed = true;
        }, 4000);
        validAnimationPlayed && clearTimeout(resetStyling);
      });
    }
  }, [isRegisteringUser]);

  if (isSendingVerificationCode) return <Logo Menu={false} loading={true} />;
  /* if (VerificationCodeError) setFormError(VerificationCodeError.error.message); */
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
          <p
            className={`w-[45%] truncate font-[garet] text-[15px] leading-[15px]`}
          >
            an email was sent to : <br />
            <b>{formData?.email}</b>
          </p>
        </div>
        {/* CODE INPUTS  */}
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
              style={{
                "--codeInputAt": `${index}`,
                transition: `border 500ms , rotate 400ms ease`,
              }}
              className={`aspect-square w-[13%] rounded-sm border border-black bg-gradient-to-tl from-gray-50 to-gray-100 text-center font-[opensauce] text-[30px] focus:outline-none `}
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
                {isRegisteringUser
                  ? `redirecting`
                  : ReadyToVerify
                  ? `go`
                  : `verify`}
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
            onClick={(e) => {
              if (!resendCountDown) {
                FetchVerificationCode();
                setResendCountDown(70);
              }
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
                {!isSendingVerificationCode
                  ? resendCountDown < 64
                    ? `Resend email After `
                    : `Email was Sent `
                  : `sending `}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

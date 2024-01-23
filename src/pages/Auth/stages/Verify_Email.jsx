import React from "react";
import { useInView } from "react-intersection-observer";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
//ICONS
import { AiOutlineMail } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
//ASSET
import MailSent from "../../../assets/img/MailSent.png";
//API
import { useVerifyAccountMutation } from "../../../redux/API.js";
//COMPONENTS
import Logo from "../../../assets/icons/Logo.jsx";

export default function Verify_Email() {
  //STATES
  const [page_loaded, setPageLoaded] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(15);

  //Router DOM
  const [Auth_Error, setAuth_Error] = useOutletContext().Error;
  const navigate = useNavigate();
  const location = useLocation();

  //API
  const [
    sendVerificationCode,
    {
      data: verification_code,
      isLoading: isSending,
      isSuccess: Sent,
      error: email_verification_error,
    },
  ] = useVerifyAccountMutation();

  console.log(verification_code || email_verification_error);

  //HANDELRS
  const handleResendVerificationCode = (e, insideForm = false) => {
    if (insideForm) e.preventDefault();
    if (Boolean(resendTimer)) return;
    sendVerificationCode({ email: location?.state?.email })
      .then((res) => {
        console.log(res);
        console.log(location);
        if (res.data?.verificationCode) {
          const req = +localStorage.getItem("resend_req") + 1;
          localStorage.setItem("resend_req", JSON.stringify(req));
          /* TODO: add a limit to how many resend requiest can be made  */
          setAuth_Error(false);
          setResendTimer(60 + +localStorage?.resend_req * 10);
        } else if (res.error) {
          setAuth_Error(`something went wrong , please try again later`);
        }
      })
      .catch((err) => console.log(err));
  };

  //USEEFFECT
  React.useEffect(() => {
    if (!location.state) {
      navigate("/");
      return;
    }
    handleResendVerificationCode();
  }, []);
  React.useEffect(() => {
    if (document.readyState === "complete") {
      const loadingPromise = new Promise((res, rej) => {
        setTimeout(() => {
          setPageLoaded(true);
          res();
        }, 100);
      }).then((res) => clearTimeout(res));
    } else {
      console.log(page_loaded);
    }
  }, []);
  React.useEffect(() => {
    const Timer = new Promise((res, rej) => {
      setTimeout(
        () => setResendTimer((prev) => (prev > 0 ? prev - 1 : 0)),
        1000
      );
    }).then(() => clearTimeout(Timer));
  }, [resendTimer]);

  const IsSendingVerificationCodeWindow = () => {
    React.useEffect(() => {
      const verificationCodeLoadingPopover = document.getElementById(
        "verificationCodeLoadingPopover"
      );
      if (!verificationCodeLoadingPopover) return;
      if (isSending) {
        verificationCodeLoadingPopover.showPopover();
        return;
      }
      verificationCodeLoadingPopover.hidePopover();
    }, [isSending]);
    return (
      <div
        id={`verificationCodeLoadingPopover`}
        popover={`manual`}
        className={`hideScroller m-auto  bg-transparent backdrop:bg-black/80`}
      >
        <Logo loading={true} scale={1.1} />
      </div>
    );
  };

  return (
    <div
      className={`flex h-[300px] flex-col items-center justify-center gap-y-[5px]`}
    >
      <IsSendingVerificationCodeWindow />
      {/* THE VERIFY EMAIL ART */}
      <div
        className={` relative flex h-[40%] w-full items-center justify-start overflow-hidden rounded-md bg-gradient-to-tl from-gray-50 to-blue-100 px-[15px]`}
      >
        <img
          style={{
            transition: `opacity 250ms 250ms ease , transform 250ms  250ms ease`,
          }}
          src={MailSent}
          className={`absolute left-[40%] h-auto w-[300px] translate-y-[12%] ${
            page_loaded
              ? `translate-x-0 opacity-100`
              : `translate-x-[100%] opacity-0`
          }`}
        />
        <div
          className={`relative flex h-full  w-[60%] items-center justify-between self-start `}
        >
          <hr
            style={{
              transition: `transform 250ms ease`,
            }}
            className={`absolute h-[80%] w-[1px] origin-top bg-gradient-to-b from-green-500 to-red-500 ${
              page_loaded ? `scale-y-100` : `scale-y-0`
            }`}
          />
          <ul
            className={`flex w-full flex-col   decoration-slice font-[openSauceReg] 
            gap-y-[${100 / 2 - 40}px]`}
          >
            {[
              { stage: "create account", done: true },
              { stage: "verify email", done: false },
              { stage: "provide more info", done: false },
            ].map(({ stage, done }, dot_index) => (
              <div
                key={v4()}
                className={`flex w-full items-center justify-start `}
              >
                {/* THE STAGES DOTS */}
                <span
                  style={{
                    transition: `opacity 500ms ${dot_index * 300}ms ease`,
                  }}
                  className={`absolute left-0 aspect-square  w-[7px] translate-x-[-40%] rounded-full  
                  ${page_loaded ? `opacity-100` : `opacity-0`}
                  ${done ? `bg-green-400` : `bg-red-400`}`}
                />
                {/* THE STAGES  */}
                <p
                  style={{
                    transition: `opacity 500ms ${dot_index * 300}ms ease`,
                  }}
                  className={`pl-[15px] text-sm ${
                    page_loaded ? `opacity-100` : `opacity-0`
                  }`}
                >
                  {stage}
                </p>
              </div>
            ))}
          </ul>
        </div>
      </div>

      {/* THE VERIFY EMAIL BOX */}
      <div
        className={`flex h-[55%] w-[430px] flex-col items-center justify-start gap-y-[10px] overflow-hidden rounded-md bg-gray-50 leading-none`}
      >
        <div
          className={`flex h-[25%] w-full items-center justify-between bg-gray-300/50 px-[15px] `}
        >
          <h2 className={`font-[openSauceReg] text-[20px] `}>
            check your inbox
          </h2>
        </div>
        <div
          className={`relative flex h-[60%] w-full flex-col items-start justify-start gap-y-[15px] px-[15px]`}
        >
          <small className={`font-[garet] text-[.9em]`}>
            we have sent you a verification code to {location.state?.email}
          </small>
          <form className={`relative h-[35px] w-full overflow-x-hidden`}>
            <input
              placeholder="xxxxxx"
              maxLength={8}
              name={"verifyEmailInput"}
              className={`absolute h-full w-[60%]  rounded-sm border border-gray-400 bg-gray-300/70 px-[15px] font-[openSauce] text-lg tracking-[10px] text-gray-900 outline-none `}
            />
            <div
              className={`absolute right-0 flex h-full w-[35%] items-center justify-center rounded-sm border border-black font-[openSauceReg] `}
            >
              <button className={`h-full w-[70%] bg-gray-300`}>confirm</button>
              <button
                onClick={(e) => handleResendVerificationCode(e, true)}
                className={` relative flex h-full w-[30%] items-start justify-center overflow-hidden bg-transparent`}
              >
                <div
                  style={{
                    transition: `transform 350ms cubic-bezier(0.6, 0.04, 0.98, 0.34)`,
                  }}
                  className={`absolute  flex h-[200%] w-full flex-col ${
                    !Boolean(resendTimer)
                      ? `translate-y-[-50%]`
                      : `translate-y-0`
                  }`}
                >
                  {[resendTimer, <CiMail size={18} />].map((SendTimer) =>
                    React.createElement(
                      "div",
                      {
                        key: v4(),
                        className: `w-full h-1/2 bg-transparent z-[1] flex items-center justify-center  `,
                      },
                      SendTimer
                    )
                  )}
                </div>

                <span
                  style={{
                    transition: `transform 250ms ease`,
                  }}
                  className={`pointer-events-none absolute left-[5px] top-[10px]   h-full w-full origin-bottom-right rounded-md bg-green-400/40 mix-blend-multiply
                  ${!Boolean(resendTimer) ? `scale-[2]` : `scale-0`} `}
                />
              </button>
            </div>

            <span
              style={{
                scale: `${
                  document.querySelector(`[name='verifyEmailInput']`)?.value
                    ?.length / 8
                } 1`,
              }}
              className={`absolute bottom-0 h-[3px] w-[60%] origin-left translate-y-full bg-purple-300 `}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

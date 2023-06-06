import React from "react";

export default function EmailVarification({ Error, setErrorBG }) {
  //<-------- REFS -------->
  const CodeRefs = React.useRef([]);
  //<--------- STATES --------->
  const [resendCountDown, setResendCountDown] = React.useState(4);

  //<---------- INHARETED --------->
  const { formError, setFormError } = Error;

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
  };
  //<------USEEFFECT------->

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
            verify your account to start your journy with a wonderful people{" "}
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

        <div className={`flex h-[15%] w-full items-center justify-between `}>
          <div
            className={`h-[100%] w-[45%] self-start rounded-full border border-black`}
          ></div>

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

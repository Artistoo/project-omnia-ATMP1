import React, { useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import {
  useGenerateQRQuery,
  useCreateUserMutation,
} from "../../../redux/API.js";
import Logo from "../../../assets/icons/Logo.jsx";
import { v4 } from "uuid";
import { IoMdCopy } from "react-icons/io";
import { GuardSpinner, SphereSpinner } from "react-spinners-kit";
import { CiCircleCheck } from "react-icons/ci";

export default function QR_Verificaiton() {
  const location = useLocation();
  const navigate = useNavigate();

  const [setAuth_Error] = useOutletContext().Error;
  const [TFAuthReq, setTFAuthReq] = React.useState(false);

  const {
    isLoading: isGeneratingQRCode,
    error: QRCodeError,
    data: QR,
    refetch: RegenerateQR,
  } = useGenerateQRQuery(location?.state?.username);

  console.log(location?.state);

  const [
    create_user,
    {
      isLoading: isCreatingUser,
      error: creatingUserError,
      data: userCreateResponse,
      isSuccess: userCreated,
    },
  ] = useCreateUserMutation();

  React.useEffect(() => {
    RegenerateQR();
  }, []);

  const QR_component = function () {
    return (
      <div
        style={{
          transition: `transform 500ms cubic-bezier(0.68, -0.55, 0.27, 1.55) , background 250ms 400ms cubic-bezier(0.22, 1.2, 0.36, 1.22) `,
        }}
        id={`QR_containerID`}
        className={` absolute z-[5] flex h-full  w-full origin-bottom-right  cursor-pointer select-none  flex-wrap items-center justify-center gap-y-0 rounded-md border-black bg-gray-300 
        `}
      >
        <div
          onClick={(e) => {
            document
              .getElementById("QR_containerID")
              .classList.toggle(`scale-[.15]`);
            document
              .getElementById("QR_containerID")
              .classList.toggle(`bg-gray-200/0`);
          }}
          className={`absolute h-full w-full opacity-0 `}
        />
        {isGeneratingQRCode ? (
          new Array(600).fill(null).map((cube, cubeIndex) => (
            <span
              key={v4()}
              style={{
                animationDelay: `${
                  (Math.random() * 1 + 2) * Math.floor(Math.random() * 1400)
                }ms`,
                animationDuration: "3800ms !important",
              }}
              className={` m-[1px] aspect-square w-[6px]  rounded-sm bg-black/90 
                ${
                  isGeneratingQRCode ? `animate-ping` : `animate-none opacity-0`
                }`}
            />
          ))
        ) : (
          <img src={QR.image} className={`rounded-md `} />
        )}
      </div>
    );
  };

  const handleCreateUser = (QR) => {
    setTFAuthReq(Boolean(QR));
    create_user(
      QR ? { QRtoken: QR, data: location.state } : location.state
    ).then((res) => {
      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data?.user));
        /*  */
        /* Profile/${res.data?.user?._id} */
        navigate(`/AccountAuth/Birth_Date`);
      } else if (res.error.data) {
        setAuth_Error((Object.values(res.error.data) || [])[0]);
      }
    });
  };

  return (
    <div
      className={` flex h-[440px]  w-[340px] flex-wrap items-start justify-center gap-x-[10px]  gap-y-[15px] rounded-md bg-gradient-to-tl from-gray-200 to-zinc-100 p-[10px] md:h-[230px] md:w-[500px] md:flex-nowrap md:items-center md:justify-between`}
    >
      {/* QR BOX CONTAINER */}
      <div
        className={`relative flex h-[250px] w-full min-w-[150px] items-center justify-center rounded-md p-[5px]  md:aspect-square md:h-full   md:w-[230px] md:bg-gray-300/50 `}
      >
        <QR_component />
        <div
          className={`absolute h-full w-full  flex-col items-center justify-center
          ${isGeneratingQRCode ? "hidden" : `flex`} `}
        >
          <div
            className={`relative flex h-full w-full items-center justify-center`}
          >
            <hr
              className={`absolute left-[5px] mx-[2px] h-[60%] w-[1px] bg-gradient-to-b from-transparent via-gray-500 to-transparent `}
            />
            <ul
              className={`flex h-full w-full flex-col items-center justify-center gap-y-[15px] `}
            >
              {[
                { title: "key", value: QR?.key },
                { title: "account name", value: QR?.accountName },
              ].map(({ title, value }, index) => (
                <div
                  className={`flex h-max w-full items-center justify-start gap-x-[15px] pl-[25px] pr-[5px]   text-[13px]`}
                >
                  <span
                    className={`absolute left-[5px] aspect-square w-[6px] translate-x-[-.5px] rounded-full bg-black`}
                  />
                  <p className={`w-[30%] font-[openSauce] leading-none`}>
                    {title}
                  </p>
                  :
                  <p
                    onClick={(e) => {
                      navigator.clipboard.writeText(value);
                      const QR_codeCopiesPopover = document.getElementById(
                        "QR_codeCopiesPopover"
                      );
                      if (!QR_codeCopiesPopover) {
                        setAuth_Error(`couldn't not copy to clipboard`);
                        return;
                      }
                      QR_codeCopiesPopover?.showPopover();
                      const copied = new Promise((res) => {
                        setTimeout(() => {
                          QR_codeCopiesPopover?.hidePopover();
                        }, 1500);
                      }).then(() => clearTimeout(copied));
                    }}
                    className={`w-[70%] cursor-pointer truncate rounded-sm p-[4px] font-[openSauceReg] transition-[background] duration-[220px] hover:bg-gray-300`}
                  >
                    {value}
                  </p>
                  <div
                    popover={`auto`}
                    id={`QR_codeCopiesPopover`}
                    className={`pointer-events-none m-auto h-[30px] w-[100px] select-none  rounded-md border border-black bg-green-100 font-[openSauceReg] backdrop:bg-black/10 `}
                  >
                    <div
                      className={`flex h-full w-full items-center justify-center gap-x-[10px]`}
                    >
                      <IoMdCopy size={17} />
                      <p>Copied</p>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* INPUT & FORM CONTAINER */}
      <div
        className={`relative flex  h-[130px]  w-full min-w-[200px] flex-col items-center justify-center gap-y-[20px] rounded-md font-[openSauceReg] text-[13px] leading-[16px] text-gray-800 md:h-full md:w-[60%] md:gap-y-[5px]`}
      >
        <p>consider using a two factor auth for more security </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={`flex h-[100px] w-full flex-col items-center justify-start gap-y-[15px] md:justify-center`}
        >
          <input
            name={`QR_codeInput`}
            maxLength={6}
            placeholder={`the authentication app code`}
            className={`h-[40px] w-full rounded-md bg-gray-300 pl-[15px] text-gray-700 outline-none placeholder:text-gray-600 `}
          />
          <div
            className={`absolute  bottom-0 flex h-[33px] w-full justify-between gap-x-[5px] `}
          >
            {[
              {
                btnTitle: "maybe later",
                Loading: {
                  in: isCreatingUser && !TFAuthReq,
                  Loader: SphereSpinner,
                },
                onClick: () => {
                  handleCreateUser();
                },
              },
              {
                btnTitle: `confirm`,
                Loading: {
                  in: isCreatingUser && TFAuthReq,
                  Loader: GuardSpinner,
                },

                onClick: (i) => {
                  handleCreateUser(
                    document.querySelector(`[name='QR_codeInput']`).value
                  );
                },
              },
            ].map(({ btnTitle, onClick, Loading }, index) => (
              <button
                key={v4()}
                onClick={onClick}
                style={{
                  transition: ` background 250ms cubic-bezier(0.68, -0.55, 0.27, 1.55) , color 150ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
                }}
                className={`relative flex h-full w-[45%] items-center justify-around   rounded-md border border-black    ${
                  Loading.in
                    ? `bg-black text-gray-100`
                    : `text-gray-600 hover:bg-black hover:text-gray-100`
                }`}
              >
                <p
                  className={`transition-transform duration-[250ms]
                  ${Loading.in ? `translate-x-[-15px]` : `translate-x-0`}`}
                >
                  {btnTitle}
                </p>
                <div
                  className={`absolute right-[10px]   delay-[250ms] ${
                    Loading.in
                      ? `translate-x-0 opacity-100`
                      : `translate-x-[150%] opacity-0`
                  }`}
                >
                  {React.createElement(
                    userCreated ? CiCircleCheck : Loading.Loader,
                    { size: 13 },
                    null
                  )}
                </div>
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

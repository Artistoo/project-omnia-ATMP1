import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

//____________ICONS__________________
import { BiCheckCircle } from "react-icons/bi";
import { MdWarning } from "react-icons/md";
import { useNavigate } from "react-router-dom";


//____________API__________________
import { useChangePasswordMutation } from "../../redux/API";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = React.useState("");
  const [ChangePasswordError, setChangePasswordError] =
    React.useState(`please note that once you reload the page this link is no longer valid
  unless you request a new link`);

  //______________REF _____________________
  const PasswordRef = React.useRef();

  //______________API CALL _____________________
  const [
    changePassword,
    {
      isLoading: isChanging,
      isSuccess: PasswordChanged,
      error: PasswordChangeError,
    },
  ] = useChangePasswordMutation();




  //______________USE EFFECT _____________________
  React.useEffect(() => {
    if (PasswordChanged) {
      let done = false;
      const nav = setTimeout(() => {
        navigate("/");
        done = true;
      }, 5000);
      if (done) clearTimeout(nav);
    }
  }, [PasswordChanged]);

  React.useEffect(() => {
    localStorage.removeItem("Link");
  }, []);





  /* JSX RETURN  */
  return (
    <div
      className={` flex min-h-[600px]  flex-col items-center justify-center font-[openSauceReg] text-gray-300`}
    >
      {/* WARNING */}
      <div
        onClick={() => setChangePasswordError("")}
        style={{
          transition: `transform 300ms 150ms , opacity 250ms  ease-in-out  `,
        }}
        className={`group absolute flex h-[100px] w-[350px] translate-y-[-210px]  scale-[0.95] cursor-pointer  items-center justify-between gap-x-[12px] rounded-md border px-[25px] hover:border-green-200 md:w-[380px] ${
          ChangePasswordError
            ? `translate-y-[-25px] border-gray-200 opacity-100 `
            : `translate-y-[-50px] opacity-0`
        }`}
      >
        <div
          style={{
            transition: `transform 300ms ease-in-out`,
          }}
          className={`flex h-max w-max scale-[3] items-center  justify-center px-[15px] ${
            ChangePasswordError
              ? `translate-y-0 opacity-100`
              : `translate-y-[-30px] opacity-0`
          }`}
        >
          <MdWarning
            style={{
              transition: `transform 250ms , color 300ms ease-in-out`,
            }}
            className={`scale-1  absolute  flex    items-center justify-center group-hover:scale-0  group-hover:text-green-300`}
          />
          <BiCheckCircle
            style={{
              transition: `transform 250ms , color 300ms ease-in-out`,
            }}
            className={`absolute  flex scale-0 items-center    justify-center group-hover:scale-100 group-hover:text-green-300 `}
          />
        </div>

        <p className={` w-[80%] caption-top  text-[0.9rem] `}>
          {ChangePasswordError}
        </p>
      </div>

      <div
        className={`relative h-[190px] w-[350px] overflow-hidden rounded-md bg-gradient-to-tr from-gray-200 to-white px-[12px] md:w-[380px]`}
      >
        {/* CHANGE PASSWORD TITLE */}

        <h2
          className={`my-[10px] flex h-[20%] items-center justify-start font-[Garet] text-[22px] text-gray-900`}
        >
          Choose New Password
        </h2>

        {/* CHANGE PASSWORD INPUT */}
        <div
          className={`flex h-[50%] w-full items-center justify-center border `}
        >
          <input
            ref={PasswordRef}
            onChange={(e) => setNewPassword(e.target.value)}
            type={"password"}
            placeholder={`select a new password `}
            className={`w-full  border border-b-black bg-transparent p-[5px] font-[Poppins] text-black outline-none outline-offset-[2px] placeholder:text-gray-400`}
          />
        </div>

        {/* CHANGE PASSWORD BUTTON */}
        <div
          onClick={() => {
            if (newPassword) {
              changePassword({
                userEmail: JSON.parse(localStorage?.userEmail),
                userPassword: newPassword,
              })
                .then((res) => {
                  if (res?.error) {
                    setChangePasswordError(res?.error?.data?.error);
                  }
                })
                .catch((err) => console.log({ error: err }));
            } else {
              if (PasswordRef.current) {
                PasswordRef.current.style.borderBottom = "solid red thin";
                let done = false;
                const turnDefault = setTimeout(() => {
                  PasswordRef.current.style.borderBottom = "solid black thin";
                  done = true;
                }, 2000);
                if (done) clearTimeout(turnDefault);
              }
            }
          }}
          className={`relative flex w-full items-center justify-center rounded-full border border-black py-[2px] font-[Poppins] text-black`}
        >
          <button>Change Password</button>
          <AiOutlineLoading
            style={{
              transition: `top 250ms , opacity 200ms ease-in-out`,
            }}
            className={`absolute right-[15px] animate-spin text-black ${
              isChanging ? `top-auto opacity-100 ` : `top-[100%] opacity-0`
            }`}
          />
          <BiCheckCircle
            style={{
              transition: `top 250ms , opacity 200ms , transform 250ms , color 350ms ease-in-out`,
            }}
            className={`absolute right-[15px]  text-black ${
              PasswordChanged
                ? `top-auto scale-[1.1] text-green-700 opacity-100`
                : ` top-[100%] scale-[0] text-black opacity-0 `
            }`}
          />
        </div>

        <div
          style={{
            transition: `transform 450ms , opacity 150ms , border 300ms 1000ms ease-in-out`,
          }}
          className={`absolute left-0 top-0 z-[2] flex h-full w-full flex-col  items-center justify-center self-center rounded-md border  bg-gray-950  ${
            PasswordChanged
              ? `translate-y-0 border-green-300 opacity-100`
              : `translate-y-full border-transparent opacity-0`
          }`}
        >
          <BiCheckCircle
            style={{
              transition: `transform 700ms  100ms , opacity 200ms 400ms ease-in-out`,
            }}
            className={` scale-[4] text-green-200 ${
              PasswordChanged
                ? `translate-y-0 opacity-100`
                : `translate-y-full opacity-0`
            } `}
          />
          <p
            style={{
              transition: `transform 700ms 100ms  , opacity 200ms  700ms ease-in-out`,
            }}
            className={` ${
              PasswordChanged
                ? `translate-y-[35px] opacity-100`
                : `translate-y-full opacity-0`
            } `}
          >
            password was changed successfully
          </p>
        </div>
      </div>
    </div>
  );
}

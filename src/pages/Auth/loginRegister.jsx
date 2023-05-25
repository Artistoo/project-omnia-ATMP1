import React from "react";
import axios from "axios";

/* <----- FORM HANDLING LIBRARIES ------> */
import DOMPurify from "dompurify";
//------------ICONS ----------------
import {
  CgArrowAlignH,
  CgArrowBottomLeftR,
  CgArrowBottomRight,
  CgArrowLeftR,
  CgArrowRight,
  CgGoogle,
} from "react-icons/cg";
import { FaMale, FaFemale } from "react-icons/fa";
//-----------ASSETS ------------
import Stars from "../../assets/img/ThreeDStars.png";
/* AVATARS */
/* MALE */
import M1Avatar from "../../assets/img/Characters/Male/No comments 7.png";
import M2Avatar from "../../assets/img/Characters/Male/Teamwork-1.png";
import M3Avatar from "../../assets/img/Characters/Male/No gravity-2.png";
import M4Avatar from "../../assets/img/Characters/Male/No gravity.png";
import M5Avatar from "../../assets/img/Characters/Male/Upstream-8.png";
import M6Avatar from "../../assets/img/Characters/Male/Upstream-4.png";
import M7Avatar from "../../assets/img/Characters/Male/Upstream-7.png";
import M8Avatar from "../../assets/img/Characters/Male/Teamwork-7.png";
import M9Avatar from "../../assets/img/Characters/Male/Teamwork-8.png";
/* FEMALE */
import F1Avatar from "../../assets/img/Characters/Female/Funny Bunny-6.png";
import F2Avatar from "../../assets/img/Characters/Female/Funny Bunny-8.png";
import F3Avatar from "../../assets/img/Characters/Female/No gravity-1.png";
import F4Avatar from "../../assets/img/Characters/Female/Upstream-12.png";
import F5Avatar from "../../assets/img/Characters/Female/Teamwork.png";
import F6Avatar from "../../assets/img/Characters/Female/Upstream-10.png";
import F7Avatar from "../../assets/img/Characters/Female/Teamwork-6.png";

//-----------GLOBAL STATES ---------------
import { useSelector } from "react-redux";
//-----------JSX ------------------
export default function loginRegister() {
  //-----------COMPONENTS-------------
  const RegisterForm = () => {
    const validEmailServiceProviders = [
      {
        name: "Gmail",
        domain: "@gmail",
      },
      {
        name: "Outlook",
        domain: "@outlook",
      },
      {
        name: "Yahoo Mail",
        domain: "@yahoo",
      },
      {
        name: "ProtonMail",
        domain: "@protonmail",
      },
      {
        name: "Zoho Mail",
        domain: "@zoho",
      },
      {
        name: "Apple Mail",
        domain: "@icloud",
      },
      {
        name: "FastMail",
        domain: "@fastmail",
      },
      {
        name: "Tutanota",
        domain: "@tutanota",
      },
      {
        name: "Mail.com",
        domain: "@mail",
      },
      {
        name: "AOL Mail",
        domain: "@aol",
      },
      {
        name: "GMX Mail",
        domain: "@gmx",
      },
      {
        name: "Yandex.Mail",
        domain: "@yandex",
      },
      {
        name: "Mail.ru",
        domain: "@mail.ru",
      },
      {
        name: "ProtonMail",
        domain: "@pm.me",
      },
      {
        name: "Comcast",
        domain: "@comcast",
      },
    ];

    const Password = React.useRef("");

    const [formInputs, setForminputs] = React.useState({
      Req_Type: "up",
      inputs: [
        {
          id: "username",
          placeholder: "user name",
          value: "",
          display: "in",
          match: `/\w+/g`,
          error: {
            empty: "please fill in the lastname input to continue",
            invalid:
              "please make sure the email you entered is of a valid type ",
          },
        },
        {
          id: "lastname",
          placeholder: "lastname",
          value: "",
          match: "",
          error: {
            empty: "please fill in the lastname input to continue",
            invalid:
              "please make sure the email you entered is of a valid type ",
          },
        },
        {
          id: "email",
          placeholder: "email",
          value: "",
        },
        {
          id: "password",
          placeholder: "password",
          value: "",
          ref: Password,
        },
        {
          id: "repeatPassword",
          placeholder: "repeat password",
          value: "",
        },
      ],
    });

    return (
      <div
        className={`py-[5px] min-h-[470px] h-[500px] min-w-[400px] md:w-[42%] max-w-[700px]  w-[80%]
        bg-opacity-[0.8] backdrop-blur-[50px] rounded-md  bg-gray-200 
        px-[15px] 
        flex items-center justify-center flex-col `}
      >
        {/* <--- EXPLAINIG WHAT THIS FORM IS FOR----> */}
        <div
          className={`h-[15%] max-w-[85%] min-w-[470px]  text-gray-800  text-[30px] font-[Garet] font-bold leading-[28px] flex justify-between items-center  border px-[12px]`}
        >
          {/* TEXT */}
          <h2 className={`w-[60%] `}>
            {formInputs.Req_Type === "up"
              ? `register a new user account`
              : "in"
              ? "log in to your account"
              : "forget your password"}
          </h2>
          {/* SIGN IN UP BUTTON */}
          <div
            style={{
              transition: `background 150ms ease-in-out`,
            }}
            onClick={() =>
              setForminputs((current) => ({
                ...current,
                Req_Type: current.Req_Type === "in" ? "up" : "in",
              }))
            }
            className="flex items-center font-[Poppins] font-thin select-none justify-between px-[15px]  h-[35px] w-[140px] hover:bg-opacity-[0.8] hover:bg-black hover:text-gray-200 group text-gray-950 rounded-full border cursor-pointer overflow-hidden relative"
          >
            <CgArrowRight
              style={{
                transition: `color 1000ms 300ms , transform 300ms 300ms ease-in-out `,
              }}
              size={30}
              className="  group-hover:text-gray-200 text-black scale-[0.8]   left-0  translate-x-[-30px]  absolute  group-hover:translate-x-[5px] "
            />
            <span
              className={`w-[65%] h-full text-[18px]   font-[Poppins] flex items-center justify-around group-hover:translate-x-[20px] transition-transform duration-[300ms]  delay-[300ms]`}
            >
              <p>sign</p>
              <div
                className={`w-[30%]  h-[27px] overflow-hidden flex flex-col items-center py-0 justify-end text-[0.9rem]`}
              >
                <p
                  className={`transition-transform duration-[400ms] ${
                    formInputs.Req_Type === "in"
                      ? `translate-y-[105%]`
                      : `translate-y-[0%]`
                  }`}
                >
                  up
                </p>
                <p
                  className={` transition-transform duration-[400ms] ${
                    formInputs.Req_Type === "in"
                      ? `translate-y-[105%]`
                      : `translate-y-[0%]`
                  }`}
                >
                  in
                </p>
              </div>
            </span>
            <CgArrowRight
              style={{
                transition: `color 1000ms  , transform 300ms , opacity 100ms ease-in-out `,
              }}
              size={30}
              className=" fill-green-400 group-hover:text-gray-200 scale-[0.6] group-hover:scale-[0.8] translate-x-[10px] w-[30%] absolute  right-[10px] group-hover:translate-x-[50px]  "
            />
          </div>
        </div>
        {/* <----- FORM INPUTS -----> */}
        <div className={` min-h-[50%] min-w-[470px] max-w-[80%] border`}></div>
        <div className={` min-h-[15%] min-w-[470px] max-w-[80%] border`}></div>
        <div className={` min-h-[15%] min-w-[470px] max-w-[80%] border`}></div>
      </div>
    );
  };

  /* <-------- THE AVATARS ARTWORK -------> */
  const RegisterArt = () => {
    const Avatars = [
      {
        M1Avatar,
        M2Avatar,
        M3Avatar,
        M4Avatar,
        M5Avatar,
        M6Avatar,
        M7Avatar,
        M8Avatar,
        M9Avatar,
      },
      { F1Avatar, F2Avatar, F3Avatar, F4Avatar, F6Avatar, M8Avatar },
    ];
    const [PageLoaded, setPageLoaded] = React.useState(false);
    React.useEffect(() => {
      const handleLoad = () => {
        setPageLoaded(true);
      };
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
      }
      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }, []);
    const AvatarArray = Avatars.map((x) => Object.values(x)).flat();
    return (
      <div
        className={`w-[600px] min-h-[200vh] rotate-[22deg] left-[-260px] translate-y-[-50px] absolute  flex items-center justify-center lg:opacity-[0.5] opacity-[0.2] `}
      >
        {/* DARK SPOT ABOVE */}
        <div
          className={`h-[500px] absolute top-[0px] w-[110%] bg-gradient-to-b from-black via-black   to-transparent opacity-[0.8] z-[1]    pointer-events-none `}
        />
        {/* <------ARTWORK-----> */}
        <div className={`w-full h-full flex border flex-wrap  `}>
          {AvatarArray?.map((Avatarimg, index) => (
            <div
              className={`h-1/4   w-1/3 border hover:scale-[1.03] transition-transform duration-[150ms]`}
            >
              <img
                style={{
                  transition: `opacity 500ms  , transform 400ms ease-in-out`,
                  transitionDelay: `${
                    Math.floor(Math.random() * AvatarArray.length) * 150
                  }ms`,
                }}
                src={Avatarimg}
                className={`object-fit w-full h-full ${
                  PageLoaded
                    ? `opacity-[1] scale-[1]`
                    : `opacity-[0] scale-[1.3]`
                }`}
              />
            </div>
          ))}
        </div>
        {/* DARK SPOT DOWN */}

        <div
          className={`h-[600px] absolute bottom-[170px] w-[110%]  bg-gradient-to-t from-black via-black   to-transparent opacity-[0.8] z-[1] pointer-events-none`}
        />
      </div>
    );
  };

  const Policy = () => {
    <div className="absolute lg:flex hidden"></div>;
  };

  //-----------MAIN SECTION DISPLAY-------------
  return (
    <div
      className={`  flex flex-wrap min-h-[530px]  mt-[40px] items-center justify-center w-full border  mb-[50px]`}
    >
      {/* Artwork */}
      <RegisterArt />
      {/* Register Login Form */}
      <RegisterForm />
      {/* POLICY*/}
      <Policy />
    </div>
  );
}

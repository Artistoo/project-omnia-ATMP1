import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { validEmail } from "../utils/validity";
//____________________ ICONS _______________________
import { MdArrowBack, MdArrowForward, MdMarkEmailRead } from "react-icons/md";
//_____________________ASSETS_______________________
import JOLLYBLAB from "../../public/JollyBlab TabIcon.png";
import { FaQuestion } from "react-icons/fa";
import { FooterContext } from "../context/footerContentProvider";

// ____________MAIN SECTION JSX FUNCTION ______________
export default function () {
  // <----------------COMPONENTS ------------------->

  const navigate = useNavigate();
  const location = useLocation();
  const FooterContent = () => {
    const { FooterContentLinks, setFooterContentLinks } =
      React.useContext(FooterContext);
    const Nav = useNavigate();
    //---------JSX FOOTER CONTENT COMPONENT--------
    return (
      <div
        className={` flex h-full  w-full min-w-[350px]  items-center justify-center `}
      >
        {/* <---------JOLLY BLAB LOGO---------> */}
        <div
          className={` absolute   left-[50px] top-0 hidden h-[450px]  w-[100%] translate-y-[60px]   scale-[1.3] items-center justify-center px-[5px] lg:flex lg:w-[30%]`}
        >
          <span
            className={`flex w-[70%] items-center justify-center  gap-x-[45px] `}
          >
            {/* <------LOGO JOLLY IMAGE-------> */}
            <img src={JOLLYBLAB} className={`aspect-square h-[180px]`} />

            {/* <------LOGO JOLLY TEXT---------> */}
            <span
              className={`flex w-1/2 flex-col items-center justify-center gap-y-[11px] leading-[25px] text-gray-50`}
            >
              <h2
                className={`w-min font-[Poppins] text-[41px] font-bold leading-[38px]`}
              >
                JOLLY blab
              </h2>

              <p className={`font-[Poppins] text-[14px] text-gray-200`}>
                made by artistoo Team
              </p>
            </span>
          </span>
        </div>

        {/* <-----------FOOTER CONTENT------------> */}
        <div
          className={`flex h-[60%] w-[90%] scale-[1.05] items-start justify-around pt-[70px] lg:w-[50%] lg:translate-x-[250px]`}
        >
          {/* <--------FOOTER CONTENT MAPPING---------> */}
          {FooterContentLinks.map((footerLink, index) => (
            <div
              key={`footerLinks${index}`}
              className={`flex flex-col justify-start gap-y-[20px] `}
            >
              {/* <-------FOOTER CATEGORY-------> */}
              <p
                className={`font-[Poppins] text-[18px] font-semibold text-gray-200`}
              >
                {footerLink.category}
              </p>
              {/* <----- FOOTER LINKS -----> */}
              <div>
                {footerLink.links.map((item, index) => (
                  <div
                    onClick={() => Nav("/moreAbout/".concat(item.about))}
                    className={`text-md group relative mb-[5px]  flex min-w-max cursor-pointer flex-row-reverse items-center justify-end gap-x-[0px] font-[BrandinkLight] text-white`}
                  >
                    <p
                      className={`transition-transform group-hover:translate-x-[15px]  `}
                    >
                      {item.about}
                    </p>
                    <MdArrowBack
                      style={{
                        transition: `opacity 200ms , transform 250ms ease-in-out`,
                      }}
                      className={`absolute  left-0  text-gray-200 opacity-0 group-hover:translate-x-[-8px] group-hover:opacity-[1]`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const FooterBoxs = () => {
    const [startTypingFeedBack, setstartTypingFeedBack] = React.useState(false);
    const [readyToEmail, setReadyToEmail] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const handleChange = (e) => {
      if (validEmail(e.target.value)) {
        setEmail(e.target.value);
        setReadyToEmail(true);
      }
    };

    return (
      <div
        className={` flex h-[70%] w-[50%] min-w-[450px] max-w-[100%]   items-start justify-center self-center    md:h-full lg:translate-x-[250px]`}
      >
        {/* <------ THE FEEDBACK BOX -------> */}
        <div
          className={`relative flex min-h-[250px] w-[95%] flex-col items-center justify-around  overflow-hidden rounded-md border border-white bg-gradient-to-l  from-gray-400 via-blue-100 to-gray-50 p-[20px] backdrop-blur-lg md:min-h-[220px] `}
        >
          {/* ------ WHAT TYPA MESSAGE SHOULD I SUBMIT TEXT --------- */}
          <span
            style={{
              transition: "opacity 300ms , transform 400ms ease-in-out",
            }}
            className={`flex h-max w-full items-center justify-between pl-[50px] ${
              startTypingFeedBack
                ? `translate-y-[-30px] opacity-0`
                : `translate-y-[0px]  opacity-[1]`
            }`}
          >
            <p
              className={`max-w-[320px] translate-x-[-20px] self-start font-[Poppins] leading-[15px] `}
            >
              let us know if theres anything we can do to make your expirence
              better
            </p>
            <FaQuestion
              title={`more about ?`}
              className="h-[28px] w-[28px] rounded-full border p-[7px]"
            />
          </span>

          {/* ----------- SUBMIT YOUR FEEDBACK --------- */}
          <h1
            style={{
              transition: `transform 500ms ease-in-out`,
            }}
            className={`ml-[30px] max-w-[50%]  self-start font-[Now] text-[45px] leading-[45px] tracking-[0px] ${
              startTypingFeedBack
                ? "translate-y-[-10px]"
                : "translate-y-[45px] select-none"
            }`}
          >
            SUBMIT YOUR FEEDBACK
          </h1>

          {/* -------FEEDBACK INPUT-------- */}
          <span
            className={`relative  flex h-[40px] w-[98%] transition-transform duration-[500ms]  ${
              startTypingFeedBack ? "translate-y-0" : " translate-y-[-15px]"
            }`}
          >
            <input
              style={{
                transition: `border 450ms  , opacity 300ms 250ms , background 250ms , transform 300ms ease-in-out`,
              }}
              type={"email"}
              placeholder={`submit your email`}
              onChange={handleChange}
              className={`absolute h-full w-full  origin-right  select-none border border-black bg-opacity-[0.3] pl-[15px] font-[brandinkLight] text-[18px]  backdrop-blur-lg placeholder:text-gray-500 focus:bg-opacity-[0.5]  focus:outline-none focus:valid:bg-green-200 ${
                startTypingFeedBack
                  ? " scale-x-[1] bg-gray-200 opacity-[1]"
                  : "scale-x-[0]  bg-transparent opacity-0"
              }`}
            />
            <MdArrowForward
              onClick={() => {
                if (location.pathname?.includes("/contact")) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else if (!readyToEmail) {
                  setstartTypingFeedBack((current) => !current);
                } else {
                  localStorage.setItem("emailSubmited", email);
                  navigate("/contactUs");
                }
              }}
              style={{
                transition: `background 400ms , fill 300ms , transform 200ms ease-in-out`,
              }}
              className={`absolute right-[0] h-full  w-[60px] ${
                location.pathname?.includes("/contactUs")
                  ? `hover:rotate-[-90deg] hover:border-transparent`
                  : `hover:rotate-0`
              } cursor-pointer border border-transparent  fill-gray-200 hover:border hover:border-black hover:bg-transparent hover:fill-gray-950 ${
                readyToEmail ? `bg-green-600` : `bg-black`
              }
              ${!startTypingFeedBack && "scale-[1.2]"} ${
                startTypingFeedBack ? "rounded-0" : "rounded-[5px]"
              }`}
            />
          </span>
        </div>
      </div>
    );
  };

  /* <<< ------ MAIN SECTION JSX -------->>> */
  return (
    <div
      className={`brder relative m-auto flex min-h-[500px] max-w-[1500px] flex-col items-center justify-around py-[20px]`}
    >
      <div
        className={`z-10 flex max-h-[70%] min-h-[300px] w-full flex-col flex-wrap items-center justify-center gap-x-[50px] gap-y-[60px] `}
      >
        <FooterBoxs />
        <FooterContent />
      </div>
    </div>
  );
}

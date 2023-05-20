import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//____________________ ICONS _______________________
import { MdArrowBack, MdArrowForward, MdMarkEmailRead } from "react-icons/md";
//_____________________ASSETS_______________________
import JOLLYBLAB from "../../public/JollyBlab TabIcon.png";
import { FaQuestion } from "react-icons/fa";
import { FooterContext } from "../context/footerContentProvider";
// ____________MAIN SECTION JSX FUNCTION ______________
export default function () {

  
  // <----------------COMPONENTS ------------------->
  const BlueSqaureData = () => {
    /* ----- REACT BLUE SQUARE DATA STATES ------- */
    const [NumbersData, setNumbersData] = React.useState([
      {
        D_one: [new Date().getMonth(), new Date().getFullYear()],
        D_two: "1,450",
        D_three: "new document created",
      },
      {
        D_one: [new Date().getMonth(), new Date().getFullYear()],
        D_two: "450",
        D_three: "new user added",
      },
    ]);

    return (
      <div
        className={`h-[30%] min-h-[360px] w-full bg-gradient-to-b from-blue-700  to-black flex items-center justify-center relative`}
      >
        {/* ----------- BLUE SQUARE LEFT SIDE------------ */}
        <div
          className={`lg:w-1/2  w-[90%] md:absolute left-0 h-[80%] flex justify-center gap-x-[190px] items-start pt-[45px] text-gray-50 text-center`}
        >
          {/* --------------BOXS DATA & CONTAINER ------------ */}
          {NumbersData.map((footerDataBase, index) => (
            <div
              key={`blueSquareDBBOX${index}`}
              className={`
            flex flex-col gap-y-[10px]  leading-[22px] scale-[1.2]`}
            >
              {/* DATE */}
              <div
                className={`flex gap-x-[2px] text-[12px] text-white font-[Poppins] justify-center items-center mb-[5px]`}
              >
                {footerDataBase.D_one.map((date, index) => (
                  <>
                    {!index || "/"}
                    <p>{date}</p>
                  </>
                ))}
              </div>

              {/* NUMBER */}
              <p className={`font-[Poppins] text-[50px] font-bold mb-[15px]`}>
                {footerDataBase.D_two}
              </p>
              {/* NUMBER OF */}
              <p className="text-[13px] font-[Poppins] text-gray-50 w-[100px] leading-[13px]">
                {footerDataBase.D_three}
              </p>
            </div>
          ))}
        </div>
        {/* ----------- BLUE SQUARE RIGHT SIDE------------ */}
        <div></div>
      </div>
    );
  };

  const FooterContent = () => {
    const { FooterContentLinks, setFooterContentLinks } =
      React.useContext(FooterContext);
    const Nav = useNavigate();
    //---------JSX FOOTER CONTENT COMPONENT--------
    return (
      <div
        className={`lg:w-[50%] w-full min-w-[350px]  h-full flex flex-col items-center justify-center `}
      >
        {/* <---------JOLLY BLAB LOGO---------> */}
        <div className={`w-[100%] h-[46%] flex  items-center justify-center `}>
          <span
            className={`w-[70%] flex items-center justify-center  gap-x-[45px] `}
          >
            {/* <------LOGO JOLLY IMAGE-------> */}
            <img src={JOLLYBLAB} className={`h-[180px] aspect-square`} />

            <div className={`w-[1px] h-[140px] bg-white absolute`} />

            {/* <------LOGO JOLLY TEXT---------> */}
            <span
              className={`text-gray-50 w-1/2 flex flex-col leading-[25px] justify-center items-center gap-y-[11px]`}
            >
              <h2
                className={`w-min leading-[38px] text-[41px] font-[Poppins] font-bold`}
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
          className={`flex justify-around items-start pt-[70px] w-[90%] h-[60%] scale-[1.05]`}
        >
          {/* <--------FOOTER CONTENT MAPPING---------> */}
          {FooterContentLinks.map((footerLink, index) => (
            <div
              key={`footerLinks${index}`}
              className={`flex flex-col gap-y-[20px] justify-start `}
            >
              {/* <-------FOOTER CATEGORY-------> */}
              <p
                className={`font-[Poppins] text-[18px] text-gray-200 font-semibold`}
              >
                {footerLink.category}
              </p>
              {/* <----- FOOTER LINKS -----> */}
              <div>
                {footerLink.links.map((item, index) => (
                  <div
                    onClick={() => Nav("/moreAbout/".concat(item.about))}
                    className={`font-[BrandinkLight] text-white text-md group  flex items-center justify-end gap-x-[0px] flex-row-reverse min-w-max relative cursor-pointer mb-[5px]`}
                  >
                    <p
                      className={`group-hover:translate-x-[15px] transition-transform  `}
                    >
                      {item.about}
                    </p>
                    <MdArrowBack
                      style={{
                        transition: `opacity 200ms , transform 250ms ease-in-out`,
                      }}
                      className={`text-gray-200  left-0  group-hover:translate-x-[-8px] opacity-0 group-hover:opacity-[1] absolute`}
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

    return (
      <div
        className={`lg:w-[45%] max-w-[650px] w-full md:h-full h-[70%]  min-w-[450px] flex items-start justify-center  pt-[40px] `}
      >
        {/* <------ THE FEEDBACK BOX -------> */}
        <div
          className={`bg-gradient-to-l from-gray-400 via-blue-100 to-gray-50 border border-white md:min-h-[220px] min-h-[250px] w-[85%] rounded-md overflow-hidden  p-[20px] flex flex-col justify-center items-center backdrop-blur-lg `}
        >
          {/* ------ WHAT TYPA MESSAGE SHOULD I SUBMIT TEXT --------- */}
          <span
            style={{
              transition: "opacity 300ms , transform 400ms ease-in-out",
            }}
            className={`w-full flex justify-around items-center h-max ${
              startTypingFeedBack
                ? `opacity-0 translate-y-[-30px]`
                : `opacity-[1]  translate-y-[0px]`
            }`}
          >
            <p
              className={`self-start translate-x-[-20px] max-w-[320px] leading-[15px] font-[Poppins] `}
            >
              let us know if theres anything we can do to make your expirence
              better
            </p>
            <FaQuestion
              title={`more about ?`}
              className="border rounded-full p-[7px] w-[28px] h-[28px]"
            />
          </span>

          {/* ----------- SUBMIT YOUR FEEDBACK --------- */}
          <h1
            style={{
              transition: `transform 500ms ease-in-out`,
            }}
            className={`text-[45px] leading-[45px]  tracking-[0px] font-[Now]  ${
              startTypingFeedBack
                ? "translate-y-[-10px]"
                : "translate-y-[45px] select-none"
            }`}
          >
            SUBMIT YOUR FEEDBACK
          </h1>

          {/* -------FEEDBACK INPUT-------- */}
          <span
            className={`h-[40px]  transition-transform duration-[500ms] w-[98%] relative flex  ${
              startTypingFeedBack ? "translate-y-0" : " translate-y-[-15px]"
            }`}
          >
            <input
              style={{
                transition: `border 450ms  , opacity 300ms 250ms , background 250ms , transform 300ms ease-in-out`,
              }}
              type={"email"}
              placeholder={`submit your email`}
              className={`w-full h-full absolute  border  font-[brandinkLight] border-black text-[18px] focus:outline-none pl-[15px] select-none origin-right  backdrop-blur-lg focus:valid:bg-green-200 focus:bg-opacity-[0.5]  bg-opacity-[0.3] placeholder:text-gray-500 ${
                startTypingFeedBack
                  ? " opacity-[1] bg-gray-200 scale-x-[1]"
                  : "opacity-0  bg-transparent scale-x-[0]"
              }`}
            />
            <MdArrowForward
              onClick={() =>
                setstartTypingFeedBack((current) => (current = !current))
              }
              style={{
                transition: `background 400ms , fill 300ms ease-in-out`,
              }}
              className={`absolute right-[0] h-full w-[60px] border bg-black fill-gray-200 hover:border hover:bg-transparent hover:fill-gray-950 border-transparent hover:border-black cursor-pointer ${
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
    <div className={`min-h-[600px] h-[850px] flex flex-col relative`}>
      <BlueSqaureData />
      <div
        className={`flex flex-wrap max-h-[70%] min-h-[600px] z-10 translate-y-[-110px] `}
      >
        <FooterContent />
        <FooterBoxs />
      </div>
    </div>
  );
}

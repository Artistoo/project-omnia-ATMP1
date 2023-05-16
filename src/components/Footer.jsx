import React from "react";
import axios from "axios";
//-------------- ICONS ----------------
import { MdArrowBack } from "react-icons/md";
//-----------ASSETS--------------
import JOLLYBLAB from "../../public/JollyBlab TabIcon.png";

/* --------------------MAIN SECTION JSX FUNCTION ------------ */
export default function () {
  /* -------------COMPONENTS---------------- */

  /* -------------BLUE SQUARE DATA-----------------  */
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
          className={`md:w-1/2  w-[90%] md:absolute left-0 h-[80%] flex justify-center gap-x-[190px] items-start pt-[45px] text-gray-50 text-center`}
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

  /* -------------FOOTER CONTENT-------------- */
  const FooterContent = () => {
    /* React state  */
    const [FooterContentLinks, setFooterContentLinks] = React.useState([
      {
        category: "company",
        links: [
          {
            about: "vision",
          },
          {
            about: "our history",
          },
          {
            about: "about us",
          },
          {
            about: "goals",
          },
        ],
      },
      {
        category: "service",
        links: [
          {
            about: "usage",
          },
          {
            about: "tutorial",
          },
          {
            about: "security",
          },
        ],
      },
      {
        category: "social",
        links: [
          {
            about: "twitter",
          },
          {
            about: "instagram",
          },
          {
            about: "github",
          },
        ],
      },
    ]);

    //---------JSX FOOTER CONTENT COMPONENT--------
    return (
      <div
        className={`md:w-[50%] w-full min-w-[350px]  h-full flex flex-col items-center justify-center `}
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

  /* -------------FEEDBACKS BOXS-------------- */
  const FooterBoxs = () => {
    return <div></div>;
  };

  /* <<< ------ MAIN SECTION JSX -------->>> */
  return (
    <div className={`min-h-[600px] h-[850px] flex flex-col relative`}>
      <BlueSqaureData />
      <div
        className={`flex flex-wrap max-h-[70%] min-h-[600px]  z-10 translate-y-[-110px] `}
      >
        <FooterContent />
        <FooterBoxs />
      </div>
    </div>
  );
}

/* 
 const [ContactUe, setContactUs] = React.useState("");
    const [FeedBack, setFeedBack] = React.useState("");
    const [ContactSupportBox, setContactSupportBox] = React.useState([
      {
        title: "contact",
        placeHolder: "get in touch",
      },
      {
        title: "support",
        placeHolder: "send us your Feedback",
      },
    ]);
    const [FooterContent, setFooterContent] = React.useState([
      {
        category: "company",
        links: [
          {
            about: "mission and vision",
          },
          {
            about: "history",
          },
          {
            about: "about",
          },
          {
            about: "goals",
          },
        ],
      },
      {
        category: "service",
        links: [
          {
            about: "usage",
          },
          {
            about: "tutorial",
          },
          {
            about: "security",
          },
        ],
      },
      {
        category: "social",
        links: [
          {
            about: "twitter",
          },
          {
            about: "instagram",
          },
          {
            about: "github",
          },
        ],
      },
    ]); */

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
//_______________ COMPONENTS _____________________
import { FooterContext } from "../../../context/footerContentProvider";

// ____________ ASSETS _________________
import COMMUNITIES from "../../../assets/img/Congrats.png";
import IMPACT from "../../../assets/img/Update.png";
import DISCOVER from "../../../assets/img/Discover.png";
import EARTHPLANT from "../../../assets/img/PLANTS_4.png";

//________________MAIN JSX_______________________
export default function FooterInfo() {
  //<------------USEEFFECT -------------->
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  //<----------- REACT CONTEXT ------------->
  const { FooterContentLinks } = React.useContext(FooterContext);
  //<--------- Link Param Route ----------->
  const { about } = useParams();
  //<------- DYNAMIC CURRENT PAGE ------------>
  const currentPage = FooterContentLinks.filter((FooterObj) => {
    return FooterObj.links.some((FooterLink) => FooterLink.about === about);
  })[0].links.filter((current) => current.about === about)[0];

  /* ________________ COMPONENTS _________________ */

  const JoinButton = ({ currentSection }) => {
    const section = currentSection || currentPage.render[0];
    return (
      <div
        style={{
          transition: `border 500ms , color 200ms, background 300ms ease-in-out`,
        }}
        className={`mt-[70px] relative lg:translate-y-[5px] translate-y-[-5px] flex items-center justify-center w-full h-[50px] bg-black rounded-full text-gray-100 border-transparent border hover:border-black hover:bg-transparent py-[11px] hover:text-gray-950 cursor-pointer group`}
      >
        <button className={` font-[Poppins]     `}>
          {section?.content?.button?.B_text}
        </button>
        {section?.content?.button?.B_image && <img />}
        <img
          style={{
            transition: `transform 400ms ease-in-out`,
          }}
          className={`absolute h-[80%] scale-[0.9] left-[15px] group-hover:rotate-[90deg] group-hover:scale-[1.2]`}
          src={section?.content?.button?.B_image}
        />
      </div>
    );
  };

  //__________________SECTIONS_____________________
  const CurrentPageDynamicDisplay = () => {
    return (
      <>
        {/* <---------- DYNAMIC PAGE DISPLAY ----------> */}
        {currentPage?.render.map((section, index) => (
          /* <------ SECTIONS -------> */

          /* CONTAINER */
          <div
            className={`${
              section?.style?.container
            } w-[90%] min-w-[400px] max-w-[1200px] m-[20px] min-h-[510px] flex items-center justify-around flex-wrap ${
              section?.type.includes("I") &&
              "lg:flex-row flex-col-reverse gap-y-[50px] py-[50px]"
            }`}
          >
            {/* <----------SECTION TEXTS CONTAINER--------> */}
            <div
              className={`
            flex flex-col items-start justify-center text-start gap-y-[20px] 
            ${section?.type.includes("I") ? `lg:w-[43%] w-full ` : `w-full`}`}
            >
              {/* <--------SUBTITLE--------> */}
              <h2
                className={`${section?.style?.subtitle} leading-[32px] text-[45px] mb-[14px] font-semibold`}
              >
                {section?.content?.subtitle}
              </h2>

              {/* <--------PARAGRAPH--------> */}
              <p className={`${section?.style?.para}`}>
                {section?.content?.para.map((p) => (
                  <p>{p}</p>
                ))}
              </p>

              {/* <--------BUTTON IF EXISTED--------> */}
              {section?.type.includes("B") && (
                <JoinButton currentSection={section} />
              )}
            </div>

            {/* <-------------IMAGE RENDER IF EXIST ---------> */}
            {section?.type.includes("I") && (
              <div className={`lg:w-[39%] lg:h-full min-w-[250px]`}>
                <img
                  src={section?.content?.image}
                  className={`w-full h-auto scale-[1.3] lg:scale-[1.6]`}
                />
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  const FooterInfoPageDisplay = () => {
    /* <----------STATES -------------> */
    const [FooterInfoPagesBoxs, setFooterInfoPagesBoxs] = React.useState([
      {
        style: {
          bg: `bg-white `,
          circle: "bg-blue-600",
          text: "text-gray-800",
        },
        img: COMMUNITIES,
        title: "inspiring communities",
        text: "vibrant platform dedicated to connecting individuals from all corners of the world who stand up for the same thing.",
      },
      {
        style: {
          bg: `bg-gradient-to-tl from-pink-200 to-purple-200 `,
          circle: "bg-red-500",
          text: "text-gray-800",
        },
        img: IMPACT,
        title: "creating impact",
        text: "we your voice eco in every corner through out the world and up to the moon",
      },

      {
        style: {
          bg: `bg-gradient-to-tl from-blue-600 to-blue-950 `,
          circle: "bg-blue-500",
          text: "text-gray-100",
        },
        img: DISCOVER,
        title: "meet & discover",
        text: "discover people who are going the same difficulties , or who fight for the same values",
      },
    ]);

    const [startAnimation, setStartAnimation] = React.useState(false);
    /* <------USEINVIEW-------> */
    const [box, boxInViex] = useInView();
    /* <-------- USEEFFECT ---------> */
    React.useEffect(() => {
      if (boxInViex) {
        setStartAnimation(true);
      }
    }, [boxInViex]);

    //<----------------Default Page Display ------------->
    return (
      <>
        <div className="w-[95%] min-w-[320px] max-w-[1400px]  min-h-[600px] bg-gradient-to-l from-gray-100 to-gray-300  gap-y-[100px] py-[60px] flex flex-col items-center justify-center px-[50px] relative ">
          {/* CIRCLE UNDERNEATH THE DEFAULT FOOTERINFO BOX  */}
          <div className="w-[650px] aspect-square rounded-full bg-gradient-to-tl from-blue-800 to-purple-600 absolute blur-[120px] top-0 translate-y-[-160px] scale-x-[1.4] z-[-1]" />

          {/* <--------- FIRST SECTION -- BOXS AND MAIN BOX TITLE ------------> */}
          <div className={`flex flex-col gap-y-[100px] `}>
            {/* <----------- TEXT PART -----------> */}
            <div
              className={` w-full flex-wrap flex flex-col gap-y-[20px] lg:items-start items-center justify-center lg:text-start text-center `}
            >
              {/* MAIN BOX FIRST SECTION TITLE */}
              <h2
                className={`uppercase lg:text-[55px] text-[60px] text-slate-900  font-[Now] leading-[55px] tracking-tighter w-min  `}
              >
                inspiring connections
              </h2>
              <p
                className={`text-md font-[Poppins] text-black leading-tight lg:w-[60%] lg:break-words w-[90%]  text-[18px]`}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
                quis totam dolore molestias. Temporibus deserunt a quis culpa
                amet? Provident cum, nulla dolor corporis illo enim quaerat
                tempora debitis officiis!
              </p>
            </div>

            {/*<--------- BOXS -----------> */}
            <div
              ref={box}
              className={`flex items-center justify-around  w-[90%]  border  flex-wrap self-center m-auto gap-y-[45px] gap-[35px] lg:justify-start lg:translate-x-[-30px] `}
            >
              {FooterInfoPagesBoxs.map((footerInfoBox, index) => (
                <div
                  key={`footerInfoBoxN${index}`}
                  className={`flex flex-col lg:w-[30%] w-full lg:min-w-[230px] max-w-[320px]  min-h-[400px]  border border-black gap-y-[23px] py-[10px] group cursor-pointer scale-[1.1] ${footerInfoBox.style.text} ${footerInfoBox.style.bg} `}
                >
                  {/* <--------- BOX IMAGE & CIRCLE ---------> */}
                  <div
                    className={`pointer-events-none h-[200px] flex items-center justify-center p-[10px] `}
                  >
                    <img
                      style={{
                        transition: `transform 430ms , opacity 300ms ease-in-out`,
                        transitionDelay: `${index * 500}ms`,
                      }}
                      src={footerInfoBox.img}
                      className={`scale-[1.01] w-full h-auto z-[1]  ${
                        !index && `scale-[1.2] g`
                      } ${
                        startAnimation
                          ? ` opacity-[1] translate-y-0 `
                          : `opacity-[0] translate-y-[-30px]`
                      }`}
                    />
                    <div
                      style={{
                        transition: `opacity 530ms , transform 550ms ease-in-out`,
                        transitionDelay: `${index * 500}ms`,
                      }}
                      className={`absolute w-[250px] h-[250px] rounded-full blur-[100px]  scale-[1.1] ${
                        footerInfoBox.style.circle
                      }  ${startAnimation ? `opacity-[0.2]` : `opacity-[0.4]`}`}
                    />
                  </div>
                  {/* <---------- BOX TEXT ----------> */}
                  <div
                    className={`pointer-events-none flex flex-col items-start justify-center px-[15px] py-[10px] gap-y-[10px]`}
                  >
                    <h2
                      className={`font-[Now] w-min leading-[25px] uppercase text-[28px]`}
                    >
                      {footerInfoBox.title}
                    </h2>
                    <p className={`font-[Poppins] leading-[19px] text-[16px ]`}>
                      {footerInfoBox.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <----------SECOND SECTION IMAGE AND TEXT ----------> */}
          <div
            className={`min-h-[500px] w-full flex flex-wrap items-center justify-around gap-y-[80px]`}
          >
            {/* <----- SECOND SECTION MAIN BOX IMAGE ------> */}
            <div
              className={`lg:w-[45%] w-[90%] max-w-[350px] min-w-[25px] flex items-center justify-center `}
            >
              <img src={EARTHPLANT} className={`lg:scale-[1.15] scale-[1.1]`} />
            </div>

            {/* <----- SECOND SECTION TEXT & BUTTON MAIN BOX  ------> */}
            <div
              className={`flex flex-col items-center justify-center lg:w-[48%] min-w-[390px] w-[90%] max-w-[600px]  relative `}
            >
              {/* TEXT */}
              <div>
                <h2 className="w-full text-[63px] font-[Now] leading-[55px] tracking-tight uppercase mb-[25px]">
                  join our <h2 className={`text-blue-600`}>fight</h2>
                </h2>
                <p className="font-[Poppins] text-[18px] text-start w-full">
                  {" "}
                  and be part of what you value the most , join a big community
                  like a one big family that shares you the same values , and
                  fight alongside you
                </p>
                <p className="font-[Poppins] text-[18px] text-start w-full">
                  togather to achieve one goal
                </p>
              </div>
              {/* BUTTON */}
              <JoinButton section={currentPage?.render[0]} />
            </div>
          </div>
        </div>
      </>
    );
  };

  /* MAIN DYNAMIC AND DEFAULT PAGES DISPLAY */
  return (
    <div
      className={`flex flex-col items-center justify-center mb-[50px] mt-[60px] relative `}
    >
      <CurrentPageDynamicDisplay />
      <FooterInfoPageDisplay />
    </div>
  );
}

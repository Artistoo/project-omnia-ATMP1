import React from "react";
import { useParams, Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
//_______________ COMPONENTS _____________________
import FooterContentProvider, {
  FooterContext,
} from "../../../context/footerContentProvider";

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
    const { containers, text, img: imgStyling, button } = section?.style;
    return (
      <Link
        style={containers?.button?.style}
        className={containers?.button?.className}
      >
        <p>{section?.elements?.button?.B_text}</p>
        <img className={button?.img} src={section?.elements?.button?.B_image} />
      </Link>
    );
  };
  console.log(currentPage);

  //__________________SECTIONS_____________________
  const CurrentPageDynamicDisplay = () => {
    return (
      <div
        className={`flex min-h-max w-full flex-col items-center justify-center border `}
      >
        {currentPage?.render.map((section, index) => {
          //style
          const {
            containers,
            text: textStyle,
            button: buttonStyling,
            img: imgStyling,
          } = section?.style;
          //Elements
          const { img, text, button } = section?.elements;

          return (
            /* MAIN SECTION CONTAINER */
            <div className={containers?.main}>
              {/* TEXT */}
              <div className={containers?.text}>
                <h2 className={textStyle?.subtitle}>{text?.subtitle}</h2>
                <p className={textStyle?.para}>
                  {text?.para.map((p) => (
                    <p>{p}</p>
                  ))}
                </p>
                {button && <JoinButton />}
              </div>
              {/* IMAGE */}
              {img && (
                <div className={containers?.img}>
                  <img className={imgStyling} src={img} />
                </div>
              )}
            </div>
          );
        })}
      </div>
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
        <div className="relative flex min-h-[600px]  w-[90%] min-w-[320px] max-w-[1400px] flex-col  items-center justify-center gap-y-[200px] bg-gradient-to-l from-gray-100 to-gray-300 px-[50px] py-[60px] ">
          {/* CIRCLE UNDERNEATH THE DEFAULT FOOTERINFO BOX  */}
          <div className="absolute top-0 z-[-1] aspect-square w-[650px] translate-y-[-160px] scale-x-[1.4] rounded-full bg-gradient-to-tl from-blue-800 to-purple-600 blur-[120px]" />

          {/* <--------- FIRST SECTION -- BOXS AND MAIN BOX TITLE ------------> */}
          <div className={`flex flex-col gap-y-[100px] `}>
            {/* <----------- TEXT PART -----------> */}
            <div
              className={` flex w-full flex-col flex-wrap items-center justify-center gap-y-[20px] text-center lg:items-start lg:text-start `}
            >
              {/* MAIN BOX FIRST SECTION TITLE */}
              <h2
                className={`w-min font-[Now] text-[60px] uppercase  leading-[55px] tracking-tighter text-slate-900 lg:text-[55px]  `}
              >
                inspiring connections
              </h2>
              <p
                className={`text-md w-[90%] font-[Poppins] text-[18px] leading-tight text-black lg:w-[60%]  lg:break-words`}
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
              className={`m-auto flex w-[90%]  flex-wrap  items-center  justify-around gap-[35px] gap-y-[45px] self-center border lg:translate-x-[-30px] lg:justify-start `}
            >
              {FooterInfoPagesBoxs.map((footerInfoBox, index) => (
                <div
                  key={`footerInfoBoxN${index}`}
                  className={`group flex min-h-[400px] w-full max-w-[320px] scale-[1.1]  cursor-pointer  flex-col gap-y-[23px] border border-black py-[10px] lg:w-[30%] lg:min-w-[230px] ${footerInfoBox.style.text} ${footerInfoBox.style.bg} `}
                >
                  {/* <--------- BOX IMAGE & CIRCLE ---------> */}
                  <div
                    className={`pointer-events-none flex h-[200px] items-center justify-center p-[10px] `}
                  >
                    <img
                      style={{
                        transition: `transform 430ms , opacity 300ms ease-in-out`,
                        transitionDelay: `${index * 500}ms`,
                      }}
                      src={footerInfoBox.img}
                      className={`z-[1] h-auto w-full scale-[1.01]  ${
                        !index && `g scale-[1.2]`
                      } ${
                        startAnimation
                          ? ` translate-y-0 opacity-[1] `
                          : `translate-y-[-30px] opacity-[0]`
                      }`}
                    />
                    <div
                      style={{
                        transition: `opacity 530ms , transform 550ms ease-in-out`,
                        transitionDelay: `${index * 500}ms`,
                      }}
                      className={`absolute h-[250px] w-[250px] scale-[1.1] rounded-full  blur-[100px] ${
                        footerInfoBox.style.circle
                      }  ${startAnimation ? `opacity-[0.2]` : `opacity-[0.4]`}`}
                    />
                  </div>
                  {/* <---------- BOX TEXT ----------> */}
                  <div
                    className={`pointer-events-none flex flex-col items-start justify-center gap-y-[10px] px-[15px] py-[10px]`}
                  >
                    <h2
                      className={`w-min font-[Now] text-[28px] uppercase leading-[25px]`}
                    >
                      {footerInfoBox.title}
                    </h2>
                    <p className={`text-[16px ] font-[Poppins] leading-[19px]`}>
                      {footerInfoBox.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <----------SECOND SECTION IMAGE AND TEXT ----------> */}
          <div
            className={`flex min-h-[500px] w-full flex-wrap items-center justify-around gap-y-[80px]`}
          >
            {/* <----- SECOND SECTION MAIN BOX IMAGE ------> */}
            <div
              className={`flex w-[90%] min-w-[25px] max-w-[350px] items-center justify-center lg:w-[45%] `}
            >
              <img src={EARTHPLANT} className={`scale-[1.1] lg:scale-[1.15]`} />
            </div>

            {/* <----- SECOND SECTION TEXT & BUTTON MAIN BOX  ------> */}
            <div
              className={`relative flex w-[90%] min-w-[390px] max-w-[600px] flex-col items-center  justify-center lg:w-[48%]`}
            >
              {/* TEXT */}
              <div className={`mb-[30px]`}>
                <h2 className="mb-[25px] w-full font-[Now] text-[63px] uppercase leading-[55px] tracking-tight">
                  join our <h2 className={`text-blue-600`}>fight</h2>
                </h2>
                <p className="w-full text-start font-[Poppins] text-[18px]">
                  {" "}
                  and be part of what you value the most , join a big community
                  like a one big family that shares you the same values , and
                  fight alongside you
                </p>
                <p className="w-full text-start font-[Poppins] text-[18px]">
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
      className={`relative mb-[50px] mt-[60px] flex flex-col items-center justify-center `}
    >
      <CurrentPageDynamicDisplay />
      <FooterInfoPageDisplay />
    </div>
  );
}

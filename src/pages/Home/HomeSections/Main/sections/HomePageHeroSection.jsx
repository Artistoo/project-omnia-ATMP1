import React from "react";
import { v4 } from "uuid";
import { useInView } from "react-intersection-observer";
import { io } from "socket.io-client";
//ICONS
import { AiOutlineArrowRight } from "react-icons/ai";
import { GiCrownCoin } from "react-icons/gi";
import { BiWindowOpen } from "react-icons/bi";
import { MdCancelPresentation } from "react-icons/md";
import { BsQuestionSquare } from "react-icons/bs";

import { AnimatedCounter } from "react-animated-counter";

//COMPONENTS & UTILITIES
import FormatN from "../../../../../utils/formatingNumbers.js";
import Faq from "../../../../landing/notLogedSections/FAQ.jsx";

export default function () {
  //HERO SECTION STATES
  const [HeaderRef, HeaderInView] = useInView({
    threshold: 0.1,
  });
  const [insight, setInsight] = React.useState({});

  //HERO SECTION USE EFFECT
  React.useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKENDSERVER);
    socket.emit(
      "insight Data",
      ["channels_count", "users_count", "Raised"],
      (res) => {
        setInsight(() => {
          if (!Array.isArray(res.data)) return;
          return res.data.map((data, i) => {
            const desc = [
              `channel have created`,
              `members joined`,
              `money raised`,
            ];
            data.desc = desc[i];
            return data;
          });
        });
      }
    );
    return () => socket.disconnect();
  }, []);

  return (
    <header
      ref={HeaderRef}
      className={`my-[30px] flex min-h-[500px] w-full flex-col-reverse flex-wrap items-center  justify-center gap-x-[30px] pt-[110px] lg:flex-row`}
    >
      {/* FAQ POPOVER */}
      <div
        popover={"auto"}
        id={`HeroSectionFaqPopover`}
        className={`hideScroller m-auto h-[500px] w-[500px] min-w-[350px]  overflow-scroll bg-transparent backdrop:bg-black/90  `}
      >
        <div
          className={`relative flex h-auto w-full items-center justify-center rounded-md `}
        >
          <MdCancelPresentation
            onClick={() => {
              const faqPopover = document.getElementById(
                "HeroSectionFaqPopover"
              );
              if (!faqPopover) return;
              faqPopover.hidePopover();
            }}
            className={`absolute right-[20px] top-[50px] z-[5]  scale-y-[1.2] cursor-pointer text-white transition-[color_transform]  hover:text-red-500/80 `}
            size={19}
          />
          <Faq popover={true} />
        </div>
      </div>

      {/* THE TEXT & BUTTONS & INSIGHT */}
      <div
        className={`relative flex h-full min-w-[520px] flex-col items-start justify-start gap-y-[50px]  md:w-full md:justify-center md:px-[55px] lg:w-auto lg:px-[15px] `}
      >
        {/* THE TEXT */}
        <div
          className={`flex  w-full flex-col items-start  justify-center font-[Now] text-[70px] leading-none tracking-tighter text-gray-300 first-letter:uppercase md:text-[60px]  lg:text-[90px] `}
        >
          {[
            "togather",
            "under one",
            [
              "flag",
              "its not your fight alone anyone , get to meet peopel from all over the globe",
            ],
          ].map((txt, index) =>
            !Array.isArray(txt) ? (
              <h2
                key={v4()}
                style={{
                  "--header_text_index": `${index}`,
                }}
                className={`transitHeaderText`}
              >
                {txt}
              </h2>
            ) : (
              <div
                key={v4()}
                className={`flex w-full  items-center justify-start gap-x-[10px] md:gap-x-[20px]  lg:gap-x-[10px]`}
              >
                {txt.map((innerTxt, index) =>
                  !index ? (
                    <h2 key={v4()} className={`transitHeaderText`}>
                      {innerTxt}
                    </h2>
                  ) : (
                    <p
                      key={v4()}
                      className={` relative flex min-h-[80px] w-[230px] translate-x-[10px] items-center text-start  font-[brandinkLight]  text-[16px] leading-tight tracking-normal text-gray-300 [text-wrap:balance] md:absolute md:top-[25px] md:flex  md:w-[45%] md:translate-x-full  md:justify-start md:text-[16px] lg:relative lg:top-1/2  lg:w-[230px] lg:translate-x-[10px] lg:text-[0.15em]`}
                    >
                      {innerTxt}
                    </p>
                  )
                )}
              </div>
            )
          )}
        </div>

        {/* THE BUTTONS */}
        <div
          className={`flex w-full items-center  justify-start gap-x-[15px] md:absolute md:bottom-[10px] md:right-0 md:w-1/2 md:pr-[10px] lg:relative lg:w-full `}
        >
          {[
            {
              title: "start now",
              onClick: () => {
                window.scrollTo({
                  top: window.innerWidth > 1000 ? 580 : 900,
                  behavior: "smooth",
                });
              },
            },
            {
              title: "how to",
              onClick: () => {
                const faqPopover = document.getElementById(
                  "HeroSectionFaqPopover"
                );
                if (!faqPopover) return;
                faqPopover.showPopover();
              },
            },
          ].map(({ title, onClick }, btn_index) => (
            <button
              key={v4()}
              className={`group relative flex h-[40px] w-[48%] translate-x-[-10%] items-center justify-center  rounded-sm font-[openSauceReg] md:-translate-x-[15%]`}
            >
              <div
                onClick={() => onClick()}
                className={`absolute  flex h-full w-[100%] items-center justify-center `}
              >
                <span
                  className={`flex h-full w-[15%] origin-right items-center  justify-center border-[0.5px] border-gray-400 border-r-transparent bg-blue-300 text-black transition-transform md:w-[20%]  ${
                    Boolean(btn_index)
                      ? `translate-x-0 group-hover:translate-x-full`
                      : `translate-x-full group-hover:translate-x-0`
                  }`}
                >
                  {React.createElement(
                    Boolean(btn_index) ? BsQuestionSquare : AiOutlineArrowRight,
                    {
                      size: 19,
                      className: `${
                        !Boolean(btn_index)
                          ? `rotate-[90deg]`
                          : `group-hover:scale-[1.1] delay-[200ms] transition-transform`
                      }`,
                    },
                    null
                  )}
                </span>
                <span
                  className={`z-[4] h-full w-[60%] border-[0.5px] border-gray-400 border-y-gray-400  bg-black ${
                    Boolean(btn_index)
                      ? `border-l-transparent group-hover:border-l-gray-400 group-hover:border-r-transparent`
                      : `border-r-transparent group-hover:border-l-transparent group-hover:border-r-gray-400`
                  }`}
                />
                <span
                  className={`group-hover:roatte-0 flex h-full w-[15%] origin-left items-center  justify-center border-[0.5px] border-gray-400 border-l-transparent bg-gray-300 text-black transition-transform md:w-[20%]  ${
                    Boolean(btn_index)
                      ? `-translate-x-full group-hover:translate-x-0`
                      : `translate-x-0 group-hover:-translate-x-full`
                  }`}
                >
                  {React.createElement(
                    !btn_index ? AiOutlineArrowRight : BiWindowOpen,
                    {
                      size: 19,
                    },
                    null
                  )}
                </span>
              </div>
              <h2 className={`pointer-events-none z-[5]`}>{title}</h2>
            </button>
          ))}
        </div>
        {/* THE INSIGHT */}
        <div
          key={v4()}
          className={` flex  h-[100px] w-[90%] items-center justify-around md:w-1/2 lg:w-[85%] `}
        >
          {Array.isArray(insight) &&
            insight
              .filter((data) => {
                return Boolean(Object.values(data)[0]);
              })
              .map((data, insight_data_index, dataArray) => (
                <div
                  style={{
                    width: 100 / dataArray?.length + "%",
                  }}
                  className={`flex-center relative h-full flex-col`}
                >
                  <div
                    className={`flex  items-end justify-center gap-x-[5px] font-[openSauce] text-[25px] uppercase`}
                  >
                    <AnimatedCounter
                      color="white"
                      decimalPrecision={false}
                      value={
                        +FormatN(Object.values(data)[0])?.match(/\d/g).join("")
                      }
                      fontSize={`40px`}
                    />
                    <strong>
                      {FormatN(Object.values(data)[0])
                        ?.match(/[a-zA-Z]/g)
                        ?.join("") || ""}
                    </strong>
                  </div>
                  <div
                    className={`flex-center w-[90%]  font-[openSauceReg] text-sm `}
                  >
                    <p
                      style={{
                        textWrap: `balance`,
                      }}
                    >
                      {Object.values(data)[1]}
                    </p>
                  </div>

                  {insight_data_index + 1 != dataArray.length && (
                    <hr
                      className={`absolute left-[100%] h-[50%] w-[1px] border-transparent bg-gray-500`}
                    />
                  )}
                </div>
              ))}
        </div>
      </div>

      {/* THE ART  */}
      <div
        className={` flex h-full min-h-[500px] min-w-[450px]  items-center justify-center md:relative md:h-auto`}
      >
        {/* TODO : change the icon or the hero section art */}
        {Array(2)
          .fill("")
          .map((_, i) => (
            <GiCrownCoin
              key={v4()}
              className={`md: absolute h-auto w-[400px] text-gray-300 md:w-[500px] ${
                !i
                  ? `z-[-1]  scale-[2] text-purple-500 opacity-30 blur-[60px]`
                  : ``
              }`}
            />
          ))}
      </div>
    </header>
  );
}

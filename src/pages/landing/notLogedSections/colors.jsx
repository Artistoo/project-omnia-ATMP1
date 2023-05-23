import React from "react";
import { useInView } from "react-intersection-observer";
//________________ ASSETS ____________________
import LinesMask from "../../../assets/mask/LinesMask.png";
export default function colors() {
  const [CreativitySection, CreativitySectioninView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div
      ref={CreativitySection}
      className={`min-h-[500px] flex flex-wrap items-center justify-center px-[20px] gap-y-[30px] mb-[50px] `}
    >
      {/* <------- ARTWORK -----------> */}
      <div
        className={`lg:w-[48%] w-[90%] flex items-center justify-center min-h-[320px] h-[120px] p-[5px] relative `}
      >
        <div
          className={`h-full w-full colorsBG masked absolute scale-[1.1] ${
            CreativitySectioninView ? "animateBg" : ""
          }`}
        />
      </div>

      {/* <------- TEXT -----------> */}
      <div
        className={`flex flex-col items-center justify-center  min-w-[320px] gap-y-[17px] lg:w-[45%] w-[90%] `}
      >
        <h2
          style={{
            transition: `opacity 1500ms , transform 500ms ease-out`,
          }}
          className={`font-[Now] text-gray-50 uppercase text-[65px] leading-[55px] ${
            CreativitySectioninView
              ? `translate-y-[0] opacity-[1]`
              : `translate-y-[50px] opacity-0`
          }`}
        >
          unleash your creativity
        </h2>
        <p className={`font-[brandinkLight] text-gray-100 text-[17px]`}>
          we help you find people who value what you stand for , no one how
          triveal you may think it is , your community always has something to
          offer
        </p>
      </div>
    </div>
  );
}

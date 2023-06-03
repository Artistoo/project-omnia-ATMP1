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
      className={`mb-[10px] flex min-h-[500px] flex-wrap items-center justify-center gap-y-[30px] px-[20px] `}
    >
      {/* <------- ARTWORK -----------> */}
      <div
        className={`relative flex h-[120px] min-h-[320px] w-[90%] items-center justify-center p-[5px] lg:w-[48%] `}
      >
        <div
          className={`colorsBG masked absolute h-full w-full scale-[1.1] ${
            CreativitySectioninView ? "animateBg" : ""
          }`}
        />
      </div>

      {/* <------- TEXT -----------> */}
      <div
        className={`flex w-[90%] min-w-[320px] flex-col  items-center justify-center gap-y-[17px] lg:w-[45%] `}
      >
        <h2
          style={{
            transition: `opacity 1500ms , transform 500ms ease-out`,
          }}
          className={`font-[Now] text-[65px] uppercase leading-[55px] text-gray-50 ${
            CreativitySectioninView
              ? `translate-y-[0] opacity-[1]`
              : `translate-y-[50px] opacity-0`
          }`}
        >
          unleash your creativity
        </h2>
        <p className={`font-[brandinkLight] text-[17px] text-gray-100`}>
          we help you find people who value what you stand for , no one how
          triveal you may think it is , your community always has something to
          offer
        </p>
      </div>
    </div>
  );
}

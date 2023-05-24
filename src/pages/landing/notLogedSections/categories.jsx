import React from "react";
import { useInView } from "react-intersection-observer";
export default function categories() {
  return (
    <div
      className={`bg-gradient-to-tl from-gray-200 to-gray-300 min-h-[500px] py-[30px] `}
    >
      <div className={`w-full flex items-center justify-center `}>
        <h2
          className={`text-[50px] text-gray-950 font-[Now]tracking-[2px] uppercase`}
        >
          preformance
        </h2>
      </div>
      <div></div>
    </div>
  );
}

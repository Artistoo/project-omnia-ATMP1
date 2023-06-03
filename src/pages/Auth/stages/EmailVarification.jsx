import React from "react";

export default function EmailVarification() {
  return (
    <div className={`flex h-[100%] w-full items-center justify-center`}>
      <div
        className={`z-[2] flex h-[260px] min-h-[280px] w-[80%] min-w-[380px] max-w-[500px]  flex-col items-center justify-center gap-y-[15px] rounded-md bg-white bg-opacity-[0.9] px-[12px] backdrop-blur-lg`}
      >
        <div
          className={`flex  h-[30%] w-full items-center  justify-between border border-black `}
        >
          <h2
            className={`w-1/2 self-center   pl-[15px] text-start font-[now] text-[30px] font-semibold  uppercase leading-[26px] `}
          >
            verify your Account
          </h2>
          <p className={`w-[45%] font-[garet] text-[12px] `}>
            verify your account to start your journy with a wonderful people{" "}
          </p>
        </div>
        <div className={`flex w-full items-center justify-between gap-x-[5px]`}>
          {new Array(7).fill("").map((digit) => (
            <input
              maxLength={1}
              className={`aspect-square w-[10%] rounded-sm border border-black bg-gradient-to-tl from-gray-50 to-gray-100 text-center font-[opensauce] text-[30px] focus:outline-none`}
            />
          ))}
        </div>
        <div className={``}></div>
      </div>
    </div>
  );
}

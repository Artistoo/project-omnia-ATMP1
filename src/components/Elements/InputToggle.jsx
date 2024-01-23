import React from "react";

export default function InputToggle({ isCheck, Title, onClick, style }) {
  return (
    <>
      <p>{Title}</p>
      <div
        style={{
          transition: `border 250ms ease`,
        }}
        onClick={onClick}
        className={`relative flex  scale-[1.1] cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-black px-[6px] outline-[1px] 
        ${isCheck ? `border-green-300 ` : `border-red-300`} 
        w-[${style?.width || "32px"}] h-[${style?.height || "32px"}]`}
      >
        <div
          style={{
            transition: `transform 210ms ,  right 210ms  210ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
          }}
          className={`absolute right-0 m-[0.5px] h-[12px] w-[12px]  overflow-hidden rounded-[95%] border-black bg-white ${
            isCheck ? ` translate-x-[110%]` : ` translate-x-[-2px]`
          }`}
        />
        <div
          style={{
            transition: `transform 300ms ,  right 210ms  210ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
          }}
          className={`absolute left-0 m-[0.5px] h-[12px] w-[12px]  overflow-hidden rounded-[95%] border-black bg-white ${
            isCheck ? ` translate-x-[2px]` : ` translate-x-[-110%]`
          }`}
        />
        <p
          style={{
            transition: `transform 250ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
          }}
          className={`font-[openSauceReg] text-[10px] ${
            isCheck ? `translate-x-[70%]` : `-translate-x-[70%]`
          }`}
        >
          {isCheck ? "on" : "off"}
        </p>
      </div>
    </>
  );
}

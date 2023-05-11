import React from "react";

export default function menuIcon({ menuState }) {
  const menuIconStyle = `bg-gray-300 h-[2px] w-full transition-all duration-[1500ms]  ${
    menuState.open ? `bg-black` : `bg-white`
  }`;
  return (
    <>
      {/* Menu Close */}
      <div
        onClick={() => menuState.setOpen((current) => !current)}
        className={` flex-col  w-[30px] h-[25px] gap-y-[5.5px]   md:hidden flex relative left-[80%] group justify-center z-[10]`}
      >
        <hr
          style={{
            transition:
              "transform 1500ms , scale  1500ms , rotate 1500ms ease-in-out",
          }}
          className={`${menuIconStyle} origin-center ${
            menuState.open
              ? `rotate-[45deg]  translate-y-[10px] scale-x-[0.8]`
              : `rotate-[0deg] translate-y-[0px] scale-x-[1]`
          } `}
        />
        <hr
          className={` ${menuIconStyle} origin-center   ${
            menuState.open
              ? `rotate-[-45deg] translate-y-[2.8px] scale-x-[0.8]`
              : `rotate-[0deg] translate-y-[0px] scale-x-[1]`
          }`}
        />
        <hr
          className={` ${menuIconStyle} ${
            menuState.open ? `scale-y-[15] opacity-0` : `opacity-1 scale-y-[1]`
          }`}
        />
      </div>
    </>
  );
}

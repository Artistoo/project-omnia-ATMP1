import React from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";

//ICONS
import { CiSquareAlert } from "react-icons/ci";

export default function Error_Box({ Error }) {
  const [Auth_Error, setAuth_Error] = Error || ["", ""];

  console.log(Auth_Error);

  const HandleBackdropToggle = (action) => {
    const Error_Box_Backdrop = document.getElementById("Error_Box_Backdrop");
    if (!Error_Box_Backdrop) return;
    Error_Box_Backdrop.classList[action]("bg-black/50");
  };
  const HandleCloseError = () => {
    setAuth_Error(false);
  };

  return (
    <div
      id={`Error_Box_Backdrop`}
      style={{
        transitionTimingFunction: `cubic-bezier(0.47, 1.64, 0.41, 0.8)`,
      }}
      className={`group pointer-events-none absolute  top-0 z-[5] flex h-full w-full  origin-[0%_3%] items-center  justify-center    font-[openSauceReg] text-gray-200 transition-[background_opacity] duration-[250ms]  ${
        Boolean(Auth_Error) ? `opacity-100 ` : `opacity-0 `
      }
     `}
    >
      <div
        onMouseOver={() => {
          HandleBackdropToggle("add");
        }}
        onMouseLeave={() => {
          HandleBackdropToggle("remove");
        }}
        className={`hover:group:bg-black/50  pointer-events-auto fixed top-[15%] flex h-[42px] w-[450px] max-w-[98.2%] items-center justify-around gap-x-[8px] rounded-md border border-gray-500/50 bg-red-400 px-[10px] py-[5px] text-[13px] leading-tight `}
      >
        {/* CLOSE ERROR BUTTON */}
        <span
          onClick={HandleCloseError}
          className={`flex h-full w-[10%] cursor-pointer items-center justify-center`}
        >
          <CiSquareAlert
            style={{
              transitionTimingFunction: `cubic-bezier(0.47, 1.64, 0.41, 0.8)`,
            }}
            size={25}
            className={`absolute scale-100 transition-transform duration-500 group-hover:scale-0`}
          />
          <AiOutlineCloseSquare
            style={{
              transitionTimingFunction: `cubic-bezier(0.47, 1.64, 0.41, 0.8)`,
            }}
            size={25}
            className={`absolute scale-0 transition-transform  duration-500 group-hover:scale-100`}
          />
        </span>
        <p className={`flex flex-grow items-center justify-center text-start `}>
          {Auth_Error}
        </p>
      </div>
    </div>
  );
}

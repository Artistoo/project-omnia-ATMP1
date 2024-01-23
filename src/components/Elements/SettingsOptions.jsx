import React from "react";

import handleSelection from "../../utils/handleSelection";

/* <---- ICONS -----> */
import { BiArrowFromLeft, BiArrowToRight } from "react-icons/bi";

export default function SettingsOptions({ inputData, ParameterObj, index }) {
  const { Parameter, setParameter } = ParameterObj;
  const handleSelectionInstance = handleSelection(
    Parameter?.currentlySelected != 0,
    Parameter?.currentlySelected === index + 1,
    true
  );

  const [SettingScrolling, setSettingScrolling] = React.useState(false);

  return (
    <div
      onClick={() => {
        /* open setting on small display */
        window.innerWidth < 750 &&
          setParameter((c) => ({
            ...c,
            currentlySelected:
              Parameter?.currentlySelected === index + 1 ? false : index + 1,
          }));
      }}
      ref={inputData?.ref}
      key={inputData?.About}
      style={{
        transition: `opacity 250ms ${
          index * 150
        }ms , background 350ms ease-in-out`,
        scrollbarGutter: "stable",
        boxShadow: `0 0 50px -22px ${
          inputData?.match ? "green" : `transparent`
        } `,
      }}
      className={`   pointer-events-auto  relative z-10 h-1/4 w-[85%] min-w-[290px] cursor-pointer overflow-hidden rounded-md border  bg-gradient-to-tl from-gray-200  to-gray-300  px-[15px] md:h-[50%] md:w-[43%]
      
      
      ${handleSelectionInstance(
        `pointer-events-none opacity-0`,
        `pointer-events-none opacity-0`,
        `opacity-100`
      )}`}
    >
      {/* <---- TITLE & ICON-----> */}
      <div
        className={`group flex h-[40%] items-center justify-between   `}
      >
        {" "}
        <h2 className={` font-[garet]    text-[1.5rem] text-black`}>
          {inputData?.Title}
        </h2>
        <inputData.Icon
          className={`translate-x-[-5px] scale-[2] transition-transform duration-300 group-hover:translate-y-[-5px] group-hover:scale-[1.8]`}
        />
      </div>

      {/* <---- ABOUT -----> */}
      <div className={`flex h-[40%] w-full  justify-start`}>
        <p
          className={`font-[Poppins] text-[15px] text-gray-950 ${handleSelectionInstance(
            `translate-y-[-15px] opacity-0 `
          )}`}
        >
          {inputData?.About}
        </p>
      </div>

      {/* <---- BUTTON  ---->*/}
      <div
        onClick={() =>
          /* open setting on large display */
          setParameter((p) => ({
            ...p,
            currentlySelected:
              Parameter?.currentlySelected === index + 1 ? 0 : index + 1,
          }))
        }
        className={`group absolute bottom-[2px]  hidden h-[20%] w-[50%]   min-w-max items-center justify-around overflow-hidden rounded-full  border  border-black font-[BrandinkLight]  text-black hover:bg-opacity-[0.9] hover:text-white md:bottom-[10px] md:flex`}
      >
        show more
        <BiArrowToRight
          style={{ transition: `transform 250ms 150ms ease` }}
          className={`group-hover:translate-x-[5px]`}
        />
        <div
          style={{
            transition: `transform 300ms ease`,
          }}
          className={`absolute right-0 -z-10 aspect-square w-[15px] scale-0 rounded-full bg-gray-950 group-hover:scale-[50]`}
        />
      </div>

      {/* <---- MATCH -----> */}
      <div
        style={{
          transition: `opacity 250ms , transform 350ms ease`,
        }}
        className={`absolute bottom-[10px] right-[15px] flex  h-[19px] w-[19px] items-center justify-center  rounded-full font-[openSauceReg] text-[0.9rem] text-green-900    ${
          inputData?.match
            ? `translate-y-[0px]  opacity-100 `
            : `translate-y-[20px] opacity-0`
        }`}
      >
        <div
          style={{
            transition: `transform 500ms 400ms ease-in-out`,
          }}
          className={`absolute -bottom-[20px] -right-[20px]  aspect-square w-[30px]   origin-center rounded-full bg-green-500 opacity-50 blur-lg
          ${inputData?.match ? `scale-[3]` : `scale-0`}`}
        />
        <p className={`translate-x-[15px]`}>{inputData?.match}</p>
      </div>
    </div>
  );
}

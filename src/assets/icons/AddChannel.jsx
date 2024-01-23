import React from "react";

export default function AddChannel({ ScrollingDown, Menu, Color = "white" }) {
  const { NavMenu, setNavMenu } = Menu;

  const Adding = NavMenu.IndexSelected === 2;

  return (
    //ADD ICON CONTAINER
    <div
      /* onClick={() => {
        setNavMenu((c) => ({
          ...c,
          IndexSelected: NavMenu.IndexSelected === 2 ? false : 2,
        }));
      }} */
      style={{
        transition: `width 1000ms , transform 350ms ease`,
      }}
      className={`group flex h-full w-full  cursor-pointer items-center justify-center ${
        Adding ? `scale-[1] hover:rotate-[45deg]` : `scale-[0.9]`
      }`}
    >
      {/* THE HORIZANTiAL LINE */}
      <div
        className={`h-[23px]  bg-${Color} ${
          Adding ? `w-[2px] group-hover:translate-x-[2.2px]` : `w-[1px]`
        }`}
      />

      {/* THE VERTICAL LINE */}
      <div
        style={{
          transition: `width 1000ms ease`,
          transformOrigin: `50% 50%`,
        }}
        className={`relative flex h-[23px]  rotate-[90deg] flex-col items-center  justify-around ${
          Adding ? `w-[2px]` : `w-[1px]`
        }`}
      >
        {/* HALF N1 THE VERTICAL LINE */}
        <span
          style={{
            transition: `transform 350ms ease`,
          }}
          className={` h-1/2 w-full origin-left  bg-${Color}  ${
            Adding
              ? `translate-x-[6px]  translate-y-[3.8px] rotate-[315deg] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-[0] `
              : ``
          }`}
        />

        {/* HALF N2 THE VERTICAL LINE */}
        <span
          style={{
            transition: `transform 350ms ease`,
          }}
          className={` h-1/2 w-full origin-center bg-${Color} ${
            Adding
              ? `-translate-y-[0px] translate-x-[6px] -rotate-[315deg] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-[0]`
              : ``
          }`}
        />
      </div>
    </div>
  );
}

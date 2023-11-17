import React from "react";
import { useLongPress } from "../../hooks/useLongPress.jsx";
import { v4 } from "uuid";

export default function MenuIcon({ open, onClick }) {
  const menuHeight = 32;

  const handleMouseUpDown = (state) => {
    const menuBar = Array(3)
      .fill("")
      .map((_, index) => document.getElementById(`MenuBar_${index}`))
      .forEach((item) => {
        item.classList[state ? "add" : "remove"]("opacity-100");
        item.classList[state ? "add" : "remove"]("bg-white");
        item.classList[!state ? "add" : "remove"]("bg-gray-50");
        item.classList[!state ? "add" : "remove"]("opacity-70");
      });
  };

  return (
    <div
      style={{
        height: menuHeight + "px",
        width: menuHeight * 1.3,
      }}
      onClick={onClick}
      onMouseDown={() => handleMouseUpDown(true)}
      onMouseUp={() => handleMouseUpDown(false)}
      onTouchStart={() => handleMouseUpDown(true)}
      onTouchEnd={() => handleMouseUpDown(false)}
      className={`group  relative flex cursor-pointer flex-col justify-center     `}
    >
      <div
        style={{
          transition: `all 350ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
        }}
        className={`flex-center absolute h-full w-full flex-col gap-y-[5px] ${
          open ? `rotate-[45deg] scale-[.65]` : `rotate-0 scale-100`
        }
        `}
      >
        {["Menu_Bar_One", "Menu_Bar_Two", "Menu_Bar_Three"].map((id, index) => (
          <div
            id={`MenuBar_${index}`}
            key={id}
            style={{
              transition: `transform 500ms 0ms cubic-bezier(0.68, -0.55, 0.27, 1.55) ,
              opacity background 350ms ${100 * index}ms 
              cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
            }}
            className={`  h-[5px] w-full rounded-full  bg-gray-50 opacity-70 
              ${
                open
                  ? index !== 1
                    ? index
                      ? `-translate-y-[10px]`
                      : `translate-y-[10px]`
                    : `translate-y-0 rotate-[90deg]`
                  : `translate-y-0`
              }`}
          />
        ))}
      </div>
    </div>
  );
}

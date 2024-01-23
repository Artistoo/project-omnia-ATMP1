import React from "react";
import { FiEdit2 } from "react-icons/fi";
export default function EditIcon({
  height = "15px",
  width = "15px",
  scale = 1,
}) {
  return (
    <div className={`flex items-center justify-center scale-[${scale}] `}>
      <div
        style={{
          width,
          height,
        }}
        className={`flex flex-col items-center justify-center `}
      >
        <FiEdit2
          style={{
            transition: `transform 250ms ease-in-out`,
          }}
          className={`translate-x-[20px] opacity-0 group-hover:translate-x-[-5px] group-hover:opacity-100 `}
        />
        <div
          style={{
            width,
            transition: `transform 250ms ease-in-out`,
          }}
          className={`h-[1px] origin-right scale-x-0 bg-gradient-to-l from-transparent via-white to-white group-hover:scale-x-[1]`}
        />
      </div>
      <p
        style={{
          transition: ` opacity 250ms ease-in-out`,
          transitionDelay: `250ms`,
        }}
        className={`  font-[garet] text-[14px] opacity-0 group-hover:opacity-100 text-white`}
      >
        Edit
      </p>
    </div>
  );
}

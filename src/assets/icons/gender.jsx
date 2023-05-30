import React from "react";
import { GiFemale, GiMale } from "react-icons/gi";

export default function Gender({ SelectedGender, setGender }) {
  return (
    <div
      style={{
        transition: `transform 300ms , background 300ms ease-in-out `,
      }}
      className={`flex origin-center flex-col items-center justify-center ${
        SelectedGender === "male" ? "rotate-0 " : `rotate-[-130deg]`
      }`}
    >
      <div
        style={{
          transition: ` background 300ms ease-in-out `,
        }}
        className={`aspect-square w-[17px] translate-y-[1px] rounded-full border-[3px] border-black ${
          SelectedGender === "male" ? "border-blue-500" : `border-pink-500 `
        }`}
      />
      <div
        style={{
          transition: ` background 300ms ease-in-out `,
        }}
        className={`h-[11px] w-[3px] bg-black ${
          SelectedGender === "male" ? "bg-blue-500" : `bg-pink-500 `
        }`}
      />

      <div
        className={`$ flex h-[3px] w-[13px] translate-y-[-7px] items-center justify-center`}
      >
        <div
          style={{
            transition: `transform 400ms 200ms , background 300ms ease-in-out `,
          }}
          className={`h-full w-1/2  ${
            SelectedGender === "male"
              ? " bg-blue-500"
              : `translate-x-[0.7px] translate-y-[2.8px] rotate-[50deg] scale-x-[1.5]  bg-pink-500`
          }`}
        />
        <div
          style={{
            transition: `transform 400ms 200ms, background 300ms ease-in-out `,
          }}
          className={`h-full w-1/2  ${
            SelectedGender === "male"
              ? "bg-blue-500"
              : `translate-x-[-0.7px] translate-y-[2.8px]  rotate-[-50deg]  scale-x-[1.5] bg-pink-500`
          }`}
        />
      </div>
    </div>
  );
}

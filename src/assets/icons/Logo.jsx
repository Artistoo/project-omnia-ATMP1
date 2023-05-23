import React from "react";

export default function Logo({
  color = { main: "white", colors: [`white`, "white", "white"] },
  size = 46,
  Menu = false,
  scale = 1,
  ScrollingDown,
}) {
  const DotsSize = size / 6;
  return (
    <div
      style={{
        scale: `${scale}`,
        transition: `scale 300ms ease-in-out`,
      }}
      className="flex items-center justify-center gap-x-[0px]  m-[10px] scale-[1.1] z-[15]  h-full w-max  translate-y-[-5px]"
    >
      <div className="flex gap-x-[0px] items-center justify-center ">
        <div
          style={{
            fontSize: size + "px",
            transition: `color 300ms ease-in-out`,
          }}
          className={`flex  items-center justify-center  font-[PoppinsBold] text-${color.main}`}
        >
          <p>B</p>
          <p className="translate-x-[-13px] translate-y-[8px] ">J</p>
        </div>
        <div className="flex flex-col gap-y-[1px] absolute translate-x-[20px] translate-y-[7px]">
          {[{ color: `white` }, { color: "white" }, { color: `white` }].map(
            (dot, index) => (
              <div
                style={{
                  width: DotsSize,
                  transition: `background 300ms ${100 * index}ms ease-in-out`,
                  background: Menu ? color.colors[index] : dot.color,
                }}
                className={`  aspect-square rounded-full `}
              />
            )
          )}
        </div>
      </div>
      {Menu && (
        <div
          style={{
            transition: `opacity 200ms , transform 250ms ease-in-out`,
            color: color.main,
          }}
          className={`text-[15px] leading-[12px]  absolute  font-[PoppinsBold] flex items-center justify-center pt-[10px] flex-col h-full uppercase scale-[0.9] ${
            ScrollingDown
              ? `translate-x-[48px] opacity-[1] `
              : `translate-x-[30px] opacity-[0] `
          }
          }
          `}
        >
          {["blab", "jolly"].map((logoWord, index) => (
            <p
              style={{
                transition: `opacity 200ms , transform 150ms ease-in-out`,
                transitionDelay: `${index * 150}ms`,
              }}
              className={`${
                ScrollingDown
                  ? `translate-x-[0px] opacity-[1]`
                  : `translate-x-[-30px] opacity-[0]`
              }`}
            >
              {logoWord}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

import React from "react";
import { v4 } from "uuid";
import { useLocation } from "react-router-dom";
import { HideAt } from "../../../data";
export default function Logo({
  color = { main: "white", colors: [`white`, "white", "white"] },
  size = 46,
  Menu = false,
  scale = 1,
  ScrollingDown,
  loading,
}) {
  const DotsSize = size / 6;
  const location = useLocation();
  const chatRoomStyle = location.pathname.includes("channel_chat_room");
  if (chatRoomStyle) {
    scale = 1.1;
  }
  return (
    <div
      style={{
        scale: `${scale}`,
        transition: `scale 300ms ease-in-out`,
      }}
      className={`z-[15] m-[10px] flex max-h-full  w-max translate-y-[-5px] scale-[1.1] select-none items-center justify-center  gap-x-[50px]  
        ${loading && `pointer-events-none`}
      `}
    >
      {/* <--------- DOTS & LETTERS ---------> */}
      <div
        style={{
          transition: `transform 300ms cubic-bezier(0.74, 0.14, 0.31, 1.04) , opacity 250ms cubic-bezier(0.68, 1.55, 0.27, -0.55)`,
        }}
        className={`flex items-center justify-center gap-x-[0px] ${
          ScrollingDown &&
          `-translate-x-[34px] translate-y-[2px] scale-[0.45] md:translate-x-0 md:scale-100  `
        }`}
      >
        {/* <--------- LETTERS ---------> */}
        <div
          style={{
            fontSize: size + "px",
            transition: `color 300ms ease-in-out`,
          }}
          className={`flex  items-center justify-center  font-[PoppinsBold] text-${
            !chatRoomStyle ? color.main : "white"
          }`}
        >
          <p>B</p>
          <p className="translate-x-[-13px] translate-y-[8px] ">J</p>
        </div>

        {/* <--------- DOTS ------------> */}

        <div className="absolute flex translate-x-[20px] translate-y-[7px] flex-col items-center justify-center gap-y-[3px]">
          {[
            { color: { original: `purple`, genetic: "white" } },
            { color: { original: `pink`, genetic: "white" } },
            { color: { original: `yellow`, genetic: "white" } },
          ].map((dot, index) => (
            <div
              key={v4()}
              style={{
                "--original-color": dot.color.original,
                "--index": index,
                width: DotsSize,
                transition: `background 300ms ${
                  index * 120
                }ms , border-radius 200ms ease-in-out`,

                background:
                  !chatRoomStyle && Menu
                    ? color.colors[index]
                    : dot.color.genetic,
              }}
              className={`  aspect-square ${
                index === 1 && `translate-y-[-0.2px]`
              } rounded-full  ${loading && `loadingAnimation`}`}
            />
          ))}
        </div>
      </div>

      {/* <--------- NAVBAR LOGO TEXT -------->  */}
      {Menu && (
        <div
          style={{
            transition: `opacity 200ms , transform 250ms ease-in-out`,
            color: chatRoomStyle ? `whitesmoke` : color.main,
          }}
          className={`absolute flex  translate-y-[5px] scale-[0.9] flex-col items-start justify-center p-[5px]  pt-[10px] text-start font-[PoppinsBold] text-[15px]  uppercase leading-[12px]  ${
            ScrollingDown
              ? ` translate-x-[5px] opacity-[1] md:translate-x-[55px]`
              : `translate-x-[30px] opacity-[0] md:translate-x-0 `
          }
          }
          `}
        >
          {["Bravo", "jolly"].map((logoWord, index) => (
            <p
              key={`blobJollyLogo${logoWord}`}
              style={{
                transition: `transform 500ms 300ms, opacity 150ms ease-in-out`,
              }}
              className={`origin-center ${
                ScrollingDown
                  ? ` ${
                      index === 0 ? `translate-y-[105%]` : `translate-y-[-105%]`
                    } opacity-[1]`
                  : ` translate-y-[0] opacity-[0]`
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

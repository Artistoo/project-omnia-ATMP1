import React from "react";

export default function Logo({
  color = { main: "white", colors: [`white`, "white", "white"] },
  size = 46,
  Menu = false,
  scale = 1,
  ScrollingDown,
  loading,
}) {
  const DotsSize = size / 6;
  return (
    <div
      style={{
        scale: `${scale}`,
        transition: `scale 300ms ease-in-out`,
      }}
      className={`flex items-center justify-center gap-x-[50px]  m-[10px] scale-[1.1] z-[15]  max-h-full w-max  translate-y-[-5px] select-none ${
        loading && `pointer-events-none`
      }`}
    >
      {/* <--------- DOTS & LETTERS ---------> */}
      <div className="flex gap-x-[0px] items-center justify-center ">
        {/* <--------- LETTERS ---------> */}
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

        {/* <--------- DOTS ------------> */}

        <div className="flex flex-col items-center justify-center gap-y-[3px] absolute translate-x-[20px] translate-y-[7px]">
          {[
            { color: { original: `purple`, genetic: "white" } },
            { color: { original: `pink`, genetic: "white" } },
            { color: { original: `yellow`, genetic: "white" } },
          ].map((dot, index) => (
            <div
              style={{
                "--original-color": dot.color.original,
                "--index": index,
                width: DotsSize,
                transition: `background 300ms , border-radius  ease-in-out`,
                transitionDelay: `1500ms`,
                background: Menu ? color.colors[index] : dot.color.genetic,
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
            color: color.main,
          }}
          className={`text-[15px] leading-[12px]  absolute  font-[PoppinsBold] flex items-center justify-center  pt-[10px] flex-col text-start p-[5px]  uppercase scale-[0.9] translate-y-[2px] ${
            ScrollingDown
              ? `translate-x-[48px] opacity-[1] `
              : `translate-x-[30px] opacity-[0] `
          }
          }
          `}
        >
          {["blox", "jolly"].map((logoWord, index) => (
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
                  : ` opacity-[0] translate-y-[0]`
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

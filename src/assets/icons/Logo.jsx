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
      className={`z-[15] m-[10px] flex max-h-full  w-max translate-y-[-5px] scale-[1.1]  select-none items-center  justify-center gap-x-[50px] ${
        loading && `pointer-events-none`
      }`}
    >
      {/* <--------- DOTS & LETTERS ---------> */}
      <div className="flex items-center justify-center gap-x-[0px] ">
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

        <div className="absolute flex translate-x-[20px] translate-y-[7px] flex-col items-center justify-center gap-y-[3px]">
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
                transition: `background 300ms ${
                  index * 120
                }ms , border-radius 200ms ease-in-out`,

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
          className={`absolute flex  translate-x-[55px] translate-y-[2px] scale-[0.9] flex-col items-start justify-center  p-[5px] pt-[10px] text-start font-[PoppinsBold]  text-[15px] uppercase leading-[12px]  ${
            ScrollingDown
              ? `translate-x-[48px] opacity-[1] `
              : `translate-x-[30px] opacity-[0] `
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

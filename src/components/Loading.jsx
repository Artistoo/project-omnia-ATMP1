import React from "react";
import Typist from "react-typist";
export default function Loading({ loading }) {
  console.log(loading);
  const [reloadPageStuck, setReloadPageStuck] = React.useState(false);
  React.useEffect(() => {
    window.onload = () => loading.setPageLoading(false);
    const pageStuck = setTimeout(() => {
      if (loading.pageLoading) {
        setReloadPageStuck(true);
      }
    }, [8000]);
    return () => clearTimeout(pageStuck);
  }, []);
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center flex-col ">
      {/* -------- LOGO --------- */}
      <div
        id={`Logo`}
        className={`flex items-center justify-center gap-x-0   w-max p-[5px] h-[80px]  aspect-square relative  scale-[0.7]`}
      >
        <div
          id={`logoLettersContainer`}
          className={`font-[PoppinsBold] text-white flex text-[55px] z-[10] translate-x-[5px]`}
        >
          <p id={"B"}>B</p>
          <p id={"J"} className={`translate-y-[8px] translate-x-[-14px]`}>
            J
          </p>
        </div>
        <div
          className={`gap-y-[2px] flex flex-col translate-x-[-5px] translate-y-[5px] z-[10] `}
        >
          {[
            { id: "circle_one" },
            { id: "circle_two" },
            { id: "circle_three" },
          ].map((dot, index) => (
            <div
              key={`LogoDotsNM${index}`}
              id={dot.id}
              className={`w-[10px] aspect-square bg-white rounded-full animateDots`}
            />
          ))}
        </div>
      </div>
      {/* -------- TEXT----------- */}
      <p className={`font-[Poppins] text-white`}>Loading</p>

      {/* ------- IF PAGE STUCK RELOAD BUTTON --------- */}
      <div
        style={{
          transition: `opacity 300ms , border 1000ms ,  color 500ms ease-in-out`,
        }}
        className={` flex absolute flex-col items-center justify-center translate-y-[150px] gap-y-[20px] text-center  font-[brandinkLight] text-gray-300 w-[70%]   ${
          reloadPageStuck
            ? `opacity-[1] border-white `
            : "opacity-[0] border-transparent"
        } `}
      >
        <button
          style={{
            transition: ` border 1000ms , background 350ms , color 500ms ease-in-out`,
          }}
          onClick={() => location.reload()}
          className={`mt-[50px]  text-gray-200 font-[brandinkLight] border-[1px] border-opacity-40 backdrop-blur-lg  px-[50px] py-[5px] rounded-full  hover:bg-white hover:bg-opacity-[0.05] hover:text-white mb-[50px]`}
        >
          reload the page
        </button>
      </div>
      {/* ----- BACKGROUND ANIMATION */}
      <div className="w-[400px] h-[400px]  absolute   rounded-full    circleLoading " />
    </div>
  );
}

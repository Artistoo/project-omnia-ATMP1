import React from "react";
import Logo from "../assets/icons/Logo";
import Typist from "react-typist";
export default function Loading({ loading , processName }) {
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
    <div className="z-[20] flex h-full w-screen flex-col items-center justify-center overflow-hidden">
      {/* -------- LOGO --------- */}
      <div
        className={`flex h-[650px] w-full flex-col items-center justify-center `}
      >
        <Logo scale={1.4} loading={true} />
        {processName && <p>{processName}</p>}
        {/* ------- IF PAGE STUCK RELOAD BUTTON --------- */}
        <div
          style={{
            transition: `opacity 300ms , border 1000ms ,  color 500ms ease-in-out`,
          }}
          className={` pointer-events-auto absolute z-[1] flex w-[70%] translate-y-[150px] cursor-pointer flex-col items-center justify-center  gap-y-[20px] text-center font-[brandinkLight] text-gray-300  ${
            reloadPageStuck
              ? `border-white opacity-[1] `
              : "border-transparent opacity-[0]"
          } `}
        >
          <button
            style={{
              transition: ` border 1000ms , background 350ms , color 500ms ease-in-out`,
            }}
            onClick={() => location.reload()}
            className={`mb-[50px]  mt-[50px] rounded-full border-[1px] border-opacity-40 px-[50px]  py-[5px] font-[brandinkLight] text-gray-200  backdrop-blur-lg hover:bg-white hover:bg-opacity-[0.05] hover:text-white`}
          >
            reload the page
          </button>
        </div>
      </div>

      {/* ----- BACKGROUND ANIMATION */}
      <div className="absolute bottom-0  h-[800px] w-full overflow-hidden opacity-[0.7]">
        <div className="circleLoading absolute  h-[400px]   w-[400px]    rounded-full " />
      </div>
    </div>
  );
}

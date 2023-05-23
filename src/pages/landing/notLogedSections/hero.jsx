import React from "react";
import Typist from "react-typist";

//_______________ COMPONENTS _______________________
import VectorLanidingPage from "../../../assets/img/Community.png";
//_______________   ICONS   ________________________
import { AiOutlineArrowRight as Arrow } from "react-icons/ai";

//____________ MAIN JSX SECTION ________________
export default function hero() {
  /* --------- THE BLUE BG COVER ---------- */
  const Bg = () => {
    return (
      <div className=" h-[900px]  absolute w-screen z-[-3] blueBG md:opacity-[0.8] opacity-[0.9]">
        <div className=" w-[600px] aspect-square absolute bg-red-700 rounded-full blur-[100px] z-[-4]  md:opacity-[0.3] opacity-[0.3]" />
        <div className=" w-[600px] aspect-square  bg-purple-700 rounded-full blur-[100px] z-[-4] absolute opacity-[0.6] left-0" />
      </div>
    );
  };
  /* --------- THE TWO BUTTONS ---------- */
  const Buttons = {
    btnOne: () => {
      return (
        <>
          {/* Start button */}
          <div
            className={` btn-one btnLandin  font-[Poppins] h-full  flex items-center justify-center backdrop-blur-lg bg-opacity-20  group cursor-pointer`}
          >
            <button className="pointer-events-none text-[20px]">
              Start Now{" "}
            </button>
            {/* Circle contaier  */}
            <div
              className={`aspect-square p-[5px] items-center justify-center rounded-full bg-gradient-to-tl flex w-[30px] from-white  group-hover:bg-gradient-to-tl group-hover:from-green-300 group-hover:to-yellow-200 to-gray-400 translate-x-[20px] overflow-hidden absolute right-[33px]`}
            >
              {/* TWO ARROW */}
              <div
                style={{
                  transition: "transform 300ms ease-in-out",
                }}
                className={`flex absolute gap-x-[16px]items-end justify-between w-[60px] translate-x-[35%] group-hover:translate-x-[-35%] pointer-events-none `}
              >
                <Arrow className="w-[19px] h-auto fill-black " />
                <Arrow className="w-[19px] h-auto fill-black " />
              </div>
            </div>
          </div>
        </>
      );
    },
    btnTwo: () => {
      return (
        <>
          <div
            className={`Landinbtn btn-two flex items-center justify-center cursor-pointer text-[20px]`}
          >
            <button className={`pointer-events-none`}> discover more </button>
          </div>
        </>
      );
    },
  };

  /* ----------- MAIN SECTION DISPLAY ---------- */
  return (
    <div
      className={` py-[30px] justify-center items-center flex mb-[85px] lg:mb-[70px] relative  w-full `}
    >
      <Bg />
      {/*<---------- ARTWORK ----------> */}
      <div
        className={`absolute  left-0 md:w-[700px] w-full  top-0 md:translate-y-[-100px]
        z-[-4] lg:overflow-visible overflow-hidden  items-center justify-center `}
      >
        <img
          src={VectorLanidingPage}
          className={` h-auto scale-[1.3] opacity-[0.9]`}
        />
      </div>
      {/* <----------TEXT AND BUTTONS ----->*/}
      <div
        className={`flex flex-col min-w-[50%] w-max min-h-[350px]  items-center justify-center   lg:translate-y-[-10px] lg:translate-x-[190px]  gap-y-[20px] translate-y-[-0px] `}
      >
        {/*<--------- TXT ----------> */}
        <div
          className={`w-full   ml-[25px] h-full text-gray-200  p-[30px] mb-[30px]`}
        >
          <h1
            className={`font-[openSauce] text-[90px] md:text-[92px] mb-[10px] leading-[75px] md:w-max w-min `}
          >
            ONE BIG HOME
          </h1>
          <p className={`font-[Poppins] leading-[20px] w-[500px] text-[17px]`}>
            support your causes and join the communities that best represt who
            you are from the confort of your home
          </p>
        </div>
        {/*<--------- BTN ----------> */}
        <div
          className={`w-[90%] h-[50px] flex items-center justify-start ml-[60px] gap-[20px] translate-x-[-20px]`}
        >
          <Buttons.btnOne />
          <Buttons.btnTwo />
        </div>
      </div>
    </div>
  );
}

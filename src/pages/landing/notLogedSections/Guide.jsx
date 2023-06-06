import React from "react";
// ___________ ASSETS _____________
import Stars from "../../../assets/img/ThreeDStars.png";
import { useInView } from "react-intersection-observer";
import { BsChatLeftText } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
export default function () {
  const [cases, setCases] = React.useState([
    {
      title: "Collabrite",
      icon: FaHandsHelping,
      hover: false,
      text: "be the change in the cause you fight for and be part of a bigger community that fight for the same thing",
    },
    {
      title: "Communicate",
      icon: BsChatLeftText,
      hover: false,
      text: "meet people from all around the world and communicate about what you share in common ",
    },
    {
      title: "Raise",
      icon: TbPigMoney,
      hover: false,
      text: "raise money for your cause and meet people who cares for what you fight for and who understand your struggle",
    },
  ]);
  return (
    <div
      className={`flex min-h-[50%] w-full flex-col items-center justify-center gap-y-[50px] px-[70px]`}
    >
      <img
        src={Stars}
        className={`absolute translate-y-[-65px] scale-[2] opacity-[0.7] blur-[25px] `}
      />
      {/* <---- THE UPPER SECTION TEXT ----> */}
      <div
        className={`relative flex max-h-[50%]  min-h-[40%]  w-[90%] max-w-[700px] select-none flex-col items-center justify-center gap-y-[60px] px-[12px] py-[12px]  `}
      >
        <h2
          style={{
            transition: `opacity 500ms ease`,
          }}
          className={`select-none text-center font-[garet] text-[70px] font-bold leading-[62px] 
             tracking-tighter text-gray-900  md:text-[80px] md:leading-[70px] `}
        >
          Guide to a{" "}
          <b
            className={`bg-gradient-to-tl from-blue-700 via-purple-600 to-green-600   bg-clip-text bg-[500%] text-transparent`}
          >
            colorFul
          </b>{" "}
          journy
        </h2>
        <p
          className={`text-center font-[Poppins] text-[20px] leading-[17px] text-gray-500 `}
        >
          quick guide on how to get started and what it was created for , our
          commuinty support a wide range of people from all other the globe in
          one lovely family
        </p>
        <button
          style={{
            transition: `color 300ms , background 200ms , border 500ms , outline 300ms ease`,
          }}
          className={` z-[1] h-[40px] w-[150px] scale-[1.03] rounded-full border border-gray-50 bg-gradient-to-l from-gray-950 to-gray-900 py-[5px] font-[openSauce] text-[14px] font-normal text-gray-300 outline outline-[1px] outline-black hover:rotate-[1deg] hover:border-black hover:from-gray-50 hover:to-white hover:text-black hover:outline-white`}
        >
          Discover More
        </button>
      </div>

      {/* <---- THE THREE SECTION BOXS ----> */}
      <div
        className={`flex min-h-max flex-wrap items-center justify-center  gap-[10px] px-[5px] py-[12px] `}
      >
        {cases.map((use, index) => (
          <div
            onMouseOver={() =>
              setCases((current) => {
                const updatedCases = [...current];
                updatedCases[index] = { ...updatedCases[index], hover: true };
                return updatedCases;
              })
            }
            onMouseLeave={() =>
              setCases((current) => {
                const updatedCases = [...current];
                updatedCases[index] = {
                  ...updatedCases[index],
                  hover: false,
                };
                return updatedCases;
              })
            }
            style={{
              transition: `border 100ms , background 200ms , opacity 500ms , color 200ms ease`,
            }}
            className={`group relative  flex min-h-[150px] w-[70%] min-w-[300px] flex-grow  flex-col items-center justify-center gap-y-[30px] overflow-hidden  rounded-[15px] border border-gray-300  px-[50px]  py-[12px] outline outline-[0.5px] outline-white  hover:border-purple-300 hover:outline-black md:min-h-[180px]  md:w-[32%]  ${
              cases.some((x) => x.hover)
                ? use.hover
                  ? `hover:bg-black hover:text-white`
                  : `opacity-[0.8]`
                : `opacity-[1]`
            }`}
          >
            <div
              className={`flex h-[30%] w-full select-none items-center justify-between`}
            >
              <h2
                className={`bg-transparent bg-clip-text  font-[Poppins] text-[20px] font-bold  `}
              >
                {use.title}
              </h2>
              <use.icon size={27} className={`group-hover:text-green-400`} />
            </div>
            <div
              className={`flex h-[60%] w-full flex-col items-center justify-center `}
            >
              <p
                style={{
                  transition: `transform 250ms , opacity 250ms ease`,
                }}
                className={`select-none font-[Poppins] text-[16px]  leading-[17px] `}
              >
                {use.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

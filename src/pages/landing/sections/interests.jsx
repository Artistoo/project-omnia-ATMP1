import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdTypeSpecimen } from "react-icons/md";
//interests icons
import { MdPets, MdSportsBasketball } from "react-icons/md";
import { CgGames } from "react-icons/cg";
import { TbCookieMan } from "react-icons/tb";
import { GiUnderwearShorts, GiMaterialsScience } from "react-icons/gi";
import { FaBookReader } from "react-icons/fa";
import { GrPaint } from "react-icons/gr";
import { AiFillCode } from "react-icons/ai";
import { CgDesignmodo } from "react-icons/cg";
export default function interests() {
  const [ButtonFunctionality, setButtonFunctionality] = React.useState("add");

  const [interestsList, setinterestsList] = React.useState([
    { int: "sport", icon: MdSportsBasketball, selected: false },
    { int: "video games", icon: CgGames, selected: false },
    { int: "cooking", icon: TbCookieMan, selected: false },
    { int: "fashion", icon: GiUnderwearShorts, selected: false },
    { int: "reading", icon: FaBookReader, selected: false },
    { int: "painting", icon: GrPaint, selected: false },
    { int: "pets", icon: MdPets, selected: false },
    { int: "science", icon: GiMaterialsScience, selected: false },
    { int: "coding", icon: AiFillCode, selected: false },
    { int: "desiging", icon: CgDesignmodo, selected: false },
  ]);
  /* Compo */
  const AddInterest = () => {
    return (
      <div
        className={`absolute bg-gradient-to-tl from-white to-blue-100 w-full h-[220px]  flex pt-[25px] pl-[12px] leading-4 flex-col gap-y-[50px] overflow-hidden  translate-y-[420px] border`}
      >
        <MdTypeSpecimen
          className={`h-auto min-w-[400px] translate-y-[-80px] absolute fill-purple-400 opacity-[0.2] rotate-[30deg] z-[-1] blur-[3px]`}
        />
        <p className="text-[15px] text-black font-[BrandinkLight] w-[80%] ">
          add your own interest and submit it so we can review it , this will
          help us know more about what our clients are interested in
        </p>
        <input
          placeholder="add your interest"
          className={`bg-gradient-to-l from-white to-gray-200 p-[10px] text-[15px] rounded-full font-[Poppins]  focus:bg-white w-[95%] self-center `}
        />
      </div>
    );
  };
  return (
    <div
      id={`interestBox`}
      className={`bg-white min-h-[240px] min-w-[300px] w-[90%] self-center m-auto flex items-center justify-center flex-wrap p-[25px] relative`}
    >
      <div className="flex w-[40%] min-w-[350px] items-center justify-center gap-x-[55px] flex-wrap border">
        <h2
          className={`font-[now] text-[46px] w-[50%] leading-[45px] text-gray-900 min-w-[8px]  border uppercase`}
        >
          select your interests{" "}
        </h2>
        <p
          className={`font-[Poppins] text-gray-900 break-all min-w-[20px] border w-[300px] text-[15px] leading-4`}
        >
          please select some of what interest you and have people from all over
          the globe meet you to chat about the things you have in common
        </p>
      </div>

      {/* int */}
      <div className="md:w-1/2  w-full  flex items-center flex-wrap md:justify-start justify-center">
        {interestsList.map((int, index) => {
          return (
            <div
              className={`font-[Poppins] w-[170px] min-w-max m-[2px] border border-black px-[12px] py-[3px] rounded-full backdrop-blur-lg flex items-center justify-center gap-x-[12px] group overflow-hidden cursor-pointer`}
              key={`interestItems${index}`}
            >
              <p>{int.int}</p>
              <int.icon
                style={{
                  transition: `transform 400ms , right 400ms  ease-in-out`,
                }}
                className={`absolute right-[10px] group-hover:right-[20px] group-hover:rotate-[30deg] group-hover:opacity-[0.4] group-hover:scale-[2] ${
                  int.selected
                    ? `fill-white right-[20px] rotate-[30deg] opacity-[0.4]scale-[2]`
                    : "fill-black "
                } `}
              />
            </div>
          );
        })}
        <div
          className={`w-[230px] bg-black opacity-[0.9] hover:opacity-[1] transition-opacity cursor-pointer flex items-center justify-center mx-[3px] rounded-full h-[32px] backdrop-blur-lg gap-x-[20px] md:mt-0 mt-[50px]`}
        >
          <AiFillPlusCircle
            onClick={() => {
              if (ButtonFunctionality === "add") {
              }
            }}
            fill="white"
            size={23}
          />
          <p className={`text-gray-300 font-[Poppins]text-[11px] `}>
            add new interest
          </p>
        </div>
      </div>
    </div>
  );
}

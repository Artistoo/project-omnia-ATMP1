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

//Redux
import { useDispatch, useSelector } from "react-redux";
import { addInterest } from "../../../redux/intSlice";

import AddVerifyIcon from "../../../assets/icons/addVerifyIcon";

export default function interests() {
  // -------- redux -------------------
  const dispatch = useDispatch();
  // ------- react state --------------
  const [ButtonFunctionality, setButtonFunctionality] = React.useState("add");

  const [readyToAdd, setReadyToAdd] = React.useState(false);
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
  const userInterest = useSelector((state) => state.intReducer.userInterest);

  React.useEffect(() => {
    dispatch(addInterest({ interest: [] }));
  }, []);

  /* Compo */
  const InterestSelectText = () => (
    <div className="flex w-[40%] min-w-[350px] items-center md:justify-start gap-x-[55px] flex-wrap ">
      <h2
        className={`font-[now] text-[46px] w-[50%] leading-[45px] text-gray-900 min-w-[8px]   uppercase`}
      >
        select your interests{" "}
      </h2>
      <p
        className={`font-[Poppins] text-gray-900 break-all min-w-[20px]  w-[300px] text-[15px] leading-4`}
      >
        please select some of what interest you and have people from all over
        the globe meet you to chat about the things you have in common
      </p>
    </div>
  );
  return (
    <div
      id={`interestBox`}
      className={`bg-white min-h-[240px] min-w-[300px] w-[90%] self-center m-auto flex items-center justify-center flex-wrap p-[25px] relative mb-[25px]`}
    >
      <InterestSelectText />
      {/* int boxs */}
      <div className="md:w-1/2  w-full  flex items-center flex-wrap md:justify-start justify-center">
        {interestsList.map((int, index) => {
          return (
            <div
              onClick={(e) =>
                setinterestsList((current) => {
                  const updatedList = [...current];
                  updatedList[index] = {
                    ...updatedList[index],
                    selected: !updatedList[index].selected,
                  };

                  return updatedList;
                })
              }
              className={`font-[Poppins] w-[170px] min-w-max m-[2px] border border-black px-[12px] py-[3px] rounded-full backdrop-blur-lg flex items-center justify-center gap-x-[12px] group overflow-hidden cursor-pointer ${
                int.selected && "border-green-600"
              }`}
              key={`interestItems${index}`}
            >
              <p>{int.int}</p>
              <int.icon
                style={{
                  transition: `transform 400ms , right 400ms  ease-in-out`,
                }}
                className={`absolute right-[10px] group-hover:right-[20px] group-hover:rotate-[30deg] group-hover:opacity-[0.4] group-hover:scale-[2] ${
                  int.selected
                    ? ` right-[20px] rotate-[30deg]   scale-[2] opacity-[0.4]`
                    : "fill-black "
                } `}
              />
            </div>
          );
        })}
        {/* BUTTON */}
        <div
          onClick={() => {
            if (interestsList.some((x) => x.selected)) {
              dispatch(
                addInterest({
                  interest: interestsList
                    .filter((x) => x.selected)
                    .map((item) => ({
                      SelectedInterest: item.int,
                      icon: item.icon,
                    })),
                })
              );
            }
          }}
          className={`w-[230px] bg-black opacity-[0.9] hover:opacity-[1] transition-opacity cursor-pointer flex items-center justify-center mx-[3px] rounded-full h-[32px] backdrop-blur-lg gap-x-[20px] md:mt-0 mt-[50px] ${
            interestsList.some((x) => x.selected) && `bg-green-600`
          }`}
        >
          <AddVerifyIcon
            valid={userInterest?.length && userInterest.filter(Boolean)?.length}
            confirmed={readyToAdd}
          />
          <p className={`text-gray-300 font-[Poppins]text-[11px] `}>
            {interestsList.some((x) => x.selected)
              ? `verify my selection`
              : `add your interest`}
          </p>
        </div>
      </div>
    </div>
  );
}

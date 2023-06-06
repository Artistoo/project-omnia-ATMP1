import React from "react";

//Importing asset
import Community from "../../../assets/img/elections_07.png";
import Tribe from "../../../assets/img/elections_01.png";
import { Link } from "react-router-dom";
import { GiPolarStar } from "react-icons/gi";
import { BsArrowLeft, BsArrowRight, BsStarFill, BsStars } from "react-icons/bs";
import { BiStar } from "react-icons/bi";
import { FaHandPointer } from "react-icons/fa";

import { IoIosArrowDropleft } from "react-icons/io";
import Slider from "infinite-react-carousel";
export default function categories() {
  const [Categories, setCategories] = React.useState([
    {
      category: `community`,
      img: Community,
      selected: true,
      uses: [
        "raise funds for your cause",
        "contribute in what you fight for",
        "be a part of a greater fight ",
      ],
      text: [
        `debate , let people from all over the world understand your fight , be a part of a bigger couse and have people who fight for the same thing join and support you `,
        `Connect, Debate, and Unite: Your Platform for Global Discourse
        `,
        `protect what you value and be the change you want to see , contribute and find people who support your cause`,
      ],
      style: {
        bg: `bg-gradient-to-tl from-blue-600 to-blue-800`,
      },
    },
    {
      category: `Tribe`,
      img: Tribe,
      selected: false,
      uses: [
        "communicate and meet new peopel",
        "share your expirences and journys",
        "create a one big family where you can be understood",
      ],
      text: [
        `its a one big family for if you need help ,  general chat , private consulting or maybe you just need support of a crew for your project of any type`,
        `get support from people who've been what your going through `,
        `get motivation and have support for your next move from people who understand your fight`,
      ],
      style: {
        bg: `bg-gradient-to-tl from-pink-500 to-pink-700`,
      },
    },
  ]);
  const [direction, setdirection] = React.useState({ left: false });

  return (
    
    <div className={` flex min-h-[700px] items-center justify-center p-[25px] mb-[100px]`}>
      <div className=" relative  flex h-full  w-full select-none flex-col items-center justify-center gap-y-[20px] overflow-hidden rounded-[15px]  bg-black px-[40px] py-[40px] lg:w-[90%] ">
        {/* BG */}
        <div className="absolute bottom-[-15px] h-[600px] w-full scale-[2] bg-gradient-to-t from-blue-900   to-transparent opacity-[1]  blur-[50px]" />

        {/* UPPER TITLE PART */}
        <div className="z-[1] flex h-[25%] w-full flex-wrap items-center justify-center lg:justify-between lg:px-[40px]   ">
          {/*  TITLE PART */}
          <div
            className={`mb-[6px] flex h-full w-[40%]   min-w-[450px]   flex-col  gap-y-[5px]  px-[13px] font-[Poppins] text-gray-200 md:items-start `}
          >
            <h2
              className={`w-[100%]  font-[OpenSauce]  text-[55px]  leading-[58px] md:scale-[1.1] 
              lg:scale-[1]`}
            >
              <b
                className={`bg-gradient-to-tl from-purple-600 to-blue-400 bg-clip-text text-transparent`}
              >
                {" "}
                Categories{" "}
              </b>
              <br />
              how it works{" "}
              <b
                className={`bg-gradient-to-tl from-purple-600 to-blue-400 bg-clip-text text-transparent`}
              >
                ?
              </b>
            </h2>
            <p className="mb-[10px]">
              discover more about the jolly blab group types and how each group
              work and what it use for
            </p>
            <Link
              to={"/faq"}
              className={`group relative flex w-max items-center justify-start text-blue-400`}
            >
              {/* DISCOVER MORE LINK TEXT */}
              <p
                style={{
                  transition: `transform 220ms ease`,
                }}
                className={`group-hover:translate-y-[-13px] `}
              >
                still have more questions ?
              </p>

              {/* DISCOVER MORE LINK ARROW ON HOVER */}
              <div
                className={`absolute top-1/2 flex h-[1px] w-full origin-left  scale-x-[0] items-center justify-end bg-blue-400 group-hover:scale-x-[1] group-hover:transition-transform group-hover:delay-[220ms]`}
              >
                <BsArrowRight
                  style={{
                    transition: `transform 150ms ${350 + 220}ms ease`,
                  }}
                  size={17}
                  className={`translate-x-[5px] scale-x-0 text-blue-400 group-hover:scale-x-[1] `}
                />
              </div>
            </Link>
          </div>

          <div
            className={`flex min-h-max w-[45%] min-w-[450px] flex-col items-start justify-center   px-[12px] py-[20px] font-[Poppins] text-[16px] text-gray-300 lg:text-[19px]`}
          >
            {Categories.filter((x) => x.selected)?.map((category) =>
              category.uses.map((use) => (
                <div
                  className={`group flex cursor-pointer items-center justify-center gap-x-[20px]`}
                >
                  <IoIosArrowDropleft
                    style={{
                      transition: `transform 520ms , color 200ms 220ms , opacity 150ms ease`,
                    }}
                    className="group-hover:translate-x-[70%] group-hover:rotate-[180deg] group-hover:text-green-300  group-hover:opacity-[1]"
                  />
                  <p
                    className={`duraiton-[300ms] transition-colors  group-hover:text-green-200`}
                  >
                    {use}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/*  LOWER TWO CARDS PART */}
        <div
          className={` z-[1] flex w-full flex-col flex-wrap items-center justify-around gap-y-[15px] lg:min-h-[450px] lg:flex-row`}
        >
          {/* TWO BOXS MAPPING */}
          {Categories.map((category, index) => (
            <div
              key={category.category}
              className={`group  flex h-[200px]  w-[100%] items-center justify-center gap-x-[20px] rounded-lg border border-white px-[10px] py-[12px] lg:h-[420px]  lg:w-[40%] lg:flex-col ${category.style.bg}`}
            >
              {/* BOXS IMG */}
              <div className="flex h-full w-1/2 items-center justify-center  lg:h-[60%] lg:w-full ">
                <img
                  style={{
                    transition: `transform 250ms ease `,
                  }}
                  src={category.img}
                  className={`scale-[1.5] group-hover:translate-x-[-15px] group-hover:translate-y-[-15px] md:scale-[1.25]`}
                />
              </div>
              {/* TEXT */}
              <div
                className={`relative flex   h-[200px] w-1/2 scale-[0.9] flex-col items-center justify-start px-[8px] py-[5px] md:scale-[1] lg:h-[40%] lg:w-full lg:justify-center lg:gap-y-[15px]`}
              >
                <div
                  className={`font-garet relative flex h-[30%] w-full  flex-wrap items-center justify-start text-[35px] font-bold leading-none text-gray-50 `}
                >
                  <h2 className="leading-0 text-blue-200 group-hover:bg-gradient-to-tl group-hover:from-green-400 group-hover:to-green-500 group-hover:bg-clip-text group-hover:text-transparent">
                    {category.category}
                  </h2>
                </div>

                <div
                  className={`relative flex  min-h-max w-full  lg:h-[70%]  `}
                >
                  <Slider
                    dots
                    pauseOnHover={true}
                    duration={100}
                    arrows={false}
                    wheel={true}
                    className={`h-full w-full cursor-pointer`}
                  >
                    {category.text.map((x) => (
                      <div
                        style={{ width: `${100 / category.text.length}%` }}
                        className={`  relative flex  h-full items-center justify-start font-[Poppins] text-[15px] leading-none text-gray-100`}
                      >
                        <p>{x}</p>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

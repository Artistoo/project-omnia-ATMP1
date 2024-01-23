import React from "react";

import Congrats from "../../../../../assets/img/Congrats.png";
import Nature from "../../../../../assets/img/Nature.png";
import FinSupport from "../../../../../assets/img/FinancialSupport.png";
import { MdOutlinePrivacyTip, MdSupportAgent } from "react-icons/md";
import { AiOutlineAntDesign } from "react-icons/ai";

export default function Our_values() {
  const [communityValues, setCommunityValues] = React.useState([
    {
      value: "Privacy",
      icon: MdOutlinePrivacyTip,
      selected: true,
      text: `Your conversations, your rules. Our commitment to privacy is unwavering. Enjoy confidential and secure communication without compromise. `,
    },
    {
      value: "Rich Media Support",
      icon: MdSupportAgent,
      selected: false,
      text: `Beyond words. Share your moments vividly with our rich media support. From images to videos, our chat app brings your conversations to life in full color.`,
    },
    {
      value: "User-Friendly Interface",
      icon: AiOutlineAntDesign,
      selected: false,
      text: `Intuitiveness at its core. Navigating through conversations has never been smoother. Our user-friendly interface ensures a seamless experience, even for the tech novice`,
    },
  ]);
  const id = React.useId();
  return (
    <div
      className={`z-[10]  m-[35px] flex min-h-[200px] w-full flex-wrap  items-center justify-evenly  `}
    >
      <div
        className={`flex   w-full flex-col items-center justify-center gap-y-[20px]  p-[5px_15px]`}
      >
        <div className={`flex h-[120px] w-full items-center justify-start `}>
          <h2 className={` font-[brandinkLight] text-[30px] text-white`}>
            Chat with Confidence
          </h2>
        </div>
        <ul
          className={`flex min-h-[210px] w-full  flex-wrap items-center justify-center gap-y-[30px] md:justify-between `}
        >
          {communityValues.map((value, valueIndex) => {
            return (
              <li
                key={`valueBox${id}`}
                onClick={() => {
                  setCommunityValues((value) =>
                    value.map((v, i) =>
                      i === valueIndex
                        ? { ...v, selected: true }
                        : { ...v, selected: false }
                    )
                  );
                }}
                className={`valuesBox relative flex h-[210px] w-[85%] min-w-[350px] max-w-[420px] select-none flex-wrap items-center justify-center overflow-hidden rounded-[17px] md:w-[32%] 
               `}
              >
                {/* BACKGROUND */}
                <span
                  style={{
                    transition: `transform 250ms ease , opacity 250ms ease`,
                  }}
                  className={`absolute -z-10 h-full  w-full origin-center bg-gradient-to-tl from-neutral-900/90 to-gray-800/90 backdrop-blur-[50px] ${
                    value.selected
                      ? `scale-x-100 opacity-100`
                      : `scale-x-0 opacity-0`
                  }`}
                />

                <div
                  className={`flex h-full w-[20%] items-center justify-start     p-[15px] md:h-[25%] md:w-full  `}
                >
                  <div
                    className={`relative flex aspect-square w-[35px] items-center justify-center`}
                  >
                    <span
                      className={`absolute h-full w-full  origin-center rounded-full bg-gradient-to-bl from-purple-400/60  to-purple-600/60 blur-lg transition-[opacity_shadow]
                    ${!value.selected && `opacity-0 shadow-none`}`}
                    />
                    <value.icon
                      size={23}
                      className={` z-[5]
                    
                    ${value.selected ? ` text-white` : `text-gray-400`}`}
                    />
                  </div>
                </div>
                <div
                  className={`flex h-full w-[75%] flex-col items-start justify-center p-[5px_10px]     md:h-[75%] md:w-full md:justify-start`}
                >
                  <h2
                    className={` text-start font-[garet] text-[17px] font-semibold   text-gray-100`}
                  >
                    {value.value}
                  </h2>
                  <br />
                  <small
                    className={`translate-y-[-5px] font-[brandinkLight] text-gray-300`}
                  >
                    {value.text}
                  </small>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

import React from 'react';

//UTILITY
import { handlePopoverState } from '../../utils/handlePopoverState.js';
//DATA
import { transitionTimingFunctions } from '../../../data.js';
//HOOKS
import { usePageLoaded } from '../../hooks/usePageLoaded.jsx';
//ICONS
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import { CiCircleRemove } from 'react-icons/ci';
import Check from '../../assets/icons/check.svg';

export default function SuccessPopover({
  isSuccess,
  message = `process was successful`,
  title = `success`,
  ProcessIcon = FaCheck,
  BTN = {
    BtnEvents: {},
    btnPlaceholder: `close window`,
  },
  //HANDLERS
  close = handlePopoverState(`successMessagePopover`, false),
}) {
  return (
    <div
      id={`successMessagePopover`}
      style={{
        //TRANSITION
        transitionProperty: `background , clip-path`,
        transitionDuration: ` 250ms, 250ms`,
        transitionTimingFunction: transitionTimingFunctions.Elastic_Out_And_Settle_Alternate,
        //CLIP
        clipPath: `circle(${isSuccess ? 100 : 0}% at center)`,
      }}
      className={` pointer-events-auto absolute top-0 z-[50] h-screen w-screen bg-black/95 
      ${isSuccess ? `opacity-100` : `opacity-0`}`}
    >
      {/* CONTAINER */}
      <div className={`flex-center h-full w-full flex-col font-[openSauceReg] text-gray-50 `}>
        {/* ICON */}
        <div className={`relative mb-[25px] flex aspect-square w-[65px] flex-col items-center justify-start overflow-hidden rounded-[10px] bg-green-500`}>
          <div
            style={{ transitionTimingFunction: transitionTimingFunctions.Elastic_Out_And_Settle_Alternate }}
            className={`flex-center  absolute h-[200%] w-full flex-col transition-transform delay-[400ms]
             ${isSuccess ? `-translate-y-1/2` : `translate-y-0`}`}
          >
            {[ProcessIcon, FaCheck].filter(Boolean).map((Icon) => (
              <div className={` flex-center h-[65px] w-full`}>
                <Icon size={25} />
              </div>
            ))}
          </div>
        </div>

        {/* TITLE */}
        <h2
          style={{
            transitionProperty: `background`,
            transitionDuration: `750ms`,
            transitionDelay: `250ms`,
            transitionTimingFunction: transitionTimingFunctions.Slow_Sine_Wave,

            //BACKGROUND
            backgroundPosition: `0` + (isSuccess ? 100 : 0) + '%',
            backgroundSize: `1500%`,
            backgroundRepeat: `no-repeat`,
          }}
          className={`bg-gradient-to-r  from-transparent via-purple-200 to-gray-100 bg-clip-text font-[openSauce] text-[38px] leading-[50px] text-transparent`}
        >
          {title}
        </h2>

        {/* TEXT */}
        <div className={`h-max w-max overflow-hidden`}>
          <small
            style={{
              transitionProperty: `transform , opacity`,
              transitionDuration: `450ms`,
              transitionDelay: `450ms`,
              transitionTimingFunction: transitionTimingFunctions.Slow_Sine_Wave,
            }}
            className={`w-[50%] min-w-[70px] text-[1em] [text-wrap:balance] ${isSuccess ? `translate-y-0 opacity-100` : `translate-y-full opacity-0`}`}
          >
            {message}
          </small>
        </div>

        {/* BUTTONS  */}
        <div className={`flex-center z-[1] h-max w-full translate-y-[48px] gap-x-[12px]`}>
          {/* CLOSE */}
          <button
            onClick={close}
            style={{ transitionTimingFunction: transitionTimingFunctions.Elastic_Out_And_Settle }}
            className={` flex-center group aspect-square h-[35px] origin-center rounded-full transition-transform  delay-[250ms] 
            ${isSuccess ? `scale-100` : `scale-0`}`}
          >
            <span
              style={{ transitionTimingFunction: transitionTimingFunctions.Elastic_Out_And_Settle }}
              className={`pointer-events-none absolute -z-[1] h-full w-full rounded-full bg-blue-100 transition-transform group-hover:scale-0`}
            />
            <CiCircleRemove
              style={{ transitionTimingFunction: transitionTimingFunctions.Elastic_Out_And_Settle }}
              size={25}
              className={`pointer-events-none text-black transition-transform group-hover:scale-[1.2] group-hover:text-white`}
            />
          </button>

          {/* HANDLER ACTION */}
          <button
            {...BTN.BtnEvents}
            className={`flex-center group relative z-[5] h-[35px] w-[150px]  min-w-max rounded-full bg-blue-100 px-[9px] pr-[33px] font-[openSauceReg] text-black outline outline-[1px] outline-offset-[.3px] outline-white `}
          >
            <h2 className={`pointer-events-none  cursor-pointer`}>{BTN.btnPlaceholder || `close window`}</h2>
            <span className={`flex-center pointer-events-none absolute right-[5px] aspect-square w-[26px] overflow-hidden rounded-full bg-black text-gray-200 `}>
              <span
                style={{
                  transitionProperty: `transform , opacity`,
                  transitionDuration: `450ms`,

                  transitionTimingFunction: transitionTimingFunctions.Quick_Start_Slow_Middle_Quick_End,
                }}
                className={`flex-center-around absolute right-0 w-[200%] group-hover:translate-x-1/2`}
              >
                <FaArrowRight size={10} />
                <FaArrowRight size={10} />
              </span>
            </span>
          </button>
        </div>

        {/* THE LINEAR GRADIENT LIGHT SPOT  */}
        <span
          style={{
            transitionProperty: `scale , opacity`,
            transitionDuration: `450ms`,
            transitionDelay: `600ms`,
            transitionTimingFunction: transitionTimingFunctions.Slow_Sine_Wave,
          }}
          className={`absolute aspect-square  w-[180px] origin-center bg-gradient-to-r from-blue-400 via-purple-500 to-green-200 blur-[150px] ${
            isSuccess ? `scale-100 opacity-100` : `scale-0 opacity-0`
          }`}
        />
      </div>
    </div>
  );
}

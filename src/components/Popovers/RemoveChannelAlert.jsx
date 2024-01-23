import React from 'react';
//ICONS
import { CiCircleRemove } from 'react-icons/ci';
import { HeartSpinner } from 'react-spinners-kit';

//DATA
import { transitionTimingFunctions } from '../../../data.js';
import { handlePopoverState } from '../../utils/handlePopoverState.js';

export default function RemoveChannelAlert({ onClick, isDeleting }) {
  return (
    <div id={`remove_channel_alert`} popover={`manual`} className={`h-screen w-screen cursor-default  bg-black/60 font-[openSauceReg] leading-none`}>
      <div
        className={`relative mx-auto  flex  h-[140px] w-[420px]  translate-y-[72%] flex-col items-center justify-between rounded-md bg-gradient-to-r from-gray-50 via-gray-200 to-slate-300  p-[10px]  `}
      >
        <CiCircleRemove
          size={20}
          onClick={() => handlePopoverState(`remove_channel_alert`, true, { active: true, duration: 200, delay: 0 })}
          style={{ transitionTimingFunction: transitionTimingFunctions.Cheeky_Chacha }}
          className={`absolute right-[8px] top-[8px] cursor-pointer transition-transform duration-200 hover:scale-[1.1] `}
        />
        <div className={`flex-center-around h-[87%] w-full`}>
          <span className={`flex-center mx-[8px]  h-full w-[30%]`}>
            <HeartSpinner color={`#3db673`} />
          </span>
          <p>for 24h any member can claim the channel , please make sure you understand the policy of how deleting channel work , read more here</p>
        </div>

        <button
          onClick={onClick}
          style={{
            transitionTimingFunction: transitionTimingFunctions.Disco_Fever,
            backgroundSize: `3000%`,
          }}
          className={` h-[34px] w-[80%] rounded-full bg-black bg-gradient-to-r from-black via-blue-500 to-purple-400 bg-left text-[13px] text-gray-300 outline outline-[.5px] outline-offset-1 outline-black  transition-[background_color] duration-[200ms] hover:bg-red-50 hover:text-black ${
            isDeleting && `loading_screen`
          }`}
        >
          <p></p>i understand and i wish to precede
        </button>
      </div>
    </div>
  );
}

import React from 'react';

//UTILITIES
import { handlePopoverState } from '../../utils/handlePopoverState.js';

//DATA
import { transitionTimingFunctions } from '../../../data.js';

export default function channel_type_info_popover({ type }) {
  /* TODO : add more styling to the popover  */
  return (
    <div popover={`manual`} id={`channel_type_info_popover_${type}`} className={`m-auto h-[190px] w-[400px] px-[20px] rounded-[10px]   bg-slate-100 backdrop:bg-purple-800/50`}>
      <span className={`flex h-full w-full flex-col items-center justify-start py-[20px] font-[openSauceReg]`}>
        <h2 className={`font-[openSauce] text-[29px] leading-[50px] text-black`}>{type}</h2>
        <p>
          {
            {
              community: `best for collecting funds and create causes`,
              tribe: `best for personal uses like getting help and meeting people`,
            }[type]
          }
        </p>

        <button
          //EVENTS
          onClick={() => handlePopoverState(`channel_type_info_popover_${type}`, false)}
          //STYLING
          style={{ transitionTimingFunction: transitionTimingFunctions.Quick_Bounce_And_Settle }}
          className={`absolute bottom-0 m-auto mb-[8px] h-[35px] w-[90%] rounded-full border border-black bg-green-400 p-[5px_2px] text-gray-800 opacity-80 transition-[opacity] duration-[150ms] hover:opacity-100`}
        >
          continue creating
        </button>
      </span>
    </div>
  );
}

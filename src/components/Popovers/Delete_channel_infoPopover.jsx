import React from 'react';

//UTILITIES
import { handlePopoverState } from '../../utils/handlePopoverState.js';

//ICONS
import { CiCircleRemove } from 'react-icons/ci';

export default ({ Name = '',  Describtion = '', Date = new Date() }) => (
  <>
    {/* POPOVER */}
    <div popover={`auto`} id={`delete_channel_info_dialog_${Name}`} className={` top-0 m-auto h-[100px] w-[420px] -translate-y-[150%] rounded-md bg-slate-200 `}>
      <div className={`stretch flex-center p-[5px_3px]`}>
        {/* TITLE AND CLOSE BUTTON */}
        <span className={`flex-center h-full w-[30%]`}>
          <span className={`flex-center mx-[2px] h-full flex-col`}>
            <CiCircleRemove
              onClick={() => handlePopoverState(`delete_channel_info_dialog_${Name}`, true, { delay: 0, active: true, duration: 500 })}
              size={17}
              className={`cursor-pointer hover:scale-[1.1]`}
            />
            <hr className={`h-[80%] w-[1px] scale-x-[.5] bg-black `} />
          </span>
          <span className={`flex h-full w-[90%] flex-col items-start justify-center px-[4px]  `}>
            <h2 className={` font-[openSauce] text-[15px]`}>{Name}</h2>
            <small className={`text-[10px]`}>{Date?.toString().slice(0, 15)}</small>
          </span>
        </span>

        {/* DESC */}
        <span className={`scroller-rounded h-full w-[70%] rounded-md  bg-slate-100 p-[7px]`}>
          <p className={`text-[12.5px] leading-tight`}>{Describtion}</p>
        </span>
      </div>
    </div>
  </>
);

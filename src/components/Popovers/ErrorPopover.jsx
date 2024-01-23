import React from 'react';
//ICONS
import { CiCircleAlert, CiCircleRemove } from 'react-icons/ci';
//DATA
import { transitionTimingFunctions } from '../../../data.js';
import { handlePopoverState } from '../../utils/handlePopoverState';

export default function ErrorPopover({ style, message, close }) {
  if (!Boolean(message)) return;

  //EFFECT
  React.useEffect(() => () => handlePopoverState(`Error_Popover`, Boolean(message)), [message]);
  
  //JSX
  return (
    <div popover={`auto`} className={`m-auto h-full w-full bg-transparent `} id={`Error_Popover`}>
      <div className={`flex h-full w-full  items-start justify-center `}>
        <div
          style={{ ...style }}
          className={`sticky top-[90px] flex min-h-[41px] w-[400px] items-center  justify-start gap-[5px_0_8px_0] rounded-md border border-gray-600 bg-red-500  font-[openSauceReg] text-gray-50`}
        >
          <span className={`flex-center group h-full w-[80px]`}>
            {[
              { ICON: CiCircleAlert, key: React.useId(), hover: false },
              { ICON: CiCircleRemove, key: React.useId(), hover: true },
            ].map(({ ICON, key, hover }) => (
              <ICON
                key={key}
                size={24}
                onClick={() => close()}
                style={{
                  //TRANSITION
                  transitionProperty: `scale , opacity`,
                  transitionDuration: `250ms , 250ms`,
                  transitionTimingFunction: transitionTimingFunctions.Elastic_Out_And_Settle,
                }}
                className={
                  {
                    true: `absolute scale-0 cursor-pointer opacity-0 group-hover:scale-100 group-hover:opacity-100`,
                    false: `absolute scale-100 cursor-pointer opacity-100 group-hover:scale-0 group-hover:opacity-0`,
                  }[hover]
                }
              />
            ))}
          </span>

          <small className={`flex h-full w-[80%] items-center justify-start text-[12.5px]`}>{message}</small>
        </div>
      </div>
    </div>
  );
}

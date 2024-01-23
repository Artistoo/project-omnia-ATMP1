import React from 'react';

//** DATA **
import {transitionTimingFunctions} from '../../../data.js';

export default function Range({steps = 20, scale = 100, style}) {
  //RANGE STATES
  const [from_to, setFrom_to] = React.useState({from: false, to: false});

  //RANGE EFFECTS
  React.useEffect(() => {
    console.log(from_to);
  }, [from_to]);

  return (
    <div stlye={{...style}} className={`flex-center-around h-[60px] w-full   `}>
      {new Array(steps)
        .fill('')
        .map((step, step_ind) => Math.floor(scale / (step_ind + 1)))
        .map((value, step_ind) => {
          //BAR STATE
          const [isEditing, setIsEditing] = React.useState(false);

          //REFS
          const Ind_Step_ref = React.createRef();

          //BAR VAR
          const has_range = Object.values(from_to).some(Boolean);
          const in_range = has_range && value > from_to.from && value < from_to.to;
          //BAR EVENTS & HANDLERS

          return (
            <span //BAR CONTAINER
              ref={Ind_Step_ref}
              key={React.useId()}
              className={`group relative flex h-full w-[6px] cursor-pointer items-end justify-center bg-gray-400/50`}>
              <small //VALUE
                style={{transitionTimingFunction: transitionTimingFunctions.Elastic_Out_And_Settle}}
                className={`absolute  top-0 font-[openSauce] text-[10px] text-gray-900 opacity-0 transition-all duration-200 group-hover:-translate-y-full group-hover:opacity-100`}>
                {value}
              </small>
              <span //BAR
                className={`pointer-events-none h-[90%] w-full  rounded-full bg-black group-hover:scale-x-[1.2]`}>
                <span // BAR BG
                  style={{clipPath: `circle(0% at 100% 100%)`}}
                  className={''}
                />
              </span>
            </span>
          );
        })
        .reverse()}
    </div>
  );
}

import React from 'react';
//DATA
import { transitionTimingFunctions } from '../../../data';

export default function DefaultInput({ placeholder, style = { FormStyle: {}, InputStyle: {} }, InputEvents, InputProps, id }) {
  return (
    <form style={{ ...style.FormStyle, borderRadius: `5px` }} onSubmit={(e) => e.preventDefault()} className={`flex-center group sticky top-[-2px] h-[33px] w-full`}>
      <input //INPUT
        {...(id && { id })}
        {...InputProps}
        {...InputEvents}
        name={`options_search_param_input`}
        placeholder={placeholder}
        style={{ ...style.InputStyle }}
        className={`stretch z-[1] rounded-[inherit]  bg-gray-100 px-[8px] outline-none`}
      />
      <span //BORDER
        style={{
          transitionTimingFunction: transitionTimingFunctions.Groovy_Glide,
          backgroundSize: `3000%`,
        }}
        className={`absolute h-full w-full scale-x-[1.003] scale-y-[1.03] rounded-[inherit]  bg-gradient-to-r  from-transparent to-gray-600 bg-left transition-all duration-500 group-focus-within:bg-right`}
      />
    </form>
  );
}

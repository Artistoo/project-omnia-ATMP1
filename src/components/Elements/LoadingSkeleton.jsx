import React from 'react';
import { v4 } from 'uuid';

export default function LoadingSkeleton({
  bg = `bg-gradient-to-r from-gray-300 via-slate-100 to-slate-200`,
  text = '',
  wrapper = false,
  count = 1,
  rounded = 5,
  h = 35,
  w = 90,
}) {
  const Skeleton = (
    <>
      {Array(count)
        .fill('')
        .map(() => (
          <span
            //ID
            key={v4()}
            //STYLING
            style={{ width: w + '%', height: h + 'px', borderRadius: rounded + 'px' }}
            className={`  loading_screen my-[4px] ${bg} `}
          />
        ))}
      {text && <small className={`font-[openSauceReg] text-gray-800`}>{text}</small>}
    </>
  );
  return React.createElement(
    wrapper ? 'div' : React.Fragment,
    (wrapper && { className: `stretch flex-center flex-col` }) || {},
    Skeleton
  );
}

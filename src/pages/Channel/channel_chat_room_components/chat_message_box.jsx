import React from "react";

export default function chat_message_box({ in_conv = false, msg, isSender }) {
  const { message, date } = msg;
  const {
    userName = undefined,
    LastName = undefined,
    Avatar = undefined,
    gender = undefined,
  } = msg.sender_info;

  if (in_conv) {
    return <div></div>;
  }

  return (
    <div
      className={`slide_inView_animation  relative flex h-auto w-max max-w-[80%] items-start justify-center gap-x-[10px]  p-[2px_5px] md:self-start ${
        isSender ? `self-end` : `self-start`
      }`}
    >
      <img
        src={Avatar}
        className={`sticky top-[20px] aspect-square h-[40px] rounded-full ${
          isSender ? `hidden` : `flex`
        }`}
      />
      <div
        className={`relative flex   flex-col items-start justify-start gap-y-[5px] text-start  text-[15px] text-gray-100 `}
      >
        <h3
          className={`
        ${isSender ? `hidden` : `flex`}`}
        >
          {`${userName} ${LastName}`}
        </h3>
        <div
          className={`flex h-max w-[100%] flex-col items-start justify-center rounded-sm  bg-gradient-to-tl p-[3px_5px] outline outline-[0.6px] gap-y-[3px] outline-gray-200/50
          ${
            isSender
              ? ` from-gray-900 to-gray-900`
              : `from-gray-950 to-slate-950`
          }`}
        >
          <p>{message}</p>
          <sub
            className={`h-[7px] text-[.6em] text-gray-500 ${
              !isSender ? `self-start` : `self-end`
            }`}
          >
            {date}
          </sub>
        </div>
      </div>
    </div>
  );
}

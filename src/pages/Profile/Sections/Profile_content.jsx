import React from "react";

//________________components________________
import Friends from "../ProfileComponents/Friends";
import AddPost from "../ProfileComponents/AddPost";

export default function Profile_content({ Profile, currentUser }) {
  const lg = `1016px`;

  return (
    <div
      className={`relative flex min-h-[520px] w-[95%] flex-wrap items-start justify-around gap-x-[10px]  border px-[8px] pt-[30px] lg:justify-start `}
    >
      <div
        className={` top-[80px] flex w-[80%] min-w-[320px] flex-col items-center justify-center border border-red-500 px-[30px] py-[10px] md:w-[70%] min-[1015px]:sticky lg:min-h-[320px] lg:w-[30%] lg:justify-start lg:px-[0]`}
      >
        <Friends />
      </div>
      <div
        className={`flex min-h-[320px] w-[80%] min-w-[400px] flex-col items-center justify-start border px-[30px] py-[10px] md:w-[70%] lg:w-[60%] lg:pl-[70px] lg:pr-[100px]`}
      >
        <AddPost />
      </div>
    </div>
  );
}

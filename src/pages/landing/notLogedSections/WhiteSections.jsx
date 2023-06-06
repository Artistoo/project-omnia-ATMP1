import React from "react";
//importing Section components
import Guide from "./Guide.jsx";
import Categories from "./Categories.jsx";

export default function categories() {
  return (
    <div
      style={{
        transition: `opacity 300ms , transform 500ms ease`,
      }}
      className={`relative flex    flex-col gap-y-[50px] overflow-hidden bg-white px-[20px] py-[33px] pt-[80px]  
      `}
    >
      <Guide />
      <Categories />
    </div>
  );
}

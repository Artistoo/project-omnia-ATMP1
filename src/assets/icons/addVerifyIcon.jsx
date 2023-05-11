import React from "react";

export default function addVerifyIcon({ confirmed, valid }) {
  React.useEffect(() => {}, [valid, confirmed]);
  const [hover, setHover] = React.useState(true);
  return (
    <div
      style={{
        transition: `transform 300ms ease-in-out`,
      }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`text-white relative w-[20px] aspect-square rounded-full bg-gradient-to-l from-white to-gray-100 hover:to-gray-300 flex items-center justify-center  ${
        valid ? "rotate-[50deg]   translate-x-[-22px]" : ""
      }`}
    >
      <div
        style={{
          transition: `transform 300ms ease-in-out`,
        }}
        className={`bg-black w-[1.6px] h-[60%] absolute   origin-center  ${
          valid ? "translate-x-[2px] scale-x-[1.2] " : ""
        }`}
      />
      <div
        style={{
          transition: `transform 300ms ease-in-out`,
        }}
        className={`bg-black w-[1.6px] h-[60%] rotate-[90deg] absolute ${
          valid
            ? "rotate-[90deg]   scale-y-[0.48] scale-x-[1.1] translate-y-[5.5px] translate-x-[-0.8px]"
            : ""
        }`}
      />
    </div>
  );
}

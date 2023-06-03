import Logo from "../../assets/icons/Logo.jsx";
import React from "react";
import Brightness from "../../assets/video/LightPurpleSparks.mp4";
export default function Details() {
  return (
    <div className="min-h-[800px] w-full">
      {/* COVER */}
      <div className="absolute top-0 z-[-1] h-[600px] w-full">
        <video
          onMouseOver={(e) => e.target.play()}
          loop
          autoPlay
          muted
          src={Brightness}
          className={` top-0 h-full w-full object-cover blur-[10px]`}
        />
        <div
          className={`absolute bottom-0  z-[1] h-[80%] w-full translate-y-[22px] bg-gradient-to-t from-black to-transparent`}
        />
      </div>
    </div>
  );
}

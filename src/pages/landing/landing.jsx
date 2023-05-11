import React from "react";
import Hero from "./sections/hero";
import Login from "./sections/loginRegister";
import Interest from "./sections/interests";
export default function home() {
  return (
    <div className={`w-full min-h-[2500px] overflow-x-hidden `}>
      <Hero />
      <Interest />
      <Login />
    </div>
  );
}

import React from "react";

// _____________ COMPONENTS _____________
import Hero from "./notLogedSections/hero";
import Interest from "./notLogedSections/interests";
import Services from "./notLogedSections/services";
import Colors from "./notLogedSections/colors";
import WhiteSections from "./notLogedSections/WhiteSections";
import Examples from "./notLogedSections/Examples";
import Divorcity from "./notLogedSections/Divorcity";
import FAQ from "./notLogedSections/FAQ";
import { Routes, Route } from "react-router-dom";
import { userStateContext } from "../../context/userState";

export default function home() {
  const LandingPage = () => {
    return (
      <div className={`flex max-w-full flex-col gap-y-[50px]`}>
        <Hero />
        <Interest />
        <Services />
        <Colors />
        <WhiteSections />
        <Examples />
        <Divorcity />
        <FAQ />
      </div>
    );
  };

  return (
    <div
      className={` m-auto flex w-full max-w-[1400px] flex-col items-center  justify-center `}
    >
      <LandingPage />
    </div>
  );
}

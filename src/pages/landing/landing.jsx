import React from "react";

// _____________ COMPONENTS _____________
import Hero from "./notLogedSections/hero";
import Interest from "./notLogedSections/interests";
import Services from "./notLogedSections/services";
import Colors from "./notLogedSections/colors";
import Categories from "./notLogedSections/categories";
import Features from "./notLogedSections/features";
import Divorcity from "./notLogedSections/Divorcity";
import { Routes, Route } from "react-router-dom";
import { userStateContext } from "../../context/userState";

export default function home() {
  const { userState } = React.useContext(userStateContext);
  const NotLogedRoute = () => {
    return (
      <div className={`gap-y-[50px] flex flex-col max-w-full`}>
        <Hero />
        <Interest />
        <Services />
        <Colors />
        <Categories />
        <Features />
        <Divorcity />
      </div>
    );
  };
  const LogedRoute = () => {
    return <></>;
  };
  const Admin = () => {
    return <></>;
  };

  return (
    <div className={` max-w-[1400px] w-full flex flex-col items-center justify-center  m-auto `}>
      {userState?.loged ? (
        !userState.admin ? (
          <Admin />
        ) : (
          <LogedRoute />
        )
      ) : (
        <NotLogedRoute />
      )}
    </div>
  );
}

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
      <div className="max-w-[1400px] flex flex-col items-center justify-center  m-auto">
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
    <div className={`w-full min-h-[1600px] overflow-x-hidden `}>
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

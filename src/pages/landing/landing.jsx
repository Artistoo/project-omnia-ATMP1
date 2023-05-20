import React from "react";
import Hero from "./notLogedSections/hero";
import Login from "./notLogedSections/loginRegister";
import Interest from "./notLogedSections/interests";
import { Routes, Route } from "react-router-dom";
import { userStateContext } from "../../context/userState";

export default function home() {
  const { userState } = React.useContext(userStateContext);
  const NotLogedRoute = () => {
    return (
      <>
        <Hero />
        <Interest />
        <Login />
      </>
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

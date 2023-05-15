import React, { useContext } from "react";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";

//--------------Context---------------
import { userStateContext } from "./context/userState";

//---------------Pages----------------
import Landing from "./pages/landing/landing";
import Home from "./pages/home/home";
import Dashboard from "./pages/dashboard/dashboard";
import Settings from "./pages/settings/Settings";
//------------components---------------
import Nav from "./components/Nav";
import Footer from "./components/Footer";
//-----------JSX component------------
function App() {
  //context
  const { userState } = React.useContext(userStateContext);
  //windowState
  const [pageLoading, setPageLoading] = React.useState(true);

  React.useEffect(() => {
    window.onload = setPageLoading(false);
  }, [pageLoading]);
  return !pageLoading ? (
    <>
      <Nav pageState={pageLoading} />
      <Routes>
        <Route
          index
          element={
            userState.loged ? (
              userState.admin ? (
                <Dashboard />
              ) : (
                <Home />
              )
            ) : (
              <Landing />
            )
          }
        />
        <Route
          path={`/settings`}
          element={() => {
            if (loeged) {
              return <Settings />;
            }
            return (
              <div
                className={`w-full h-full flex items-center justify-center `}
              >
                <p>
                  you need to be loged in in order to edit your account setting
                  , no account found
                </p>
                <NavLink to={"/"}>go to login page</NavLink>
              </div>
            );
          }}
        />
        <Route path="user/:userId" element={``} />
      </Routes>
      <Footer />
    </>
  ) : (
    <p>Loading</p>
  );
}

export default App;

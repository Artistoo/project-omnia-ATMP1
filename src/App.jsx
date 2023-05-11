import React, { useContext } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Vector from "./assets/img/VectorLandingPage.png";

import { userStateContext } from "./context/userState";
//pages
import Landing from "./pages/landing/landing";
import Home from "./pages/home/home";
import Dashboard from "./pages/dashboard/dashboard";
import Settings from "./pages/settings/Settings";
//components
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  //context
  const { userState } = React.useContext(userStateContext);
  //windowState
  const [pageLoad, setPageLoad] = React.useState(false);
  React.useEffect(() => {
    window.onload = setPageLoad(true);
  }, [pageLoad]);
  return (
    <>
      <Nav pageState={pageLoad} />
      <Routes>
        <Route
          index
          element={(() => {
            const { admin, loged } = userState;
            if (loged) {
              return admin ? <Dashboard /> : <Home />;
            } else {
              return <Landing />;
            }
          })()}
        />
        <Route
          action={`/settings`}
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;

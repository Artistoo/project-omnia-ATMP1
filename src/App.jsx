import React, { useContext } from "react";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";

//__________________CONTEXT_____________________
import { userStateContext } from "./context/userState";

//__________________PAGES_______________________
import Landing from "./pages/landing/landing";
import Dashboard from "./pages/dashboard/dashboard";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/Dynamic/Profile/Profile";
import LoginRegister from "./pages/Auth/loginRegister";
//___________________COMPONENTS_______________________
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import FooterInfo from "./pages/Dynamic/FooterInfomation/FooterInfo";

//___________________JSX component______________________
function App() {
  //<-------------CONTEXT----------->
  const { userState } = React.useContext(userStateContext);

  /* <------------------ STATE HOOK ------------------> */
  const [pageLoading, setPageLoading] = React.useState(true);
  const [scrollPosition, setScrollPosition] = React.useState(0);

  //<----------------EFFECT HOOK --------------------->
  React.useEffect(() => {
    window.onscroll = (e) => {
      const windowPosition = e.clientY;
      setScrollPosition(windowPosition);
    };
  }, [scrollPosition]);

  return !pageLoading ? (
    <>
      <Nav pageState={pageLoading} scrollPosition={scrollPosition} />

      {/* __________________<<<ROUTES>>>___________________ */}
      <Routes>
        {/* ____________LANDING ROUTE___________ */}
        <Route index element={<Landing />} />

        {/* _____________SETTING ROUTE________________ */}
        <Route path={`/settings`} element={<Settings />} />

        {/* ____________USER ACCOUNT_________________ */}
        <Route path="user/AccountAuth" element={<LoginRegister />} />

        {/* <<<<<<<------- DYNAMIC ROUTING ------->>>>>>>> */}

        {/* _____________USER PROFILE_________________ */}
        <Route path="user/:userId" element={<Profile />} />
        {/* _____________FOOTER LINKs NAVIGATION _____________ */}
        <Route path={`/moreAbout/:about`} element={<FooterInfo />} />
      </Routes>
      <Footer />
    </>
  ) : (
    <Loading loading={{ setPageLoading, pageLoading }} />
  );
}

export default App;
/* 
userState.loged ? (
              userState.admin ? (
                <Dashboard />
              ) : (
                <Home />
              )
            ) : (
              <Landing />
            ) */

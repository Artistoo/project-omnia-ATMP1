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
import Details from "./pages/Details/Details";

//___________________JSX component______________________
function App() {
  //<-------------CONTEXT----------->
  const { userState } = React.useContext(userStateContext);

  /* <------------------ STATE HOOK ------------------> */
  const [pageLoading, setPageLoading] = React.useState(true);
  const [scrollPosition, setScrollPosition] = React.useState(0);

  //<----------------EFFECT HOOK --------------------->

  React.useEffect(() => {
    const handleScrolling = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScrolling);
    return () => {
      removeEventListener("scroll", handleScrolling);
    };
  }, []);

  return !pageLoading ? (
    <div>
      {/* _________________<<<NAVBAR>>>____________________ */}

      <Nav pageState={pageLoading} scrollPosition={scrollPosition} />

      {/* __________________<<<ROUTES>>>___________________ */}
      <Routes>
        {/* ____________LANDING ROUTE___________ */}
        <Route index element={<Landing />} />

        {/* _____________SETTING ROUTE________________ */}
        <Route path={`/settings`} element={<Settings />} />

        {/* ____________USER ACCOUNT_________________ */}
        <Route path="user/AccountAuth" element={<LoginRegister />} />
        {/* ____________USER ACCOUNT_________________ */}
        <Route path="/details" element={<Details />} />

        {/* <<<<<<<------- DYNAMIC ROUTING ------->>>>>>>> */}

        {/* _____________USER PROFILE_________________ */}
        <Route path="user/:userId" element={<Profile />} />
        {/* _____________FOOTER LINKs NAVIGATION _____________ */}
        <Route path={`/moreAbout/:about`} element={<FooterInfo />} />
      </Routes>

      {/* _________________<<<FOOTER>>>>___________________ */}
      <Footer />
    </div>
  ) : (
    <Loading loading={{ setPageLoading, pageLoading }} />
  );
}

export default App;

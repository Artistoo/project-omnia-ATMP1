import React, { useContext } from "react";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import { debounce, throttle } from "lodash";
//__________________CONTEXT_____________________
import { userStateContext } from "./context/userState";

//__________________PAGES_______________________
import Landing from "./pages/landing/landing";
import Dashboard from "./pages/dashboard/dashboard";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/Dynamic/Profile/Profile";
import LoginRegister from "./pages/Auth/loginRegister";
import ContactForm from "./pages/Contact/contactForm";
import GetReady from "./pages/Auth/stages/GetReady.jsx";

//___________________COMPONENTS_______________________
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import FooterInfo from "./pages/Dynamic/FooterInfomation/FooterInfo";
import Details from "./pages/Details/Details";
import NoPageFound from "./pages/NotFound/NoPageFound";
import SavedUsers from "./pages/savedUsers/savedUsers";

//___________________JSX component______________________
function App() {
  //<-------------CONTEXT----------->
  const { userState, CookiesEnabled } = React.useContext(userStateContext);
  /* <------------------ STATE HOOK ------------------> */
  const [pageLoading, setPageLoading] = React.useState(true);

  return !pageLoading ? (
    <div>
      {/* _________________<<<NAVBAR>>>____________________ */}
      <Nav />

      <Routes>
        <Route index element={<Landing />} />

        <Route path={`/settings`} element={<Settings />} />

        <Route path="/details" element={<Details />} />

        <Route path="/user">
          <Route path="AccountAuth" element={<LoginRegister />} />
          <Route path="GetReady" element={<GetReady />} />
          <Route path="savedUsers" element={<SavedUsers />} />
        </Route>

        <Route path="/contactUs" element={<ContactForm />} />

        <Route path="*" element={<NoPageFound />} />
        {/* <<<<<<<------- DYNAMIC ROUTING ------->>>>>>>> */}

        <Route path="user/:userId" element={<Profile />} />
        <Route path={`/moreAbout/:about`} element={<FooterInfo />} />
      </Routes>

      {/* __________________<<<ROUTES>>>___________________ */}

      {/* _________________<<<FOOTER>>>>___________________ */}
      <Footer />
    </div>
  ) : (
    <Loading loading={{ setPageLoading, pageLoading }} />
  );
}

export default App;

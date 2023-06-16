import React, { useContext } from "react";
import {
  NavLink,
  Route,
  Routes,
  Navigate,
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
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

  return !pageLoading ? (
    <div>
      {/* _________________<<<NAVBAR>>>____________________ */}
      <Nav pageState={pageLoading} />

      {/* __________________<<<ROUTES>>>___________________ */}
      <Routes>
        <Route index element={<Landing />} />

        <Route path={`/settings`} element={<Settings />} />

        <Route path="/user/AccountAuth" element={<LoginRegister />} />

        <Route path="/details" element={<Details />} />

        <Route path="/contactUs" element={<ContactForm />} />

        {/* <<<<<<<------- DYNAMIC ROUTING ------->>>>>>>> */}

        <Route path="user/:userId" element={<Profile />} />

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

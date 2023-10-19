import React, { useContext } from "react";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import { debounce, throttle } from "lodash";
//__________________CONTEXT_____________________
import { userStateContext } from "./context/Data_context";
//<<-------REDUX------->>
import { useSelector, useDispatch } from "react-redux";
import { updateUserState } from "./redux/userStateSlice";
//__________________PAGES_______________________
import Landing from "./pages/landing/landing";
import Dashboard from "./pages/dashboard/dashboard";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/Profile/Profile.jsx";
import LoginRegister from "./pages/Auth/loginRegister";
import ContactForm from "./pages/Contact/contactForm";
import GetReady from "./pages/Auth/stages/GetReady.jsx";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import HomePage from "./pages/Home/HomePage";
import MainHomePage from "./pages/Home/HomeSections/Main/MainHomePage.jsx";
import Made_for_you from "./pages/SearchPage/SearchComponents/MadeForYou.jsx";
import Favorite from "./pages/Home/HomeSections/Favorite/Favorite.jsx";
import Channel from "./pages/Channel/Channel_chat_room";

//___________________COMPONENTS_______________________
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import FooterInfo from "./pages/Dynamic/FooterInfomation/FooterInfo";
import Details from "./pages/Details/Details";
import NoPageFound from "./pages/NotFound/NoPageFound";
import SavedUsers from "./pages/savedUsers/savedUsers";
import SearchPage from "./pages/SearchPage/SearchPage.jsx";

//___________________JSX component______________________
function App() {
  //<-------------CONTEXT----------->
  /* <------------------ STATE HOOK ------------------> */
  const [pageLoading, setPageLoading] = React.useState(true);
  const [user, setUser] = React.useState(() => {
    const storedUser = localStorage.user && JSON.parse(localStorage.user);
    return Boolean(storedUser) ? storedUser : null;
  });

  React.useEffect(() => {
    console.log(user);
    const handleStorageChange = (event) => {
      if (event.key === "user") {
        const storedUser = localStorage.user && JSON.parse(localStorage.user);
        setUser(Boolean(storedUser) ? storedUser : null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [localStorage]);

  /* <------------------ LAZY COMPONENTS ------------------> */
  const MainLazy = React.lazy(() =>
    import("./pages/Home/HomeSections/Main/MainHomePage.jsx")
  );
  const MadeForYouLazy = React.lazy(() =>
    import("./pages/SearchPage/SearchComponents/MadeForYou.jsx")
  );
  const FavoriteLazy = React.lazy(() =>
    import("./pages/Home/HomeSections/Favorite/Favorite.jsx")
  );

  return !pageLoading ? (
    <div
      style={{
        viewTransitionName: `LogedPagesScrollingAnimation`,
      }}
    >
      {/* _________________<<<NAVBAR>>>____________________ */}
      <Nav />
      {/* TODO: add the admin dashboard button and layout */}
      <Routes>
        {user ? (
          <Route path={"/"} element={<HomePage />}>
            <Route index element={<MainLazy />} />
            <Route path={"made_for_you"} element={<MadeForYouLazy />} />
            <Route path={"favorite"} element={<FavoriteLazy />} />
          </Route>
        ) : (
          <Route index element={<Landing />} />
        )}

        <Route path={`/settings`} element={<Settings />} />

        <Route path="/details" element={<Details />} />

        <Route path="/user">
          <Route path="AccountAuth" element={<LoginRegister />} />
          <Route path="GetReady" element={<GetReady />} />
          <Route path="savedUsers" element={<SavedUsers />} />
        </Route>
        <Route path="Profile/:profileID" element={<Profile />} />
        <Route path="/contactUs" element={<ContactForm />} />

        <Route path="/channel_chat_room/:name" element={<Channel />} />

        <Route path="search/:param" element={<SearchPage />} />
        <Route path="*" element={<NoPageFound />} />
        {/* <<<<<<<------- DYNAMIC ROUTING ------->>>>>>>> */}
        {localStorage?.Link && (
          <Route
            path={`forgetPassword/${JSON.parse(localStorage.Link)}`}
            element={<ForgetPassword />}
          />
        )}

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

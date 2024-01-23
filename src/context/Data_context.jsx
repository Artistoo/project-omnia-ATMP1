import React from "react";
import Loading from "../pages/Loading/Loading.jsx";
import PleaseEnableCookies from "../pages/EnableCookies/PleaseEnableCookies.jsx";
import { useNavigate } from "react-router-dom";
import { useUserStateMutation } from "../redux/API.js";
//ASSETS
import Logo from "../assets/icons/Logo.jsx";

//CREATE CONTEXT HOOK
export const userStateContext = React.createContext();

export default function User({ children }) {
  //USER STATE AND USER DATA
  const [userState, setUserState] = React.useState({
    loged: null,
    admin: false,
  });

  const [
    getuserState,
    { isLoading: isFetchingCurrentUser, error, data: currentUser },
  ] = useUserStateMutation();

  React.useEffect(() => {
    getuserState()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [currentUser]);

  //React Router
  const navigate = useNavigate();

  //COOKIES AND SESSION ENABLED
  const [CookiesEnabled, setCookiesEnabled] = React.useState(true);
  React.useEffect(() => {
    try {
      localStorage.setItem("cookies", "true");
      localStorage.removeItem("cookies");
      setCookiesEnabled(true);
    } catch (err) {
      setCookiesEnabled(false);
    }
  }, []);

  const setuser = (user) => {
    setUserState((current) => ({
      loged: user?.user,
      admin: user?.user?.admin,
    }));
  };

  return (
    <userStateContext.Provider
      value={{
        CookiesManage: {
          CookiesEnabled,
          setCookiesEnabled,
        },
        userState,
      }}
    >
      {CookiesEnabled ? children : <PleaseEnableCookies />}
    </userStateContext.Provider>
  );
}

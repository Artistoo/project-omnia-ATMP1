import React from "react";
import PleaseEnableCookies from "../pages/EnableCookies/PleaseEnableCookies.jsx";

export const userStateContext = React.createContext();

export default function User({ children }) {
  const [CookiesEnabled, setCookiesEnabled] = React.useState(true);
  const [userState, setUserState] = React.useState({
    loged: false,
    admin: false,
  });

  React.useEffect(() => {
    try {
      if (localStorage?.user) {
        setUserState((prevState) => ({
          ...prevState,
          loged: true,
          admin: JSON.parse(localStorage?.user)?.admin,
        }));
      } else {
        setUserState((prevState) => ({
          ...prevState,
          loged: false,
          admin: false,
        }));
      }
    } catch (error) {
      setCookiesEnabled(false);
    }
  }, []);

  return (
    <userStateContext.Provider
      value={{
        CookiesEnabled,
        setCookiesEnabled,
        userState,
        setUserState,
      }}
    >
      {CookiesEnabled ? children : <PleaseEnableCookies />}
    </userStateContext.Provider>
  );
}

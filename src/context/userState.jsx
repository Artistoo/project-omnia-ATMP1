import React from "react";
import PleaseEnableCookies from "../pages/EnableCookies/PleaseEnableCookies.jsx";

import { useGetUserInfoQuery } from "../redux/API.js";

export const userStateContext = React.createContext();

export default function User({ children }) {
  const [CookiesEnabled, setCookiesEnabled] = React.useState(true);
  const {
    data: user,
    isLoading: isFetchingUser,
    error: UserError,
  } = useGetUserInfoQuery(
    localStorage?.user && JSON.parse(localStorage?.user)?._id
  );

  const [userState, setUserState] = React.useState({
    loged: false,
    admin: false,
  });
  const currentUser = React.useMemo(() => user?.data, [user?.data]);
  React.useEffect(() => {
    try {
      if (currentUser?.user) {
        localStorage.setItem("user", JSON.stringify(currentUser.data.user));
        setUserState((c) => ({ loged: true, admit: currentUser?.admin }));
      } else if (currentUser?.error) {
        console.log(currentUser?.error);
        localStorage.removeItem("user");
        setUserState((c) => ({ loged: false, admit: false }));
      } else {
        if (localStorage?.user) {
          setUserState((c) => ({
            loged: true,
            admin: JSON.parse(localStorage?.user)?.admin,
          }));
        } else {
          setUserState((c) => ({
            loged: false,
            ...c,
          }));
        }
      }
    } catch (error) {
      console.log(error);
      setCookiesEnabled(false);
    }
  }, [currentUser, currentUser?.user]);
  React.useEffect(() => {
    if (localStorage?.user) {
      setUserState((c) => ({
        loged: true,
        admin: JSON.parse(localStorage?.user)?.admin,
      }));
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

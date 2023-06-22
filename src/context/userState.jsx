import React from "react";
export const userStateContext = React.createContext();
export default function user({ children }) {
  const [userState, setUserState] = React.useState({
    loged: false,
    admin: false,
  });

  React.useEffect(() => {
    if (localStorage?.user) {
      setUserState((c) => ({
        loged: true,
        admin: JSON.parse(localStorage?.user)?.admin,
      }));
    } else {
      setUserState((c) => ({
        loged: false,
        admin: false,
      }));
    }
  }, [localStorage?.user]);

  return (
    <userStateContext.Provider
      value={{
        userState,
        setUserState,
      }}
    >
      {children}
    </userStateContext.Provider>
  );
}

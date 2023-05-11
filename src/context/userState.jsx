import React from "react";
export const userStateContext = React.createContext();
export default function user({ children }) {
  const [userState, setUserState] = React.useState({
    loged: false,
    admin: false,
  });

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

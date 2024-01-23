import React from "react";

export const Show_Footer_Provider = React.createContext({
  footerVisible: false,
  FooterVisibilityHandler: () => {},
});

export default function ShowFooterProvider({ children }) {
  const [footerVisible, setFooterVisible] = React.useState(false);
  const FooterVisibilityHandler = (show) => {
    setFooterVisible(show);
  };
  return (
    <Show_Footer_Provider.Provider
      value={{ FooterVisibilityHandler, footerVisible }}
    >
      {children}
    </Show_Footer_Provider.Provider>
  );
}

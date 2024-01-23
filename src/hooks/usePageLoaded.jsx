import React from "react";
export const usePageLoaded = () => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (document.readyState === "complete") {
      setLoaded(true);
    }
  }, []);
  return [loaded];
};

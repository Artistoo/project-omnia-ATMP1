import React from "react";

export const useScrollingDirection = () => {
  const [scrollingDir, setScrollingDir] = React.useState();

  React.useEffect(() => {
    let currentScrollingPosition = window.pageYOffset;
    const handleScrolling = () => {
      setScrollingDir({
        dir:
          window.pageYOffset === 0
            ? false
            : Boolean(window.pageYOffset > currentScrollingPosition),
        offset: window.pageYOffset,
      });
      currentScrollingPosition = window.pageYOffset;
    };
    window.addEventListener("scroll", handleScrolling);
    return () => window.removeEventListener("scroll", handleScrolling);
  });
  return [scrollingDir];
};

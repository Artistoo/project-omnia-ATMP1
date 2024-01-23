import React from "react";

export const useMediaQuery = function () {
  const medias = [
    { media: "sm", size: 640 },
    { media: "md", size: 768 },
    { media: "lg", size: 1210 },
  ];
  const handleMatch = () =>
    medias.filter(({ media, size }) => window.innerWidth < size)[0]?.media;
  const [matches, setMatches] = React.useState(handleMatch());
  React.useEffect(() => {
    const handleResize = () => {
      setMatches(handleMatch());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return [matches];
};

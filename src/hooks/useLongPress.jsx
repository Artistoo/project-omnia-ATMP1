import React, { useEffect, useState } from "react";

export const useLongPress = (duration = 400) => {
  const [isPressing, setIsPressing] = useState({
    press: false,
    long_press: false,
  });

  useEffect(() => {
    const { press } = isPressing;

    const handleMoveEnd = () => {
      setIsPressing((prev) => ({ ...prev, press: false, long_press: false }));
    };

    if (press) {
      const setPressingTimer = setTimeout(() => {
        setIsPressing((prev) => ({ ...prev, long_press: true }));
      }, duration);

      window.addEventListener("mousemove", handleMoveEnd);
      window.addEventListener("touchmove", handleMoveEnd);

      return () => {
        clearTimeout(setPressingTimer);
        window.removeEventListener("mousemove", handleMoveEnd);
        window.removeEventListener("touchmove", handleMoveEnd);
      };
    }
  }, [isPressing, duration]);

  const startPress = () => {
    setIsPressing({ press: true, long_press: false });
  };
  const endPress = () => {
    setIsPressing({ press: false, long_press: false });
  };

  return { isPressing, startPress, endPress };
};

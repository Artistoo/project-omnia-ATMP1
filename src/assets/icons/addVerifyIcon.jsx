import React from "react";

export default function addVerifyIcon({ confirmed, valid }) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    if (valid) {
      setReady(true);
    }
  }, [valid]);

  return (
    /* the white circle container  */
    <div
      className={`left-[15px] h-[20px] aspect-square self-center absolute  bg-white rounded-full flex items-center justify-center `}
    >
      {/* The white full background */}
      <div
        className={`bg-green-300 absolute rounded-full h-full w-full transition-transform duration-[900ms] ${
          confirmed
            ? `scale-[30] translate-x-[-5px]`
            : "scale-[0] translate-x-[-5px]"
        }`}
      />
      {/* Arrow Plus icon Container */}
      <div
        style={{
          transition: `transform 1000ms ease-in-out`,
        }}
        className={`w-full h-full flex items-center justify-center ${
          ready && confirmed ? `translate-x-[-5px]` : `translate-x-[0px]`
        }`}
      >
        {[
          {
            style: { transition: `transform 800ms ease-in-out` },
            className: `h-[11px] w-[1.1px] origin-bottom bg-black absolute ${
              ready && confirmed
                ? `rotate-[-50deg]  scale-x-[1.2] scale-y-[0.8]`
                : `rotate-[0deg]  scale-x-[1] scale-y-[1]`
            }`,
          },
          {
            style: { transition: `transform 800ms  ease-in-out` },
            className: `h-[11px] origin-top w-[1.1px] bg-black absolute ${
              ready && confirmed
                ? `rotate-[50deg]   scale-x-[1.2] scale-y-[0.8]`
                : `rotate-[0deg]  scale-x-[1] scale-y-[1]`
            }`,
          },
          {
            style: { transition: `transform 800ms  ease-in-out` },
            className: `h-[11px] w-[1.1px] bg-black absolute rotate-[90deg] ${
              ready && confirmed
                ? `scale-y-[1.3] scale-x-[1.2] translate-x-[0.3px] `
                : `scale-y-[1] scale-x-[1] translate-x-[0px]`
            }`,
          },
        ].map((line, index) => (
          <div style={line.style} className={line.className} />
        ))}
      </div>
    </div>
  );
}

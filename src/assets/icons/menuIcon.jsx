import React from "react";

export default function menuIcon({ menuState, ScrollPosition }) {
  const { open, setOpen } = menuState;
  const [animateMenu, setanimateMenu] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setanimateMenu(true);
    } else {
      setanimateMenu(false);
    }
  }, [open]);

  return (
    <div
      onClick={() => setOpen((current) => (current = !current))}
      className="flex flex-col z-[15] w-[60px] h-[50px]  border-red-500 justify-center items-center  group md:hidden"
    >
      {/* <------  MENU CONTAINER --------> */}
      <div
        style={{
          transition: `transform 500ms 150ms ease-in-out`,
        }}
        className={`flex items-center justify-center w-full h-full  flex-col gap-y-[10px] ${
          animateMenu && `rotate-[45deg]`
        }`}
      >
        {/* <------ UPPER MENU LINE --------> */}

        <div
          style={{
            transition: `transform 500ms , background 400ms ease-in-out`,
          }}
          className={`w-[90%] origin-center h-[8px]  rounded-full  ${
            animateMenu
              ? `rotate-[90deg] translate-y-[10px] scale-x-[0.7] scale-y-[0.5] bg-gray-900`
              : ScrollPosition
              ? `bg-gray-950`
              : `bg-gray-50`
          } `}
        />

        {/* <------ LOWER MENU LINE --------> */}
        <div
          style={{
            transition: `transform 500ms , background 400ms ease-in-out`,
          }}
          className={`w-[90%] origin-center h-[8px] rounded-full  ${
            animateMenu
              ? `translate-y-[-8px] scale-x-[0.7] scale-y-[0.5] bg-gray-950 `
              : ScrollPosition
              ? `bg-gray-950`
              : `bg-gray-50`
          }
        `}
        />
      </div>
    </div>
  );
}

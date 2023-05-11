import React from "react";
import JollyIcon from "../../public/JOLLY Logo.png";
import { userStateContext } from "../context/userState";

//components
import MenuIcon from "../assets/icons/menuIcon";

export default function Nav({ pageState }) {
  const [open, setOpen] = React.useState(false);
  const { userState } = React.useContext(userStateContext);
  const { admin, loged } = userState;
  const MenuScreen = () => {
    return (
      <div
        style={{
          transition: "all 1500ms ease-in-out",
        }}
        className={` ${
          open
            ? `w-screen h-screen bg-gray-200 absolute top-0 left-0 pointer-events-auto`
            : "opacity-0 pointer-events-none w-[0] h-[0] bg-transparent absolute top-0 left-0"
        }`}
      ></div>
    );
  };
  const menuContent = {
    Lout: [
      { content: "about", to: "", type: "text", lg: false },
      { content: "login", to: "", type: "text", lg: true },
      { content: "sign up", to: "", type: "text", lg: false },
    ],
    Lin: [
      { content: "about", to: "", type: "text", lg: true },
      { content: "about", to: "", type: "img", lg: false },
    ],
  };
  const Icon = () => {
    return (
      <div
        className={`flex gap-x-[7px] items-start justify-center   ml-[15px] `}
      >
        <img src={JollyIcon} className={`aspect-square h-[45px]`} />
        <div className={`flex`}>
          {["o", "l", "l", "y"].map((letter, index) => (
            <p
              key={`LogLettersIndex${index}`}
              className={` max-h-min text-[17px] tracking-[2px] uppercase font-extrabold `}
            >
              {letter}
            </p>
          ))}
        </div>
      </div>
    );
  };
  const Menu = () => {
    const { Lin, Lout } = menuContent;
    return (
      <div
        className={`font-[Poppins] text-gray-200 text-[19px] flex w-[60%] justify-between items-center text-base lg:w-[350px]`}
      >
        {!admin && loged ? (
          <>
            {/* if user logged in */}
            {Lin.map((p, index) => (
              <p
                key={`LogedinMenu${index}`}
                className={`${p.lg ? `hidden md:flex` : `flex md:hidden`}`}
              >
                {p.content}
              </p>
            ))}
          </>
        ) : (
          <>
            {/* if user loged out */}
            {Lout.map((p, index) => (
              <>
                <p key={`menuOptionKeyLogedOut${index}`} className={`md:flex hidden`}>
                  {p.content}
                </p>
              </>
            ))}
            <MenuIcon menuState={{ open, setOpen }} />
          </>
        )}
      </div>
    );
  };
  return (
    <div
      className={`flex items-center justify-between text-white font-[Poppins] text-[25px] m-[20px] p-[10px] w-[95%]  z-[10]`}
    >
      <Icon />
      <Menu />
      {/* the full screen small display menu */}
      <MenuScreen />
    </div>
  );
}

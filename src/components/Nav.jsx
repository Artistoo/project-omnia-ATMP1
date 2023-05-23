import React from "react";
import { userStateContext } from "../context/userState";
import { Link, useNavigate } from "react-router-dom";
//________________________ASSETS________________________
import LogoBlack from "../../public/JollyBlabLogoV2Black.png";
import LogoWhite from "../../public/JollyBlabLogoV2White.png";
import Logo from "../assets/icons/Logo";

//______________________ICONS_________________________
import { IoIosArrowDown } from "react-icons/io";
//components
import MenuIcon from "../assets/icons/menuIcon";
import { CgArrowDown } from "react-icons/cg";
import { TbArrowDownBar } from "react-icons/tb";

export default function Nav({ pageState, scrollPosition }) {
  const navigate = useNavigate();
  // <------------------ STATES ------------------------>
  const [open, setOpen] = React.useState(false);
  const [showTutorial, setshowTutorial] = React.useState(false);

  //<-------------------CONTEXT------------------------->
  const { userState } = React.useContext(userStateContext);
  const { admin, loged } = userState;

  //<------------------PROPERTIES ----------------------->
  const ScrollDown = Math.floor(scrollPosition) > 205 ? true : false;
  //<-------------------COMPONENTS----------------------->
  const MenuOpen = () => {
    return (
      <div
        style={{
          transition: `opacity 1000ms , transform 1000ms ease-in-out`,
        }}
        className={` z-[10]  left-0 top-0  absolute bg-gradient-to-b from-blue-50 to-gray-300 w-screen h-[700px]  flex  overflow-y-hidden ${
          animateMenu ? `scale-[1] opacity-[1]` : `scale-[0] opacity-[0]`
        }`}
      ></div>
    );
  };
  const WhiteBgNavBar = () => {
    return (
      <div
        style={{
          transition: `transform 1000ms ease-in-out`,
        }}
        className={`w-full h-full absolute top-0 bg-purple-100 hover:translate-y-[5px] backdrop-blur-[40px] z-[-1] bg-opacity-[0.6] ${
          ScrollDown ? "translate-y-[0px]" : "translate-y-[-100%]"
        }`}
      />
    );
  };

  const NavContent = {
    notLoged: [
      {
        type: "text",
        content: [
          {
            type: "link",
            text: `more`,
            onClick: {
              to: `/details`,
            },
          },
          {
            type: "show",
            text: `works`,
            onClick: () => {
              setshowTutorial((current) => (current = !current));
            },
          },
          {
            type: "link",
            text: `about us`,
            onClick: {
              to: `/details`,
            },
          },
          {
            type: "link",
            text: `discover`,
            onClick: {
              to: `/details`,
            },
          },
        ],
      },
      {
        type: "btn",
        content: [
          {
            type: "btn",
            text: `sign in `,
            onClick: {
              to: `user/AccountAuth`,
            },
          },
          {
            type: "btn",
            text: `sign up`,
            onClick: {
              to: `user/AccountAuth`,
            },
          },
        ],
      },
    ],
    Loged: {},
  };

  //<--------------- FUNCTIONS------------------>
  const useScrollDirection = () => {
    const [scrollingDown, setScrollingDown] = React.useState(false);

    React.useEffect(() => {
      let previousScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      const handleScroll = () => {
        const currentScrollPosition =
          window.pageYOffset || document.documentElement.scrollTop;
        setScrollingDown(currentScrollPosition > previousScrollPosition);
        previousScrollPosition = currentScrollPosition;
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return scrollingDown;
  };

  return (
    <nav
      style={{
        transition: `height 100ms ease-in-out`,
      }}
      className={`  flex justify-center  items-center flex-col z-[15] navBar mb-[15px] h-[100px]  `}
    >
      {/* <------ WHITE BACKGROUND IN THE NAVBAR -------> */}
      <WhiteBgNavBar />

      <div className={`w-full h-full flex items-center justify-between `}>
        {/* <--------- LOGO ---------> */}
        <Link
          to={"/"}
          className={`lg:w-[10%] w-[140px] h-full  flex items-center justify-center cursor-pointer  `}
        >
          <Logo
            ScrollingDown={useScrollDirection()}
            scale={ScrollDown ? 1.4 : 1.2}
            Menu={true}
            color={
              ScrollDown || open
                ? {
                    main: "black",
                    colors: [`black`, `black`, `black`],
                  }
                : {
                    main: "white",
                    colors: [`white`, `white`, `white`],
                  }
            }
          />
        </Link>

        {/* <---------- NAVIGATION LINKS OR MENU ICON ----------> */}
        <div className={`w-[80%]  h-full   items-center justify-center flex `}>
          {/* <--------- MENU ICON OPEN CLOSE -----------> */}
          <div
            className={`w-full h-full flex justify-end px-[25px] items-center lg:hidden `}
          >
            <MenuIcon
              ScrollPosition={ScrollDown}
              menuState={{ open, setOpen }}
            />
          </div>

          {/* <---------- NAVIGATION LINKS ------------> */}

          {!loged ? (
            <div
              style={{
                fontFamily: `OpenSauceReg`,
                fontWeight: "normal",
              }}
              className={`lg:flex hidden h-full w-full  text-[17px] justify-between ${
                ScrollDown ? `text-gray-900` : `text-gray-100`
              } items-center gap-x-[10px] `}
            >
              {NavContent?.notLoged?.map((link, index) => {
                return (
                  <div
                    key={`NavItem${index}`}
                    className={`flex items-center w-[40%] h-max py-[10px] min-h-[70px]  ${
                      (link?.type === "btn" && `w-[40%] justify-around `) ||
                      "w-[60%] justify-center gap-x-[10%]"
                    }`}
                  >
                    {link.content.map((nav) => (
                      <>
                        {(() => {
                          switch (nav?.type) {
                            /* <----- NAVBAR LINKS------> */
                            case "link":
                              return (
                                <Link
                                  to={nav?.onClick?.to}
                                  className={`flex flex-col overflow-hidden cursor-pointer h-[27px] items-center ${
                                    nav?.type === "link"
                                      ? "justify-end group"
                                      : "justify-center"
                                  }  group`}
                                >
                                  {nav?.type === "link" && (
                                    <p className="group-hover:translate-y-[26px] transition-transform duration-[300ms]">
                                      go
                                      <CgArrowDown
                                        size={25}
                                        fill={"white"}
                                        className={`absolute group-hover:opacity-[1] opacity-0`}
                                      />
                                    </p>
                                  )}
                                  <p
                                    className={`${
                                      nav?.type === "link" &&
                                      "group-hover:translate-y-[-26px] transition-transform duration-[300ms]"
                                    }`}
                                  >
                                    {nav.text}
                                  </p>
                                </Link>
                              );

                            /* <----- NAVBAR TUTORIAL------> */
                            case "show":
                              return (
                                <div
                                  className={`flex items-center justify-center group cursor-pointer`}
                                >
                                  <IoIosArrowDown
                                    style={{
                                      transition: `transform 420ms , opacity 150ms ease-in-out`,
                                    }}
                                    className="absolute 
                                 scale-[1.2] opacity-0 group-hover:opacity-[1] group-hover:translate-y-[18px]  "
                                  />
                                  <p>{nav?.text}</p>
                                </div>
                              );

                            /* <----- NAVBAR BUTTONS------> */
                            case "btn":
                              return (
                                <Link
                                  to={"user/AccountAuth"}
                                  className={`h-[full] w-[170px] backdrop-blur-lg px-[38px] py-[5px] border rounded-full flex items-center cursor-pointer justify-center  ${
                                    ScrollDown
                                      ? " bg-gray-950 bg-opacity-[0.4] text-white hover:bg-opacity-[0.6] "
                                      : "bg-gray-300  bg-opacity-[0.3] hover:bg-opacity-[0.7] hover:text-gray-950"
                                  } `}
                                >
                                  {nav?.text}
                                </Link>
                              );
                          }
                        })()}
                      </>
                    ))}
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
}

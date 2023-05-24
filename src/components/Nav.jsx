import React from "react";
import { userStateContext } from "../context/userState";
import { Link, useNavigate } from "react-router-dom";
//________________________ASSETS________________________
import LogoBlack from "../../public/JollyBlabLogoV2Black.png";
import LogoWhite from "../../public/JollyBlabLogoV2White.png";
import Logo from "../assets/icons/Logo";

//______________________ICONS_________________________
//components
import MenuIcon from "../assets/icons/menuIcon";
import { IoIosArrowDown } from "react-icons/io";
import { CgArrowDown } from "react-icons/cg";
import { TbArrowDownBar } from "react-icons/tb";

export default function Nav({ pageState, scrollPosition }) {
  //<--------VARIABLES ----------->
  const ScrollDown = Math.floor(scrollPosition) > 205 ? true : false;
  const navigate = useNavigate();
  // <------------------ STATES ------------------------>
  const [open, setOpen] = React.useState(false);
  const [showTutorial, setshowTutorial] = React.useState(false);

  //<-------------------CONTEXT------------------------->
  const { userState } = React.useContext(userStateContext);
  const { admin, loged } = userState;

  // <---------- MENU AND NAV BAR CONTENT -------->
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
  const MenuContent = {
    notLoged: [
      [
        {
          title: "Account",
          content: [
            {
              title: "sign in",
              to: `user/AccountAuth`,
            },
            {
              title: "sign up",
              to: `user/AccountAuth`,
            },
          ],
        },
        {
          title: "Works",
          to: "/details",
        },
      ],
      [
        {
          title: `About`,
          to: "/details",
        },
        {
          title: `career`,
          to: "/details",
        },
        {
          title: `contact`,
          to: "/details",
        },
      ],
    ],
    Loged: [],
  };

  //<-----------COMPONENTS--------------->
  const MenuOpen = ({ openBGS }) => {
    return (
      <div
        className={` w-full  max-w-full    flex flex-col items-center justify-center absolute bottom-0 h-[90%] font-[OpenSauce] font-thin text-[21px]  px-[18px]`}
      >
        {/* TWO PARTS */}

        {MenuContent?.notLoged.map((item, index) => (
          <div
            key={`menuOpenSmallDisplayPart${index}`}
            className={`h-[37%] w-full flex items-start  justify-center flex-col pt-[20px]  mb-[12px]`}
          >
            {/* BLAB JOLLY  */}
            {!!index && (
              <div
                className={`text-[40px] font-[OpenSauce] font-semibold text-black   w-full flex items-center justify-center gap-x-[25px] leading-[15px] translate-y-[-25px] mb-[10px] relative  h-[40px] select-none pointer-events-none`}
              >
                <p
                  style={{
                    transition: `all 1500ms ease-in`,
                  }}
                  className={` transition-transform delay-[${index * 500}ms] ${
                    openBGS ? `translate-y-0` : `translate-y-[300%]`
                  }`}
                >
                  JOLLY{" "}
                </p>
                <p
                  className={`${
                    openBGS ? `translate-y-0` : `translate-y-[-300%]`
                  }`}
                >
                  BLOB{" "}
                </p>
              </div>
            )}

            {/* <----  ITEMS ----> */}
            {item.map((link) => (
              <div
                onClick={() => {
                  !link.content && navigate(link?.to);
                  setOpen(false);
                }}
                style={{
                  transition: `transform 250ms , opacity 200ms ease-in-out `,
                }}
                className={`w-full  flex flex-col  items-center  justify-center   px-[5px] py-[5px] ${
                  openBGS
                    ? "translate-y-[0px] opacity-[1]"
                    : "translate-y-[60px] opacity-[0]"
                } ${link?.content && `min-h-[70%]`}`}
              >
                {/*<----------- TEXT AND ICON ---------> */}
                <div
                  className={`self-start flex items-center justify-start overflow-hidden cursor-pointer group w-full  rounded-full leading-[20px] py-[10px]
                    ${link?.content && `translate-y-[-30px] `}`}
                >
                  <p
                    className={`group-hover:translate-x-[40px] transition-transform duration-[200ms]`}
                  >
                    {link.title}
                  </p>
                  {!link?.content && (
                    <>
                      <IoIosArrowDown
                        size={25}
                        className={`absolute right-[40px] rotate-[-90deg] group-hover:translate-x-[80px] transition-transform duration-[200ms]`}
                      />{" "}
                      <IoIosArrowDown
                        size={25}
                        className={`absolute left-[-40px] rotate-[-90deg] group-hover:translate-x-[55px] transition-transform duration-[200ms] group-hover:delay-[200ms] group-hover:text-green-900`}
                      />{" "}
                    </>
                  )}
                </div>

                {/* BUTTONS */}
                {link?.content && (
                  <div
                    className={`flex flex-col gap-y-[10px] items-center justify-end w-[80%] `}
                  >
                    {link?.content.map((btn) => (
                      <div
                        onClick={() => {
                          navigate(btn?.to);
                          setOpen(false);
                        }}
                        style={{
                          transition: `background 200ms , border 300ms ease-in-out`,
                        }}
                        className={`flex items-center justify-center  border border-black py-[6px] rounded-full w-[70%] text-[15px] text-gray-700 hover:bg-black bg-opacity-[0.5] hover:text-gray-200 hover:border-white cursor-pointer`}
                      >
                        {btn.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        <div className="flex items-center justify-center gap-x-[52px]  mt-[10px] font-[brandinkLight] w-[80%] border translate-y-[25px] lowercase">
          {[
            { media: "instagram" },
            { media: "twitter" },
            { media: "github" },
          ].map((med, index) => (
            <span
              className={`w-[17%] border flex items-center justify-center hover:translate-y-[-7px] hover:text-black transition-transform cursor-pointer text-gray-600 text-[15px]`}
              key={`mediaMenuOpen${med.media} `}
            >
              {med.media}
            </span>
          ))}
        </div>
      </div>
    );
  };
  const WhiteBgNavBar = () => {
    const [openBGS, setOpenBGS] = React.useState(false);
    const [smallScreen, setsmallScreen] = React.useState(false);
    React.useEffect(() => {
      if (open) {
        setOpenBGS(true);
        document.body.style.overflow = "hidden";
      } else {
        setOpenBGS(false);
        document.body.style.overflow = "auto";
      }
    }, [open]);
    React.useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 760) {
          setsmallScreen(true);
        } else {
          setsmallScreen(false);
          setOpenBGS(false);
          setOpen(false);
          document.body.style.overflow = "auto";
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <>
        <div
          style={{
            transition: `translate 1000ms ease-in-out`,
          }}
          className={`w-full h-full absolute top-0 bg-purple-100 hover:translate-y-[5px] backdrop-blur-[40px] z-[-1] bg-opacity-[0.6] ${
            ScrollDown ? "translate-y-[0%]" : `translate-y-[-100%]`
          }`}
        />
        <div
          style={{
            transition: `transform 550ms , opacity 200ms ease-in-out`,
          }}
          className={` ${
            openBGS
              ? `translate-y-0 opacity-[1]`
              : `translate-y-[-100%] opacity-[0]`
          } h-[680px] bg-white absolute top-0 w-full right-0 md:hidden bg-gradient-to-br from-blue-50 to-gray-200`}
        >
          {openBGS && <MenuOpen openBGS />}
        </div>
      </>
    );
  };
  const Works = ({ e }) => {
    return (
      <div
        onClick={() => navigate(e.onClick?.to || `user/AccountAuth`)}
        className={` flex cursor-pointer flex-col items-center justify-center group 
        ${
          !e
            ? `font-[openSauce] text-[17px] text-gray-200  ${
                ScrollDown && `text-gray-800`
              }`
            : `translate-y-[-2px]`
        } ${open && `opacity-0 pointer-events-none`}`}
      >
        <p>{e?.text || "works"}</p>
        <IoIosArrowDown
          style={{
            transition: `opacity 150ms , transform 150ms ease-in-out`,
          }}
          className={`absolute opacity-0 group-hover:opacity-[1] group-hover:translate-y-[17px]`}
        />
      </div>
    );
  };

  //<---------- FUNCTIONS-------------->
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
      className={`flex justify-center  items-center flex-col z-[15] navBar mb-[15px] h-[100px] m-auto `}
    >
      {/* <------ WHITE BACKGROUND IN THE NAVBAR -------> */}
      <WhiteBgNavBar />

      <div
        className={`w-full h-full flex items-center justify-between  lg:w-[95%]`}
      >
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

        <div
          className={`md:flex hidden items-center justify-around  text-[17px] w-[75%]  h-full

          ${ScrollDown ? "text-gray-800" : "text-gray-100 "}
          `}
        >
          {/* THE NAV BAR FOR IF THE USER IS NOT LOGED */}
          {!loged &&
            (() => {
              /* <-- COMPONENTS --> */
              const Links = (e, defaultStyle) => (
                <div
                  onClick={() => navigate(e.onClick?.to)}
                  className={`${defaultStyle} h-[30%] overflow-hidden items-center flex justify-start flex-col  px-[10px] group rounded-full`}
                >
                  <p
                    className={`transition-translate duration-[250ms] group-hover:translate-y-[-100%]`}
                  >
                    {e.text}
                  </p>
                  <div
                    className={`group-hover:translate-y-[-100%] flex w-full items-center justify-center relative transition-translate duration-[250ms]`}
                  >
                    <p>GO</p>
                    <CgArrowDown
                      style={{
                        transition: `transform 500ms 100ms ,opacity 400ms ease-in-out  `,
                      }}
                      className="absolute  group-hover:opacity-[1] opacity-0 origin-center  rotate-[-90deg] group-hover:translate-x-[22px]"
                    />
                  </div>
                </div>
              );
              const Show = (e) => <Works e />;
              const BTN = (e) => (
                <div
                  onClick={() => navigate(e.onClick?.to)}
                  style={{
                    transition: `opacity 200ms ,background 250ms , border 500ms ease-in-out `,
                  }}
                  className={`border min-w-[40%] px-[20px] py-[5px] rounded-full flex items-center justify-center backdrop-lg cursor-pointer
                
                ${
                  ScrollDown
                    ? `hover:bg-black hover:text-gray-100 hover:bg-opacity-[0.8] hover:border-white border-black`
                    : `hover:bg-white hover:text-gray-950 hover:bg-opacity-[0.7]`
                }`}
                >
                  <p>{e.text}</p>
                </div>
              );

              /* THE TWO SECTION BUTTONS AND LINKS CONTAINER */

              return NavContent?.notLoged?.map((Nav, index) => {
                return (
                  /* CONTAINER OF EACH NAV SECTION BUTTONS AND LINKS */
                  <div
                    key={`NavSectionN${index}`}
                    style={{
                      fontFamily: `OpenSauce`,
                      fontWeight: `thin`,
                    }}
                    className={`min-w-max flex gap-x-[20px] items-center justify-center h-full  
                    ${
                      Nav.type === "btn"
                        ? "w-[40%] gap-x-[20px]"
                        : "w-[60%] gap-x-[15px]"
                    }`}
                  >
                    {/* THE NAV BAR CONTENT */}
                    {Nav?.content?.map((item) => {
                      return ((
                        defaultStyle = `cursor-pointer 
                        ${
                          ScrollDown
                            ? `hover:text-gray-50`
                            : `hover:text-green-300`
                        }
                        `
                      ) => {
                        switch (item.type) {
                          case "link":
                            return Links(item, defaultStyle);
                          case "show":
                            return Show(item, defaultStyle);
                          case "btn":
                            return BTN(item);
                        }
                      })();
                    })}
                  </div>
                );
              });
            })()}
          {/* THE NAV BAR FOR IF THE USER IS LOGED */}
        </div>

        <div
          className={`md:hidden flex w-[80%]  h-full  items-center justify-between px-[25px] `}
        >
          <div
            className={`w-[70%] flex items-center justify-center scale-[1.1]`}
          >
            <Works />
          </div>

          <div className={` h-full flex items-center justify-end  w-[20%] `}>
            <MenuIcon
              ScrollPosition={ScrollDown}
              menuState={{ open, setOpen }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

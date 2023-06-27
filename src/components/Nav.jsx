import React from "react";
import { userStateContext } from "../context/userState";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { debounce } from "lodash";
import { Slider, Slide } from "infinite-react-carousel";

//________________________ASSETS________________________
import LogoBlack from "../../public/JollyBlabLogoV2Black.png";
import LogoWhite from "../../public/JollyBlabLogoV2White.png";
import Logo from "../assets/icons/Logo";
import AddChannel from "../assets/icons/AddChannel.jsx";
import CommunityArt from "../assets/img/CreateCommunity.png";
import TribeArt from "../assets/img/CreateTribe.png";

// ________________ DATA _________________
import { NavContent, MenuContent, HideAt } from "../../data";

// ________________ COMPONENTS _________________
import MenuIcon from "../assets/icons/menuIcon";
import Search from "./Search";
import Card from "./ChannelCard";

// ________________ ICONS _________________

import { IoIosArrowDown } from "react-icons/io";
import {
  CgAdd,
  CgArrowDown,
  CgArrowLeft,
  CgCommunity,
  CgNotifications,
} from "react-icons/cg";
import { RiNotification3Line } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
import {
  BiAddToQueue,
  BiArrowFromLeft,
  BiArrowFromRight,
  BiInfinite,
  BiMenu,
  BiNotification,
  BiSearch,
} from "react-icons/bi";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdNotifications } from "react-icons/md";
import { BsArrowBarRight } from "react-icons/bs";
/* <___________ JSX _________________ */
export default function Nav() {
  /* <- TRACKING SCROLL POSITION -> */
  const [scrollPosition, setScrollPosition] = React.useState(0);

  //<----------------EFFECT HOOK --------------------->
  React.useEffect(() => {
    const handleScrolling = debounce(() => {
      setScrollPosition(window.scrollY);
    }, 200);

    window.addEventListener("scroll", handleScrolling);
    return () => {
      removeEventListener("scroll", handleScrolling);
    };
  }, []);
  //<--------VARIABLES ----------->
  const ScrollDown = React.useMemo(
    () => (Math.floor(scrollPosition) > 0 ? true : false),
    [scrollPosition]
  );

  const [NavMenu, setNavMenu] = React.useState({
    IndexSelected: 3,
    Render: [
      {
        header: {
          icon: CgNotifications,
          title: null,
          text: "check out your notificaitons",
        },
        content: [],
        style: {
          bg: "yellow",
        },
      },
      {
        header: {
          icon: null,
          title: "Create",
          text: "tell me more",
        },
        content: [
          {
            icon: GrAdd,
            title: "tribe",
            HandleClick: () => "",
            art: TribeArt,

            details: {
              price: 0,
              remining: BiInfinite,
              about: "best for meeting new peoples and getting help ",
            },
          },
          {
            icon: GrAdd,
            title: "Community",
            HandleClick: () => "",
            art: CommunityArt,
            details: {
              price: 5,
              remining: BiInfinite,
              about: "best for contributing in what you value the most  ",
            },
          },
        ],
        style: {
          bg: "green",
        },
      },

      {
        header: {
          icon: null,
          title: `${JSON.parse(localStorage?.user)?.userName} ${
            JSON.parse(localStorage?.user)?.LastName
          }`,
          text: "",
        },
        content: [
          {
            icon: CgArrowLeft,
            title: "profile",
            HandleClick: () => navigate(`/Profile`),
          },
          {
            icon: CgArrowLeft,
            title: "settings",
            HandleClick: () => navigate(`/Settings`),
          },
          {
            icon: CgArrowLeft,
            title: "Channels",
            HandleClick: () => navigate(`/Channels`),
          },
        ],
        style: {
          bg: "blue",
        },
      },
    ],
  });

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

      const scrollListener = () => handleScroll();

      window.addEventListener("scroll", scrollListener);

      return () => {
        window.removeEventListener("scroll", scrollListener);
      };
    }, []);

    return scrollingDown;
  };
  /* <----------- REACT ROUTER -------> */
  const location = useLocation();
  const navigate = useNavigate();

  // <------------------ STATES ------------------------>
  const [open, setOpen] = React.useState(true);

  //<-------------------CONTEXT------------------------->
  const { userState } = React.useContext(userStateContext);
  const { admin, loged } = userState;

  //<-----------COMPONENTS--------------->
  const MenuOpen = ({ openBGS }) => {
    return (
      <div
        className={` absolute  bottom-0    flex h-[90%] w-full max-w-full flex-col items-center justify-center px-[18px] font-[OpenSauce] text-[21px]  font-thin`}
      >
        {/* TWO PARTS */}
        {!loged &&
          MenuContent?.notLoged.map((item, index) => (
            <div
              key={`menuOpenSmallDisplayPart${index}`}
              className={`mb-[12px] flex h-[37%] w-full  flex-col items-start justify-center  pt-[20px]`}
            >
              {/* BLAB JOLLY  */}
              {!!index && (
                <div
                  className={`pointer-events-none relative mb-[10px] flex   h-[40px] w-full translate-y-[-25px] select-none items-center justify-center gap-x-[25px] font-[OpenSauce] text-[40px]  font-semibold leading-[15px] text-black`}
                >
                  <p
                    style={{
                      transition: `all 1500ms ease-in`,
                    }}
                    className={` transition-transform delay-[${
                      index * 500
                    }ms] ${openBGS ? `translate-y-0` : `translate-y-[300%]`}`}
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
                  className={`flex  w-full flex-col  items-center  justify-center   px-[5px] py-[5px] ${
                    openBGS
                      ? "translate-y-[0px] opacity-[1]"
                      : "translate-y-[60px] opacity-[0]"
                  } ${link?.content && `min-h-[70%]`}`}
                >
                  {/*<----------- TEXT AND ICON ---------> */}
                  <div
                    className={`group flex w-full cursor-pointer items-center justify-start self-start overflow-hidden  rounded-full py-[10px] leading-[20px]
                    ${link?.content && `translate-y-[-30px] `}`}
                  >
                    <p
                      className={`transition-transform duration-[200ms] group-hover:translate-x-[40px]`}
                    >
                      {link.title}
                    </p>
                    {!link?.content && (
                      <>
                        <IoIosArrowDown
                          size={25}
                          className={`absolute right-[40px] rotate-[-90deg] transition-transform duration-[200ms] group-hover:translate-x-[80px]`}
                        />{" "}
                        <IoIosArrowDown
                          size={25}
                          className={`absolute left-[-40px] rotate-[-90deg] transition-transform duration-[200ms] group-hover:translate-x-[55px] group-hover:text-green-900 group-hover:delay-[200ms]`}
                        />{" "}
                      </>
                    )}
                  </div>

                  {/* BUTTONS */}
                  {link?.content && (
                    <div
                      className={`flex w-[80%] flex-col items-center justify-end gap-y-[10px] `}
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
                          className={`flex w-[70%] cursor-pointer  items-center justify-center rounded-full border border-black bg-opacity-[0.5] py-[6px] text-[15px] text-gray-700 hover:border-white hover:bg-black hover:text-gray-200`}
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
        {!loged && (
          <>
            {/* THE SOCIAL MEDIA AND CONTACT LINKS */}
            <div className="mt-[10px] flex w-[80%] translate-y-[25px]  items-center justify-center gap-x-[52px] border font-[brandinkLight] lowercase">
              {[
                { media: "instagram" },
                { media: "twitter" },
                { media: "github" },
              ].map((med, index) => (
                <span
                  className={`flex w-[17%] cursor-pointer items-center justify-center border text-[15px] text-gray-600 transition-transform hover:translate-y-[-7px] hover:text-black`}
                  key={`mediaMenuOpen${med.media} `}
                >
                  {med.media}
                </span>
              ))}
            </div>
          </>
        )}

        {loged &&
          (() => {
            const { IndexSelected } = NavMenu;
            const RenderLen = NavMenu.Render.length;
            const [AddingMenuOpen, setAddingMenuOpen] = React.useState(0);

            return (
              <div
                className={`relative flex h-[80%] w-full items-center  overflow-hidden `}
              >
                <div
                  style={{
                    transition: `transform 1500ms ease `,
                    translate: `-${(100 / RenderLen) * (IndexSelected - 1)}% 0`,
                  }}
                  className={`absolute top-0 flex h-full  w-[300%] `}
                >
                  {NavMenu.Render.map((item, index) => {
                    return (
                      /* SECTION */
                      <div
                        key={JSON.stringify(item.content)}
                        style={{
                          width: 100 / NavMenu.Render.length + "%",
                        }}
                        className={` h-full border border-red-300`}
                      >
                        {/* HEADER */}
                        <div
                          className={`flex h-[20%] w-full items-center justify-around gap-x-[15px] border`}
                        >
                          <div
                            className={`flex h-full   w-max items-center  border`}
                          >
                            {item?.header?.icon && (
                              <item.header.icon size={25} />
                            )}
                            {item?.header?.title && (
                              <h2
                                className={`font-[openSauce] text-[40px] text-gray-900  `}
                              >
                                {item?.header?.title}
                              </h2>
                            )}
                          </div>

                          {item?.header?.text && (
                            <p
                              className={`font-[brandinkLight] text-[15px] font-semibold tracking-wide text-blue-500 ${
                                index === 1
                                  ? "pointer-events-none opacity-0"
                                  : ""
                              }`}
                            >
                              {item?.header?.text}
                            </p>
                          )}
                        </div>

                        {/* CONTENT */}
                        <div className={`flex h-[80%] w-full flex-col `}>
                          {(() => {
                            switch (index) {
                              case 0:
                                return;
                              case 1:
                                return (
                                  <div
                                    className={`flex h-full w-full flex-col items-center justify-center gap-y-[5px]`}
                                  >
                                    {item.content.map((opt, i) => {
                                      return (
                                        <Card
                                          AddingCard={{
                                            AddingMenuOpen,
                                            setAddingMenuOpen,
                                          }}
                                          NavBar={true}
                                          Menu={NavMenu}
                                          data={opt}
                                          index={i}
                                        />
                                      );
                                    })}
                                  </div>
                                );
                              case 2:
                                return (
                                  <div
                                    className={` mt-[15px] flex h-[50%] w-full flex-col   items-center justify-center`}
                                  >
                                    {item.content.map((link, index) => {
                                      return (
                                        <div
                                          onClick={() => {
                                            link?.HandleClick;
                                            /* TODO:remove it and make sure the open menu is set to false on every page load */
                                            setOpen(false);
                                          }}
                                          style={{
                                            height: 100 / 3 + "%",
                                          }}
                                          className={`group flex w-full cursor-pointer items-center justify-start border px-[15px] font-[OpenSauceReg] text-[20px]`}
                                        >
                                          <CgArrowLeft
                                            style={{
                                              transition: `transform 150ms , opacity 250ms ease `,
                                            }}
                                            className={`absolute translate-x-[20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100`}
                                          />
                                          <p
                                            style={{
                                              transition: `transform 150ms , opacity 250ms ease `,
                                            }}
                                            className={`group-hover:translate-x-[30px]`}
                                          >
                                            {link.title}
                                          </p>
                                        </div>
                                      );
                                    })}
                                    <button
                                      className={`absolute bottom-[15px] m-auto w-[500px] rounded-md  border bg-black py-[10px] text-[18px] text-white hover:border-red-500 hover:bg-transparent hover:text-black`}
                                    >
                                      log out
                                      {/* TODO:make sure the user want to logout before logging him out */}
                                      <div></div>
                                    </button>
                                  </div>
                                );
                            }
                          })()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
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
          className={`absolute top-0 z-[-1] h-full w-full bg-purple-100 bg-opacity-[0.6] backdrop-blur-[40px]  ${
            ScrollDown ? "translate-y-[0%]" : `translate-y-[-100%]`
          }`}
        />
        {openBGS && (
          <div
            style={{
              transition: `transform 550ms , opacity 200ms ease-in-out`,
            }}
            className={` ${
              openBGS
                ? `translate-y-0 opacity-[1]`
                : `translate-y-[-100%] opacity-[0]`
            } absolute right-0 top-0 h-[680px] w-full bg-white bg-gradient-to-br from-blue-50 to-gray-200 md:hidden`}
          >
            <MenuOpen openBGS />
          </div>
        )}
      </>
    );
  };
  const Works = ({ e }) => {
    return (
      <div
        onClick={() => navigate(e.onClick?.to || `user/AccountAuth`)}
        className={` group flex cursor-pointer flex-col items-center justify-center 
        ${
          !e
            ? `font-[openSauce] text-[17px] text-gray-200  ${
                ScrollDown && `text-gray-800`
              }`
            : `translate-y-[-2px]`
        } ${open && `pointer-events-none opacity-0`}`}
      >
        <p>{e?.text || "works"}</p>
        <IoIosArrowDown
          style={{
            transition: `opacity 150ms , transform 150ms ease-in-out`,
          }}
          className={`absolute opacity-0 group-hover:translate-y-[17px] group-hover:opacity-[1]`}
        />
      </div>
    );
  };

  /* LOGED */
  const UserProfile = ({ Avatar, Menu, menuState }) => {
    const { NavMenu, setNavMenu } = Menu;
    const { open, setOpen } = menuState;
    return (
      /* TODO: match the menu bg color with the user avatar */
      <div
        onClick={() => {
          if (window.innerWidth < 768) {
            setOpen((c) => (c = NavMenu.IndexSelected === 3 ? false : true));
            setNavMenu((c) => ({
              ...c,
              IndexSelected: NavMenu.IndexSelected === 3 ? false : 3,
            }));
          } else {
            setNavMenu((c) => ({
              ...c,
              IndexSelected: NavMenu.IndexSelected === 3 ? false : 3,
            }));
          }
        }}
        className={`group flex h-full w-full  items-center justify-center overflow-hidden  p-[15px]`}
      >
        <img
          src={Avatar}
          className={`h-auto max-h-full w-auto scale-[1.3] cursor-pointer rounded-full border group-hover:opacity-60 `}
        />
      </div>
    );
  };

  /* IF NO NAV BAR DISPLAY  */
  if (HideAt.Nav.some((x) => x === location.pathname)) {
    return (
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
    );
  }

  /* IF NAV BAR DISPLAY  */
  return (
    <nav
      style={{
        transition: `height 100ms ease-in-out`,
        width: "100vw",
      }}
      className={`navBar z-[15]    mb-[15px] flex h-[100px] flex-col items-center justify-between    border ${
        HideAt.Nav.some((x) => x === location.pathname)
          ? `pointer-events-none opacity-0`
          : `pointer-events-auto opacity-[1]`
      }`}
    >
      {/* <------ WHITE BACKGROUND IN THE NAVBAR -------> */}
      <WhiteBgNavBar />

      <div
        className={`flex h-full w-full items-center justify-between  px-[15px] lg:w-[95%]`}
      >
        {/* <--------- LOGO ---------> */}
        <Link
          to={"/"}
          className={`flex h-full w-[140px]  cursor-pointer items-center justify-center lg:w-[10%]  `}
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

        {/* LOGEDOUT USER NAVBAR */}
        {!loged && (
          <>
            <div
              className={`hidden h-full w-[75%] items-center  justify-around text-[17px]  md:flex
              ${ScrollDown ? "text-gray-800" : "text-gray-100 "}
          `}
            >
              {/* THE NAV BAR FOR IF THE USER IS NOT LOGED */}
              {(() => {
                /* <-- COMPONENTS --> */
                const Links = (e, defaultStyle) => (
                  <div
                    onClick={() => navigate(e.onClick?.to)}
                    className={`${defaultStyle} group flex h-[30%] flex-col items-center justify-start  overflow-hidden rounded-full px-[10px]`}
                  >
                    <p
                      className={`transition-translate duration-[250ms] group-hover:translate-y-[-100%]`}
                    >
                      {e.text}
                    </p>
                    <div
                      className={`transition-translate relative flex w-full items-center justify-center duration-[250ms] group-hover:translate-y-[-100%]`}
                    >
                      <p>GO</p>
                      <CgArrowDown
                        style={{
                          transition: `transform 500ms 100ms ,opacity 400ms ease-in-out  `,
                        }}
                        className="absolute  origin-center rotate-[-90deg] opacity-0  group-hover:translate-x-[22px] group-hover:opacity-[1]"
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
                    className={`backdrop-lg flex min-w-[40%] cursor-pointer items-center justify-center rounded-full border px-[20px] py-[5px]
                
                ${
                  ScrollDown
                    ? `border-black hover:border-white hover:bg-black hover:bg-opacity-[0.8] hover:text-gray-100`
                    : `hover:bg-white hover:bg-opacity-[0.7] hover:text-gray-950`
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
                      className={`flex h-full min-w-max items-center justify-center gap-x-[20px]  
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
              className={`flex h-full w-[80%]  items-center  justify-between px-[25px] md:hidden `}
            >
              <div
                className={`flex w-[70%] scale-[1.1] items-center justify-center`}
              >
                <Works />
              </div>

              <div
                className={` flex h-full w-[20%] items-center  justify-end `}
              >
                <MenuIcon
                  ScrollPosition={ScrollDown}
                  menuState={{ open, setOpen }}
                />
              </div>
            </div>
          </>
        )}

        {/* <---------------------- LOGEDIN USER NAVBAR ----------------------> */}
        {loged &&
          (() => {
            const {
              userName,
              LastName,
              DisplayName,
              Email,
              gender,
              Avatar,
              Location,
              admin,
            } = JSON.parse(localStorage?.user);

            const [isSearching, setIsSearching] = React.useState(false);

            React.useEffect(() => {
              if (open) setIsSearching(false);
            }, [open]);

            /* Closing the Menu on Outside click */

            //<----VARIABLES----->
            const MenuTransitionInMS = "350ms";
            return (
              <div
                className={`relative flex h-[85%] w-[400px] items-center justify-end border   md:w-[570px] md:justify-around lg:w-[60%] `}
              >
                {/* _____SEARCH_____ */}
                <div
                  style={{
                    transition: `width 300ms , transform 150ms ease `,
                  }}
                  className={` relative flex h-full  max-w-[600px]  origin-right items-center  justify-center border border-pink-800 md:w-[60%] md:translate-x-0  lg:w-[60%] 
                  ${isSearching ? `w-[66%] ` : `w-[33%] `} 
                  ${open ? `hidden` : `flex`}
                  
                  `}
                >
                  <Search
                    SearchingState={{ isSearching, setIsSearching }}
                    isScrollDown={ScrollDown}
                  />
                </div>

                {/* ____NOTIFICATION ADD CHANNEL BUTTON____ */}
                <div
                  style={{
                    transition: `width 250ms ease `,
                  }}
                  className={`relative flex h-full  max-w-[200px] items-center justify-around border  md:pointer-events-auto md:relative md:w-[20%] md:translate-x-0 md:opacity-[1] 
                  ${
                    isSearching ? ` w-[0%] opacity-0` : " w-[33%] opacity-[1]"
                  }`}
                >
                  {/* THE BLACK GRADIENT COVER IN SMALl SCREEN */}
                  <div
                    style={{
                      transition: `scale 2500ms 2000ms ease`,
                    }}
                    className={`absolute left-0 z-[11] h-full w-full border bg-gradient-to-r from-black to-transparent md:hidden ${
                      isSearching
                        ? `pointer-events-auto scale-x-[1]`
                        : `pointer-events-none scale-x-0`
                    }`}
                  />
                  <div
                    className={`absolute flex h-full w-full items-center justify-around `}
                  >
                    {[{ icon: RiNotification3Line }, { icon: AddChannel }].map(
                      (Icon, index) => (
                        <div
                          onClick={() => {
                            if (window.innerWidth < 768) {
                              setOpen(
                                (c) =>
                                  (c =
                                    NavMenu.IndexSelected === index + 1
                                      ? false
                                      : true)
                              );
                            }
                            setNavMenu((c) => ({
                              ...c,
                              IndexSelected:
                                NavMenu.IndexSelected === index + 1
                                  ? false
                                  : index + 1,
                            }));
                          }}
                          key={`NavIcons${index}`}
                          className={`group flex w-[45%]  cursor-pointer items-center  justify-center`}
                        >
                          <Icon.icon
                            className={`z-10 h-[25px] w-auto ${
                              open ? `text-gray-900` : `text-white`
                            }`}
                            Color={open ? `black` : "white"}
                            ScrollingDown={ScrollDown}
                            Menu={{ NavMenu, setNavMenu }}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/*  ____USER PROFILE____  */}
                <div className={`z-10 h-full w-[33%] md:w-[15%]`}>
                  <UserProfile
                    Avatar={Avatar}
                    Menu={{ NavMenu, setNavMenu }}
                    menuState={{ open, setOpen }}
                  />
                </div>

                {/*<------- MENU -------> */}
                {NavMenu.IndexSelected && (
                  <div
                    style={{
                      right: `${30 - (NavMenu.IndexSelected - 1) * 15}%`,
                      transition: `right ${MenuTransitionInMS} ease `,
                    }}
                    className={`absolute right-0 top-full hidden h-max  max-h-[365px] min-h-[180px] w-[300px] translate-y-[5px] items-center overflow-hidden overflow-x-hidden  rounded-md  bg-opacity-[0.8]  bg-gradient-to-tl from-gray-300 to-slate-100 backdrop-blur-lg md:flex`}
                  >
                    {/* THE THREE ITEMS CONTAINER  */}
                    <div
                      style={{
                        translate: `-${
                          (NavMenu.IndexSelected - 1) *
                          (100 / NavMenu.Render.length)
                        }% 0`,
                        transition: `translate ${MenuTransitionInMS} ease `,
                      }}
                      className={`absolute flex h-full w-[300%]  `}
                    >
                      {/* THE THREE ITEMS MAPPING */}
                      {NavMenu.Render.map((item, itemIndex) => (
                        <div
                          className={`flex w-1/3 flex-col items-center justify-center px-[12px] bg-${item.style.bg}-200 MenuScrollBar overflow-y-scroll bg-opacity-[0.4]`}
                        >
                          {/* THE HEADER OF EACH MENU ITEM */}
                          <div
                            className={`relative flex h-[30%] w-full items-center justify-between  `}
                          >
                            <div
                              style={{
                                width:
                                  100 /
                                    [...Object.values(item.header)].filter(
                                      Boolean
                                    ).length +
                                  "%",
                                transition: `opacity 150ms , transform 150ms ease-in-out`,
                                transitionDelay: MenuTransitionInMS,
                              }}
                              className={` w-[40%] font-[garet] text-[25px] font-semibold ${
                                NavMenu.IndexSelected - 1 != itemIndex
                                  ? `translate-y-[15px] opacity-0`
                                  : `opacity-1 translate-y-0`
                              } `}
                            >
                              {item.header.title && (
                                <h2>{item.header.title}</h2>
                              )}
                              {item.header.icon && <item.header.icon />}
                            </div>
                            {item.header.text && (
                              <p
                                style={{
                                  width: (!item.header.title ? 100 : 30) + "%",
                                  transition: `opacity 150ms , transform 150ms ease-in-out`,
                                  transitionDelay:
                                    +MenuTransitionInMS.replace("ms", "") +
                                    150 +
                                    "ms",
                                }}
                                className={`font-[OpenSauceReg] text-[12px]  ${
                                  NavMenu.IndexSelected - 1 != itemIndex
                                    ? `translate-y-[15px] opacity-0`
                                    : `opacity-1 translate-y-0`
                                }  `}
                              >
                                {item.header.text}
                              </p>
                            )}
                          </div>

                          <div
                            className={`relative flex h-[70%] w-full flex-col items-center justify-between`}
                          >
                            {item.content.map((opt, optIndex) => (
                              <div
                                style={{
                                  height: 100 / item.content.length - 2 + "%",
                                  transition: `opacity 450ms , transform 350ms ease-in-out`,
                                  transitionDelay: (optIndex + 1) * 200 + "ms",
                                }}
                                className={`group my-[2px] flex w-full cursor-pointer items-center justify-start gap-x-[15px]  overflow-hidden  px-[25px] font-[OpenSauceReg] ${
                                  itemIndex === 1
                                    ? "border border-black "
                                    : optIndex != 2
                                    ? "border-b border-black border-opacity-30"
                                    : ""
                                } ${
                                  NavMenu.IndexSelected - 1 === itemIndex
                                    ? `translate-y-0 opacity-[1] `
                                    : `translate-y-[150px] opacity-0`
                                }`}
                              >
                                {opt?.icon && (
                                  <opt.icon
                                    style={{
                                      transition: `opacity 550ms , transform 150ms ease-in`,
                                    }}
                                    className={`${
                                      itemIndex != 1 &&
                                      "absolute opacity-0 group-hover:translate-x-[-5px] group-hover:opacity-100"
                                    } `}
                                  />
                                )}
                                <p
                                  style={{
                                    transition: ` transform 150ms ease-in`,
                                  }}
                                  className={` w-[50%]  ${
                                    itemIndex != 1
                                      ? " group-hover:translate-x-[18px]"
                                      : `group-hover:translate-x-full group-hover:scale-[0.8] group-hover:opacity-[0.5]`
                                  }  `}
                                >
                                  {opt?.title}
                                </p>

                                {/* PRICES LABEL */}
                                {itemIndex === 1 && (
                                  <div
                                    style={{
                                      transition: `transform 250ms ease `,
                                    }}
                                    className={`absolute right-0 flex h-full w-[60%]  translate-x-full items-center justify-around bg-blue-300 group-hover:translate-x-0 `}
                                  >
                                    <h2 className="flex w-[35%] items-center justify-center text-[2.2rem] font-semibold text-gray-700">
                                      {opt?.details?.price}
                                      <b className="scale-[0.5]">$</b>
                                    </h2>
                                    <div className="h-[65%] w-[1px] bg-gray-800 opacity-[0.3]" />
                                    <div className="flex w-[50%] flex-col items-center justify-center ">
                                      <p
                                        className={`text-[10px] leading-none  `}
                                      >
                                        {opt?.details?.about}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
      </div>
    </nav>
  );
}

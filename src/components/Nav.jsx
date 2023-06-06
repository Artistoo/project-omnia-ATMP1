import React from "react";
import { userStateContext } from "../context/userState";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
//________________________ASSETS________________________
import LogoBlack from "../../public/JollyBlabLogoV2Black.png";
import LogoWhite from "../../public/JollyBlabLogoV2White.png";
import Logo from "../assets/icons/Logo";

// ________________ DATA _________________
import { NavContent, MenuContent } from "../../data";

//components
import MenuIcon from "../assets/icons/menuIcon";
import { IoIosArrowDown } from "react-icons/io";
import { CgArrowDown } from "react-icons/cg";
import { TbArrowDownBar } from "react-icons/tb";

export default function Nav({ pageState }) {
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

  /* <----------- REACT ROUTER -------> */
  const navigate = useNavigate();
  // <------------------ STATES ------------------------>
  const [open, setOpen] = React.useState(false);
  const [showTutorial, setshowTutorial] = React.useState(false);

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

  return (
    <nav
      style={{
        transition: `height 100ms ease-in-out`,
      }}
      className={`navBar z-[15]  m-auto mb-[15px] flex h-[100px] flex-col items-center justify-center `}
    >
      {/* <------ WHITE BACKGROUND IN THE NAVBAR -------> */}
      <WhiteBgNavBar />

      <div
        className={`flex h-full w-full items-center justify-between  lg:w-[95%]`}
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

        <div
          className={`hidden h-full w-[75%] items-center  justify-around text-[17px]  md:flex

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

          <div className={` flex h-full w-[20%] items-center  justify-end `}>
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

import React from "react";
//ICON
import { GoZap } from "react-icons/go";
import { BsFillBalloonHeartFill } from "react-icons/bs";
import { TbHome2 } from "react-icons/tb";
import MainHomePage from "./HomeSections/Main/MainHomePage";
import {
  useSearchParams,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Logo from "../../assets/icons/Logo.jsx";

export default function HomePage() {
  //SECTIONS DYNAMIC COMPONENTS IMPORT
  const navigate = useNavigate();

  /* THE SECTIONS OBJECT */
  const [sections, setSections] = React.useState({
    secs: [
      {
        sec_name: `Main`,
        path: "/",
        icon: TbHome2,
      },
      {
        sec_name: `forU`,
        path: "/made_for_you",
        icon: GoZap,
      },
      {
        sec_name: `favorite`,
        path: "/favorite",
        icon: BsFillBalloonHeartFill,
      },
    ],
  });

  //HANDLE VIEW TRANISITON OR NAVIGATION FROM ONE SECTION DISPLAY TO ANOTHER
  const handleSectionSelect = (path) => {
    if (document?.startViewTransition) {
      console.log("working");
      document.startViewTransition(() => navigate(path), 5000);
    } else {
      console.log("not_transitioned");
      navigate(path);
    }
  };

  const { pathname } = useLocation();
  const sectionIsSelected = (sect) => sect === pathname;

  //<----THE STICKY NAVIGATOR ICONS CONTAINER ----->
  const Navigator = React.memo(() => {
    return (
      //The navigation Wedget
      <div
        style={{
          transition: `opaicty 250ms ease`,
        }}
        className={` fixed  bottom-0 z-20 m-auto h-[60px] w-screen    self-center border border-white bg-gray-100/90 backdrop-blur-md md:sticky md:h-[65px]  md:w-[220px] md:translate-y-[-20px] md:scale-[.8]  md:rounded-full md:bg-gray-900/30 md:opacity-50 md:backdrop-blur-lg  md:hover:opacity-100`}
      >
        <div
          className={`flex h-full w-full items-center justify-around px-[15px]`}
        >
          {sections.secs.map((icon, icon_index) => (
            <icon.icon
              key={`navigationIcon${icon_index}`}
              onClick={(e) => handleSectionSelect(icon.path)}
              style={{
                transition: `all 250ms ease`,
              }}
              className={`scale-[1.5] cursor-pointer md:scale-[1.9] ${
                sectionIsSelected(icon.path)
                  ? ` scale-[1.2] text-gray-900 md:text-white`
                  : ` text-gray-700 opacity-40 hover:opacity-80 md:text-gray-300`
              }`}
            />
          ))}
        </div>
      </div>
    );
  });

  //__________ THE HOME PAGE SECTION CONTAINER JSX ___________________
  return (
    <>
      {/* The Main Home pain Contaier and Slider  */}
      <div
        style={{ viewTransitionName: `LogedPagesScrollingAnimation` }}
        className={`flex min-h-[600px] w-full translate-y-[-113px] items-center justify-center   overflow-x-hidden border-[12px] border-[orange]`}
      >
        <div
          className={`hideScroller relative flex  w-full   max-w-[1500px] flex-col items-center justify-center overflow-x-hidden overflow-y-scroll text-gray-50`}
        >
          <React.Suspense
            fallback={
              <div
                className={`flex h-screen w-full  items-center justify-center`}
              >
                <Logo />
              </div>
            }
          >
            <Outlet />
          </React.Suspense>
        </div>
      </div>
      {/* THE NAVIGATION BOX IN THE BOTTOM OF THE SCREEN */}
      <Navigator />
    </>
  );
}

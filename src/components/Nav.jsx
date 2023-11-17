import React from "react";
import { useNavigate } from "react-router-dom";

//COMPONENTS
import Logo from "../assets/icons/Logo.jsx";
import Menu from "../assets/icons/menuIcon.jsx";
import { NavData } from "../../data.js";
import { useMediaQuery } from "../hooks/useMediaQuery.jsx";
import { v4 } from "uuid";
import { TbRuler2 } from "react-icons/tb";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { CiSquareRemove } from "react-icons/ci";
import { useScrollingDirection } from "../hooks/useScrollingDirection.jsx";
import { IoMdArrowForward } from "react-icons/io";

const Components = {
  text: ({ eleData, important = false }) => (
    <>
      <IoMdArrowForward
        style={{
          transition: `transform 400ms cubic-bezier(0.32, 1.39, 0.67, 1)`,
        }}
        size={16}
        className={`absolute translate-x-[-15px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 `}
      />
      {React.createElement(
        important ? "b" : "p",
        {
          style: {
            transition: `transform 200ms cubic-bezier(0.32, 1.39, 0.67, 1)`,
          },
          className: `text-[15px]  translate-x-0 group-hover:translate-x-[20px]`,
        },
        eleData?.title
      )}
    </>
  ),

  btn: ({ eleData, index }) => (
    <button
      onMouseOver={(e) =>
        (document.getElementById(
          `navBtnClipPathCircle_${index}`
        ).style.clipPath = `circle(200% at 100% 100%)`)
      }
      onMouseLeave={(e) =>
        (document.getElementById(
          `navBtnClipPathCircle_${index}`
        ).style.clipPath = `circle(0% at 100% 100%)`)
      }
      className={`relative flex w-auto flex-grow items-center justify-center rounded-sm border border-gray-900/50  py-[5.5px] font-[openSauceReg]  hover:text-gray-200`}
    >
      <span
        id={`navBtnClipPathCircle_${index}`}
        style={{
          clipPath: `circle(0% at 100% 100%)`,
          transition: `clip-path 800ms cubic-bezier(0.32, 1.39, 0.67, 1)`,
        }}
        className={`absolute left-0  h-full w-full bg-black `}
      />
      <p className={`z-[1]`}>{eleData?.title}</p>
    </button>
  ),

  icon: ({
    eleData,
    search_state,
    index,
    scrollingDir,
    open_menu,
    onClick = () => null,
  }) => {
    return (
      <div
        onClick={onClick}
        style={{
          transition: `transform 250ms ${
            index * 50
          }ms cubic-bezier(0.25, 0.46, 0.45, 0.94) , 
          opacity 300ms ${index * 50}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        }}
        className={`flex-center  h-full w-[5%] min-w-[60px] cursor-pointer border border-gray-200/30  md:relative md:opacity-100
        ${
          search_state.isSearching
            ? ` translate-y-[180px] opacity-0`
            : !!!Boolean(open_menu.at)
            ? !scrollingDir
              ? `translate-y-0 opacity-100`
              : ` -translate-y-[50%] opacity-0`
            : `translate-y-0 opacity-100`
        }`}
      >
        <eleData.Icon
          style={{
            transition: `transform 250ms cubic-bezier(0.32, 1.39, 0.67, 1) , fill 250ms cubic-bezier(0.32, 1.39, 0.67, 1) , filter 500ms cubic-bezier(0.32, 1.39, 0.67, 1)  `,
          }}
          fill={"white"}
          size={26}
          className={`  ${
            open_menu.at - 1 === index &&
            [
              "fill-yellow-300 drop-shadow-[0px_0px_9px_yellow]",
              "rotate-[45deg]",
            ][open_menu.at - 1]
          } `}
        />
      </div>
    );
  },

  form: ({ eleData, search_state, index, scrollingDir, open_menu }) => (
    <form
      style={{
        transition: `transform  250ms ${index * 50}ms ease`,
      }}
      className={`relative  z-[5] flex h-full w-[100px] min-w-full items-center justify-end border  border-red-200 md:w-[340px] ${
        !!!Boolean(open_menu.at)
          ? scrollingDir
            ? `-translate-y-[50%]`
            : `translate-y-0`
          : `translate-y-0`
      }`}
    >
      <div
        style={{
          transition: `width 200ms ${
            search_state.isSearching ? `250ms` : `0ms`
          } cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        }}
        className={`flex-center absolute left-0 h-full max-w-[330px] border  border-purple-200 md:w-full md:max-w-none 
          ${search_state.isSearching ? `w-[220%]` : `w-full `}`}
      >
        {/* SEARCH NAV INPUT */}
        <input
          style={{
            transition: `opacity 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) , border 100ms  150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
          }}
          placeholder={eleData.placeholder}
          className={`absolute left-0 h-[45px] w-full rounded-sm border bg-gray-900/80 px-[10px] font-[openSauce] text-[14.8px] outline-none backdrop-blur-lg placeholder:text-gray-500  md:left-auto md:w-[95%] md:border-gray-600 md:opacity-100 
            ${
              search_state.isSearching
                ? `border-gray-600 opacity-100`
                : `border-transparent opacity-0`
            }
          `}
        />
        {/* ICONS SEARCH NAV BAR */}
        <div
          className={`flex-center absolute right-0 aspect-square w-[40px] cursor-pointer md:cursor-auto`}
        >
          {[
            { Icon: eleData.Icon, id: "MainNavSearchIcon" },
            { Icon: CiSquareRemove, id: "MainNavCancelSearchIcon" },
          ].map(({ Icon, id }, index) => (
            <Icon
              key={id}
              onClick={() => search_state.setIsSearching(!Boolean(index))}
              style={{
                transition: `transform 200ms 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) , color 250ms ease`,
              }}
              size={23}
              className={`absolute text-gray-100 md:right-[20px]
              ${
                Boolean(index)
                  ? `hover:text-gray-50 md:scale-0`
                  : `hover:text-gray-50 md:scale-100`
              }
              ${
                search_state.isSearching
                  ? Boolean(index)
                    ? `scale-100`
                    : `scale-0`
                  : Boolean(index)
                  ? `scale-0`
                  : `scale-100`
              }`}
            />
          ))}
        </div>
      </div>
    </form>
  ),

  img: ({ eleData, onClick = () => null, index, open_menu }) => (
    <div
      onClick={onClick}
      className={`flex-center group relative z-[5] h-full w-[8%] min-w-[80px] cursor-pointer border border-gray-200/30`}
    >
      <img
        src={eleData?.img}
        className={` aspect-square w-[65px] rounded-full`}
        alt={`profile avatar z-[5]`}
      />
      {console.log(open_menu.at + 1)}
      <div
        style={{
          transition: `transform 250ms ease`,
        }}
        className={`absolute h-full w-full scale-[.8] rounded-full border border-gray-100  opacity-0  ${
          open_menu.at + 1 === 4
            ? `scale-[.9] opacity-100`
            : `group-hover:scale-[.9]
          group-hover:opacity-100`
        }`}
      />
    </div>
  ),
};

export default function Nav() {
  //ROUTER DOM
  const navigate = useNavigate();
  const [open_menu, setOpen_menu] = React.useState({ state: false, at: "" });
  const [isSearching, setIsSearching] = React.useState(false);

  /* VARIABLES */
  const user_state = localStorage?.user ? "in" : "out";


  //COSTOM HOOKS
  const [matches] = useMediaQuery();
  const [scrollingDir] = useScrollingDirection();

  //LOGS

  
  //EFFECT
  React.useEffect(() => {
    if (isSearching) {
      setOpen_menu((c) => ({ ...c, at: 0 }));
    }
  }, [isSearching]);

  const dataToComponents = {
    search_state: {
      isSearching,
      setIsSearching,
    },
    scrollingDir,
    open_menu,
  };

  return (
    <nav
      style={{
        transition: `transform 200ms cubic-bezier(0.18, 1.02, 0.49, 1)`,
      }}
      className={`sticky top-0 z-[15] flex h-[85px] w-full items-center justify-between bg-gray-950/90 px-[10px] font-[openSauceReg] text-gray-100 backdrop-blur-md ${
        !!!Boolean(open_menu.at)
          ? !scrollingDir
            ? `translate-y-0`
            : `-translate-y-full`
          : `translate-y-0`
      }`}
    >
      <div
        onClick={() => {
          navigate("/");
        }}
        className={`flex-center h-full w-[15%] cursor-pointer border`}
      >
        <Logo
          Menu={true}
          loading={false}
          scale={1.1}
          ScrollingDown={!scrollingDir}
          color={{ main: "whitesmoke", colors: ["white", "blue", "white"] }}
        />
      </div>

      <div
        className={`relative flex h-full w-[80%] items-center justify-end gap-x-[20px]  overflow-hidden border border-gray-100/30 pr-[25px]  md:justify-between md:gap-1`}
      >
        {NavData[user_state].map((navSection, navSection_index) => {
          return React.createElement(
            "div", //ELEMENT
            {
              className: `flex border border-green-500 justify-center items-center h-full flex-grow gap-x-[5px] relative w-auto `,
            },
            (() => {
              //RETURNING THE MEDI ON SM DISPLAY
              if (
                matches != "lg" &&
                Boolean(navSection_index) &&
                user_state === "out"
              ) {
                return (
                  <Menu
                    open={open_menu}
                    onClick={() => setOpen_menu((c) => !c)}
                  />
                );
              } else {
                return navSection.map((ele, index) => {
                  console.log({ index, type: ele.type });
                  const NavComponent = Components[ele.type];
                  return (
                    <>
                      <NavComponent
                        eleData={ele}
                        {...dataToComponents}
                        index={index}
                        onClick={() => {
                          if (ele?.func === "update") {
                            setOpen_menu((c) => ({
                              ...c,
                              at: c.at === index + 1 ? 0 : index + 1,
                            }));
                          }
                        }}
                      />
                    </>
                  );
                });
              }
            })()
          );
        })}
      </div>

      <div
        style={{
          transition: `opacity 300ms cubic-bezier(0.32, 1.39, 0.67, 1)`,
        }}
        className={`pointer-events-none absolute  left-0 top-full  flex   h-screen w-screen items-start justify-end bg-gray-950/80 text-sm text-gray-900
         ${!Boolean(open_menu.at) ? `opacity-0` : `opacity-100`}`}
      >
        <div
          style={{
            left: `${open_menu.at && 35 + (100 / 3) * (open_menu.at - 1)}px 0 `,
            translate: `${
              open_menu.at && -70 + (100 / 3) * (open_menu.at - 1)
            }% 0 `,
            transition: `all 250ms cubic-bezier(0.32, 1.39, 0.67, 1)`,
          }}
          className={`pointer-events-auto  absolute top-[5px] flex h-[262px] min-h-max w-[250px]  items-center overflow-hidden
          justify-${["start", "center", "end"][open_menu.at - 1]}`}
        >
          <div className={`absolute flex w-[300%] bg-transparent`}>
            {[...NavData[user_state][1].map((sec) => sec.menu)].map(
              ({ title, options }, i) => (
                <div
                  className={`flex   h-[50%]  w-1/3 flex-col items-start justify-start gap-y-[5px] rounded-md
                  ${["bg-zinc-200", "bg-slate-200", `bg-gray-200`][i]}`}
                >
                  <strong
                    className={`h-max w-full bg-gray-300/40 p-[8px_15px] font-[brandinkLight] text-lg `}
                  >
                    {title}
                  </strong>

                  <div
                    className={` my-[5px] flex h-max w-full flex-col  items-start  justify-center gap-y-[10px] border  p-[1px_5px] `}
                  >
                    {options.map((itemSection) => (
                      <div className={`flex w-full flex-col  gap-y-[2px] `}>
                        {itemSection.map((item, itemIndex) => {
                          console.log(item);
                          const ItemComponent = item?.type ? (
                            Components[item.type]
                          ) : (
                            <div></div>
                          );
                          return (
                            <div
                              className={`group relative flex  w-full cursor-pointer items-center justify-start   px-[10px]    
                              ${
                                {
                                  text: "rounded-sm py-[3.5px] hover:bg-gray-300/50",
                                  btn: "",
                                }[item?.type]
                              }`}
                            >
                              <ItemComponent eleData={item} index={itemIndex} />
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

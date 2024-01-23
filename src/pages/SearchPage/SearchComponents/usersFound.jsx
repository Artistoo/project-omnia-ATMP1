import React from "react";

//COMPONENTS
import { Slider } from "infinite-react-carousel/lib/index.js";
import { useNavigate } from "react-router-dom";

//Assets
import noList from "../../../assets/img/No_list_found.png";

//ICONS
import { CgClose } from "react-icons/cg";
import { MdArrowForward } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GiRallyTheTroops } from "react-icons/gi";

export default function usersFound({ searchAPI, param, FilterData }) {
  //Object Destructoring
  const { searchResult, isSearching, searchError } = searchAPI;
  const { FilterQuery } = FilterData;
  //REFS
  const ActionsRef = React.useRef();
  const UsersFoundContainer = React.useRef();

  //States
  const [showUsers, setShowUsers] = React.useState(5);
  const [innerwidth, setInnerwidth] = React.useState(
    Math.floor(window.innerWidth / 150)
  );

  //React Router
  const navigate = useNavigate();

  //VARIABLES
  const accountOwner = (id) => id === JSON.parse(localStorage?.user)?._id;

  const handleResponsiveResizeScale = () => {
    setInnerwidth(Math.floor(UsersFoundContainer.current.offsetWidth / 150));
  };
  React.useEffect(() => {
    window.addEventListener("resize", handleResponsiveResizeScale);
    return () => {
      window.removeEventListener("resize", handleResponsiveResizeScale);
    };
  }, []);

  //components
  /* TODO: add functionality for users you may know and communities you may like late r */
  const NoUserFound = () => {
    return (
      <div
        className={`relative  flex min-h-[250px] w-[90%] flex-wrap items-center justify-center gap-[5px]     font-[brandinkLight] text-gray-900 `}
      >
        <div
          className={`flex h-[180px] w-[60%] min-w-[200px] flex-grow items-center justify-center gap-x-[8px] rounded-md bg-gradient-to-l from-gray-50 to-[#b3b2b2] px-[5px] md:gap-x-[40px] `}
        >
          <div
            className={`flex h-[120px] w-[28%] items-center justify-center  `}
          >
            <img
              src={noList}
              alt={`no data found `}
              className={` aspect-sqaure h-[90px] scale-[2.2] object-contain md:h-[100px] `}
            />
          </div>
          <div
            className={`flex h-full w-[60%] flex-col items-center justify-center gap-y-[6px] md:items-start `}
          >
            <h2 className={`font-[openSauce] text-[1.1rem]  uppercase`}>
              no users found
            </h2>
            <small className={` text-[14px] leading-[14px]`}>
              no users result for {param}
              {Object.values(FilterQuery.Filter)?.length && (
                <span>
                  {" "}
                  try to clear the filter for :
                  {Object.keys(FilterQuery.Filter).map((param) => (
                    <b key={param}>{param} , </b>
                  ))}
                  and try again .
                </span>
              )}
            </small>
          </div>
        </div>

        <div
          className={`flex h-[180px] w-[37%] min-w-[200px] flex-grow  flex-col items-center justify-center  gap-y-[2%] `}
        >
          {[
            {
              text: "users you may know",
              icon: FaUserFriends,
              onClick: () => null,
              style: {
                background: `bg-purple-400`,
              },
            },
            {
              text: "communities you may like",
              icon: GiRallyTheTroops,
              onClick: () => null,
              style: {
                background: ` bg-emerald-400`,
              },
            },
          ].map((mayLike) => (
            <div
              key={mayLike.text}
              style={{
                transition: `outline 50ms 150ms ease , transform 150ms ease `,
              }}
              className={`group/usersUMayKnow flex h-[49%] w-full cursor-pointer items-center justify-around gap-x-[30px] rounded-md  bg-opacity-[0.8] pl-[12px]  hover:scale-[.98]  hover:bg-opacity-[0.8] hover:outline hover:outline-[0.8px] hover:outline-offset-1 hover:outline-white ${mayLike.style.background}`}
            >
              <mayLike.icon
                className={`w-[13%] scale-[2.5] p-[2px] text-white opacity-90`}
              />
              <h3 className={`w-[70%] font-[garet] text-[0.85rem] text-white`}>
                {mayLike.text}
              </h3>
            </div>
          ))}
        </div>
      </div>
    );
  };

  //JSX RETURN
  return (
    <div
      className={`flex   min-h-[300px] w-full flex-col items-center justify-start gap-y-[28px]  text-gray-200  `}
    >
      {/* THE USERS FOUND PAGE HEADER */}
      <div
        className={`flex h-[20%] w-full flex-wrap items-center justify-start gap-x-[15px]`}
      >
        <h2 className={`min-w-max`}>users search result : </h2>
        <small>{searchResult?.users.length} found </small>

        {searchResult?.users && searchResult?.users.length > innerwidth && (
          <small
            className={` group relative flex h-max min-w-max cursor-pointer items-center justify-center text-blue-300`}
          >
            click here to see more
            <MdArrowForward
              style={{
                transition: `transform 250ms   ease , opacity  50ms  ease `,
              }}
              className={`absolute right-[-20px] translate-x-[-15px]  translate-y-[1px] opacity-0 group-hover:translate-x-[0]  group-hover:opacity-100`}
            />
          </small>
        )}
      </div>

      {!searchResult?.users?.length && !isSearching ? (
        <NoUserFound />
      ) : (
        <div
          ref={UsersFoundContainer}
          className={`flex h-[230px] w-full  items-center justify-start gap-x-[15px]   text-gray-200`}
        >
          {/* USERS MAPPING */}
          {new Array(searchResult?.users.length || innerwidth || 5)
            .fill(...(searchResult?.users || new Array(5).fill(null)))
            .slice(0, showUsers)
            .map((user) => {
              return (
                <div
                  style={{
                    transition: `background 250ms ease-in-out`,
                  }}
                  key={user?._id}
                  onClick={() => {
                    if (ActionsRef?.current && ActionsRef.current.open) {
                      ActionsRef.current.close();
                    } else {
                      ActionsRef.current.show();
                    }
                  }}
                  className={`group relative flex h-[85%] w-[150px] cursor-pointer flex-col items-center justify-center rounded-md bg-[#252525] p-[5px] hover:bg-[#1a1a1a]`}
                >
                  {/* DIALOG*/}
                  {/* TODO : the dialog could use some styling */}
                  <dialog
                    ref={ActionsRef}
                    style={{
                      transition: `transform 250 ease-in-out , opacity 250ms ease-in`,
                    }}
                    className={`left-[105%] top-0 z-[1] h-[70px] w-[190px] flex-col items-center justify-center gap-y-[15px] rounded-md bg-white  px-[5px] outline-none backdrop-blur-md  `}
                  >
                    <div
                      className={`relative flex h-full w-full flex-col items-center justify-center `}
                    >
                      <div
                        style={{
                          clipPath: ` polygon(50% 0%, 0% 100%, 100% 100%)`,
                        }}
                        className={`absolute bottom-0 left-0  aspect-square w-[20px] translate-x-[-11px] translate-y-[27px] rotate-[210deg] rounded-md bg-white `}
                      />

                      <div
                        className={`flex h-[75%] w-full flex-col items-center justify-center gap-y-[10px]  `}
                      >
                        {[
                          {
                            title: accountOwner(user?._id)
                              ? `go to my account`
                              : `visit ${user?.userName} account`,
                            onClick: () => {
                              navigate(
                                `/user/${JSON.parse(localStorage?.user)?._id}`
                              );
                            },
                          },
                          {
                            title: !accountOwner(user?._id)
                              ? `donate`
                              : `edit account`,
                            onClick: () => {
                              if (!accountOwner(user?._id)) {
                                /* TODO: add the donate on click functionality */
                                return;
                              }
                              navigate(`/settings`);
                            },
                          },
                        ].map((accountNavOption, accountNavOptionIndex) => (
                          <div
                            onClick={() => accountNavOption.onClick()}
                            key={`AccountAction_${accountNavOptionIndex}`}
                            style={{
                              transition: `transform 250ms ease-in , opacity 150ms ease `,
                              height: 100 / 2 - 4 + "%",
                            }}
                            className={`group/navOpt flex w-[97%] items-center  justify-between px-[10px]  font-[garet] text-sm  hover:text-blue-500   `}
                          >
                            <p>{accountNavOption?.title}</p>
                            <MdArrowForward
                              className={`transition-transform group-hover/navOpt:translate-x-[10px] `}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </dialog>

                  {/* IMG */}
                  <div className={`flex h-[65%] items-center justify-center `}>
                    <div
                      className={`relative flex aspect-square w-[90px] items-center justify-center overflow-hidden  rounded-full `}
                    >
                      {!isSearching ? (
                        user && user?.Avatar && <img src={user.Avatar} />
                      ) : (
                        <div className={`stretch loading-screen`}/>
                      )}
                    </div>
                  </div>

                  {/* THE AVATARS CIRCLE */}
                  <div
                    style={{
                      transition: `transform 250ms cubic-bezier(0.4, 0, 0.2, 1)`,
                    }}
                    className={`absolute aspect-square h-[100px] translate-y-[-32px] scale-[0.9] group-hover:scale-[1] ${
                      user?._id === JSON.parse(localStorage?.user)._id
                        ? `group-hover:border-green-400`
                        : user?.gender?.toLowerCase() === "male"
                        ? `group-hover:border-blue-400`
                        : `group-hover:border-pink-400`
                    } rounded-full border-[0.5px] border-white/50`}
                  />
                  {/* TXT */}
                  <div
                    className={`flex h-[35%] w-full flex-col items-center justify-center`}
                  >
                    <div
                      className={`relative flex  min-h-[25px] w-[90%] items-center justify-center overflow-hidden `}
                    >
                      {!isSearching && user?.userName && user?.LastName ? (
                        <div
                          className={`flex h-full w-full flex-col items-center justify-start  `}
                        >
                          <h2>{`${user?.userName} ${user?.LastName}`}</h2>
                          <small
                            className={`translate-x-[10px] self-start text-gray-400`}
                          >{`${user?.Location}`}</small>
                        </div>
                      ) : (
                        <Skeleton />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

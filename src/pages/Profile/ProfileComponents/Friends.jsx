import React from "react";
import { AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import { BiArrowBack, BiPlus } from "react-icons/bi";
import { MdArrowForward } from "react-icons/md";

export default function Friends() {
  const FriendsList =
    localStorage?.user &&
    Array.isArray(JSON.parse(localStorage?.user)?.Friends) &&
    JSON.parse(localStorage?.user)?.Friends;

  const [popoverContent, setPopoverContent] = React.useState(0);

  return (
    <div
      className={`flex h-[130px] w-[100%] md:flex-row lg:flex-col items-center justify-center gap-y-[12px] rounded-md border p-[6px] md:justify-around flex-col`}
    >
      {/* <--- MODAL ----> */}
      <div
        popover={"manual"}
        id={`FriendsListModal`}
        className={`hideScroller m-auto h-[360px] w-[350px] self-center overflow-hidden overflow-x-hidden overflow-y-scroll rounded-md  bg-gray-50/80 py-[12px] backdrop-blur-sm backdrop:backdrop-brightness-50`}
      >
        {/* HEADER AND BUTTONS */}
        <div
          className={` flex h-[10%] w-full items-center justify-between    px-[15px]`}
        >
          <hr
            className={`absolute h-[1px] w-[80%] translate-x-[15px] translate-y-[25px] bg-black`}
          />
          {/* EXIT MODAL BUTTON */}
          <button
            onClick={() => setPopoverContent(0)}
            popovertarget={"FriendsListModal"}
            popoveraction={"hide"}
            className={` group w-[10%]`}
          >
            <BiArrowBack
              className={`translate-x-[5px] transition-transform duration-[150ms] group-hover:translate-x-[0px]`}
            />
          </button>

          {/* CURRENT CONTENT DISPLAY ICON */}
          <div
            className={`flex  w-[80%] items-center justify-center  self-center`}
          >
            <AiOutlineUser
              style={{
                transition: `transform 250ms , opacity 250ms ease-in-out`,
              }}
              className={`absolute  rounded-full border p-[2.2px] ${
                !popoverContent
                  ? `scale-[2] opacity-100`
                  : `scale-[0] opacity-0`
              }`}
            />
            <AiOutlineTeam
              style={{
                transition: `transform 250ms , opacity 250ms ease-in-out`,
              }}
              className={`absolute  rounded-full border p-[2.2px] ${
                !popoverContent ? `scale-0 opacity-0` : `scale-[2] opacity-100`
              }`}
            />
          </div>

          {/* CHANGE MODAL DISPLAY ICON */}
          <BiArrowBack
            onClick={() => setPopoverContent((c) => (c = !c ? 1 : 0))}
            className={`w-[10%]  translate-x-[5px] cursor-pointer transition-transform duration-[150ms] hover:translate-x-[10px] ${
              popoverContent ? `rotate-0` : `rotate-[180deg]`
            }`}
          />
        </div>

        {/* FRIENDS AND COMMUNITIES */}
        <div
          style={{
            transition: `translate 250ms ease-in-out`,
            translate: `${50 * popoverContent + "%"} 0`,
          }}
          className={`absolute flex h-max  min-h-[80%] w-[200%] items-center  justify-start  `}
        >
          {/* FRIENDS */}
          <div className={`flex w-1/2 items-center justify-center p-[15px]`}>
            {/* IF FRIENDS */}
            {FriendsList ? (
              FriendsList?.map((friend) => <div></div>)
            ) : (
              /* IF NO FRIENDS */
              <div
                className={`group flex h-full w-full flex-col  items-center justify-center gap-y-[20px] rounded-md px-[6px] py-[15px] text-center font-[openSauceReg] text-[13px] text-gray-800   `}
              >
                <p
                  style={{
                    transition: `transform 250ms 250ms , opacity 250ms 250ms ease-in-out`,
                  }}
                  className={`${
                    !popoverContent
                      ? `translate-y-0 opacity-100`
                      : `translate-y-[15px] opacity-0`
                  }`}
                >
                  you currently haven't added any friend , add some friends to
                  be able to see them in here
                </p>
                <BiPlus
                  style={{
                    transition: `transform 250ms 450ms , opacity 250ms 450ms ease-in-out`,
                  }}
                  className={`scale-[1.4] group-hover:scale-[1.5] ${
                    !popoverContent
                      ? `translate-y-0 opacity-100`
                      : `translate-y-[-15px] opacity-0`
                  }`}
                />
              </div>
            )}
          </div>

          {/* COMMUNITIES & TRIBES */}
          <div className={`w-1/2`}></div>
        </div>

        {/* THE GRADIENT CIRCLE IN THE END OF THE DIALOG */}
        <div
          className={`pointer-events-none absolute top-1/2 z-[-1] flex h-1/2 w-full items-start justify-center overflow-hidden`}
        >
          <div
            className={`   h-[450px] w-[450px] translate-y-[15px] scale-x-[1.2] rounded-full bg-gradient-to-t from-purple-400 via-purple-600 to-green-400 opacity-80 blur-lg`}
          />
        </div>
      </div>

      {/* FRIENDS TITLE  */}
      <div 
      className={`self-start font-[garet] text-[1.1rem] text-gray-50 lg:w-full h-[10%] md:w-[40%] flex items-center justify-center lg:flex-row md:flex-col md:h-full md:px-[10px] lg:px-0 lg:justify-around`}>




        <h2 className={`lg:translate-x-[-8px]`}>Friends</h2>
        {!FriendsList?.length && (
          <small
            style={{
              transition: `color 150ms ease`,
            }}
            className={`group relative ml-[3px] w-max cursor-pointer font-[brandinkLight] text-[0.8rem] text-gray-400 hover:text-gray-200 `}
          >
            find new friends
            <MdArrowForward
              style={{
                transition: `transform 150ms ease`,
              }}
              className={`inline translate-x-[5px] group-hover:translate-x-[10px]`}
            />
          </small>
        )}
      </div>

      {/* FRIENDS DISPLAY  */}
      <div
        popovertarget={"FriendsListModal"}
        className={`relative flex h-[60%] md:w-[50%] lg:w-full items-center  justify-center  rounded-md bg-gradient-to-l from-[#1b1b1b] to-[#181717] p-[15px] font-[garet] text-gray-50 w-full`}
      >
        {FriendsList?.length ? (
          /* FRIENDS LIST RENDER */
          FriendsList.map((friend) => <></>)
        ) : (
          /* IF THERES NO FRIENDS */
          <div
            className={`group flex h-[150%] w-full cursor-pointer items-center justify-around rounded-md `}
          >
            <div
              style={{
                transition: `border 150ms ease`,
              }}
              className={` flex aspect-square w-[28px] items-center justify-center rounded-full border group-hover:border-transparent `}
            >
              <button
                popoverTarget={"FriendsListModal"}
                className={`absolute h-full w-full`}
              />
              <BiPlus
                style={{
                  transition: `transform 150ms ease`,
                }}
                className={`pointer-events-none group-hover:scale-[1.1]`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

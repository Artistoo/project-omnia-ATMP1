import React from "react";
//ICONS
import { BiSearch } from "react-icons/bi";
import {
  BsLock,
  BsUnlock,
  BsPlusCircleDotted,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import {
  AiOutlineArrowRight,
  AiOutlineCrown,
  AiOutlineTeam,
} from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import {
  useSearchMemebersMutation,
  useReportChannelMutation,
  useChannelInteractMutation,
  useChannelJoinRequestMutation,
} from "../../../../../redux/API";

import { useInView } from "react-intersection-observer";

import { FaInfo, FaRegClosedCaptioning } from "react-icons/fa";
import { v4 } from "uuid";
import DOMPurify from "dompurify";
import { FiSearch } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import Logo from "../../../../../assets/icons/Logo.jsx";
import { useLongPress } from "../../../../../hooks/useLongPress.jsx";
import { CiLock, CiSquareInfo } from "react-icons/ci";

const OptionsMenuPopover = ({
  categoryIndex,
  channel_index,
  data,
  channelState,
  isMemeber,
  isAdmin,
  target_channel,
  user,
}) => {
  /* TODO: add a report button  */
  /* STATES  */
  const [isSearchingForMemebers, setisSearchingForMemebers] =
    React.useState(false);

  /* HANLDERS  */
  const closeOptionChannelMenuPopover = function () {
    const closeBTN = document.getElementById(
      `channelOptionsMenuPopoverCloseBTN${categoryIndex}${channel_index}`
    );
    if (!closeBTN) return;
    if (document?.startViewTransition) {
      document.startViewTransition(() => {
        closeBTN.click();
      }, 500);
      return;
    }
    closeBTN.click();
  };
  /* API */
  const [
    search_memebers,
    {
      isLoading: isSearching,
      error: searchingError,
      data: searchResult,
      status: searchStatus,
    },
  ] = useSearchMemebersMutation();
  const [
    report_channel,
    {
      isLoading: isReporting,
      error: report_error,
      data: report_response,
      isSuccess: Reported,
    },
  ] = useReportChannelMutation();

  const defaultStylingChannelMenu = `bg-gray-100/80 rounded-md h-[70px] w-full `;

  return (
    <div
      onScroll={(e) => e.preventDefault()}
      popover={"auto"}
      id={`channelOptionsMenuPopover${categoryIndex}${channel_index}`}
      className={`m-auto  h-[340px] w-[420px]  self-center rounded-md backdrop:bg-black/40 `}
    >
      <div
        className={`hideScroller bg-gray- absolute flex h-full w-full flex-col items-center justify-start gap-y-[12px] overflow-y-scroll bg-gray-50 p-[11px] `}
      >
        {/* MENU POPOVER HEADER SECTION , NAME + CANCEL */}
        <div
          className={`sticky top-0 flex w-full  items-center justify-center py-[20px]`}
        >
          {/* CLOSE POPOVER */}
          <div
            onClick={closeOptionChannelMenuPopover}
            className={`flex aspect-square w-[30px] cursor-pointer items-center justify-center rounded-full bg-gray-200/70 hover:scale-[1.05] hover:bg-gray-200/90`}
          >
            <AiOutlineArrowRight
              size={16}
              className={`rotate-[180deg] text-black`}
            />
          </div>
          <div
            className={`self-ceter m-auto flex w-[70%] items-center  justify-center rounded-md  font-[garet] text-[32px]`}
          >
            <h2>{target_channel?.Name}</h2>
          </div>
        </div>

        {/* SEARCH FEILD */}
        {isMemeber ||
          (isAdmin.some(Boolean) && (
            <div
              className={`relative flex flex-col items-center justify-center
              ${defaultStylingChannelMenu}`}
            >
              {/* Search Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(e.target?.search_channel_members?.value);
                  search_memebers({
                    search_param: DOMPurify.sanitize(
                      e.target?.search_channel_members?.value
                    ),
                    channel_id: target_channel?._id,
                  });
                }}
                className={`flex h-[35px] w-full items-center justify-center`}
              >
                <input
                  name={`search_channel_members`}
                  onBlur={() => {
                    setisSearchingForMemebers(false);
                    const membersPopover = document.getElementById(
                      `memberFoundPopover_${categoryIndex}_${channel_index}`
                    );
                    membersPopover?.hidePopover();
                  }}
                  onInput={({ target }) => {
                    const membersPopover = document.getElementById(
                      `memberFoundPopover_${categoryIndex}_${channel_index}`
                    );
                    if (!Boolean(target.value)) {
                      return;
                    }
                    membersPopover.showPopover();
                    setisSearchingForMemebers(true);
                    search_memebers({
                      search_param: DOMPurify.sanitize(target.value),
                      channel_id: target_channel?._id,
                    });
                  }}
                  placeholder="search memebers"
                  className={`bg-graident-to-tl h-full w-[87%] rounded-full border border-black from-gray-50 to-gray-200/50 px-[9px] py-[5px] font-[openSauceReg] text-sm  outline-none outline outline-[1px] transition-[outline_border] placeholder:text-gray-500 placeholder:opacity-80 focus:outline-offset-1 focus:outline-black/20 `}
                />
                <FiSearch
                  className={`absolute right-[50px] text-gray-700`}
                  size={17}
                />
              </form>
              {/* DISPLAYLING RESULT POPOVER */}
              <div
                popover={"manual"}
                id={`memberFoundPopover_${categoryIndex}_${channel_index}`}
                className={` top-[33%] m-auto h-[200px] w-[360px]  overflow-hidden  rounded-md bg-white transition-[backdrop] backdrop:bg-black/20`}
              >
                <div
                  className={`hideScroller relative top-0  flex h-full w-full   flex-col items-center justify-center gap-[5px] overflow-hidden overflow-y-scroll rounded-md bg-gray-100/80 p-[15px]  transition-opacity duration-[500ms] ${
                    isSearchingForMemebers
                      ? `pointer-events-auto opacity-100`
                      : `pointer-events-none bg-transparent opacity-0`
                  }`}
                >
                  {/* SEARCH RESULT TEXT */}
                  <div
                    className={`items-centr flex w-full justify-start py-[8px] text-[14px] `}
                  >
                    {isSearching &&
                      Array.isArray(searchResult) &&
                      `Search Result ${searchResult?.length}`}
                  </div>

                  {/* TODO : create the user found boxs in search tables */}
                  {(isSearchingForMemebers && isSearching) || searchResult ? (
                    [...(isSearching ? Array(3).fill("") : searchResult)].map(
                      (member) => (
                        <div
                          className={`h-[73px] w-[100%] rounded-md ${
                            member ? `` : `bg-gray-300/90`
                          } `}
                        ></div>
                      )
                    )
                  ) : (
                    <div
                      className={` m-auto flex h-[80%] w-full items-center justify-center gap-x-[10px] self-center`}
                    >
                      <small
                        className={`h-max max-w-[200px] leading-3 [text-wrap:balance]`}
                      >
                        {!searchingError
                          ? searchResult === null
                            ? `no member have yet joined this channel 
                        ${
                          channelState && !isMemeber
                            ? `be the first to join`
                            : `requiest join`
                        }`
                            : `no memeber found with that search param`
                          : `an error occured while searching for memebers`}
                      </small>
                      <span
                        className={`flex  w-max items-center justify-center p-[5px] `}
                      >
                        <FaInfo className={`text-red-400`} size={35} />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        {/* TODO : make it so that this option appears only when hes not the admin */}
        {isAdmin && (
          <>
            {/* REPORT */}
            <div
              onClick={(e) => {
                const reason_popover = document.getElementById(
                  `channelMenuReportDialog_${categoryIndex}_${channel_index}`
                );
                if (!reason_popover) return;
                reason_popover.showPopover();
              }}
              className={`  tranisiton-[border] relative flex cursor-pointer items-center justify-between border border-transparent p-[15px] transition-[background] duration-[500ms] hover:border-orange-400  ${defaultStylingChannelMenu} `}
            >
              <h2 className={` font-[openSauceReg] text-[16px] text-gray-800`}>
                Report channel
              </h2>
              <span
                className={` flex h-full w-[35%] items-center justify-center font-[openSauceReg] text-orange-400`}
              >
                <small> select a reason</small>
              </span>
            </div>

            {/* THE REPORT POPOVER  */}
            <div
              popover={"auto"}
              id={`channelMenuReportDialog_${categoryIndex}_${channel_index}`}
              className={`  top-[55%] m-auto h-[190px] w-[400px]  overflow-hidden rounded-md bg-white transition-[backdrop] backdrop:bg-red-200/50`}
            >
              {/* THE REPORT POPOVER CONTENT CONTAINER  */}
              <div
                className={`  flex h-full w-full flex-col items-start   justify-start gap-y-[8px] overflow-y-hidden`}
              >
                {/* THE CONTAINER OF THE REPORT REASONS & THANK YOU FOR REPORTING WINODW */}
                <div
                  className={`absolute flex h-[200%] w-full flex-col items-center justify-center overflow-y-hidden`}
                >
                  {/* REASONS LIST TO REPORT */}

                  <div
                    style={{
                      transition: `transform 250ms 250ms ease`,
                    }}
                    className={`flex  h-1/2 w-full flex-col items-center justify-center ${
                      Reported ? `-translate-y-full` : `translate-y-0`
                    }`}
                  >
                    {[
                      `display of nudity`,
                      `criminal activities`,
                      `scam or fruad`,
                      `illegal activities`,
                    ].map((reason, index) => (
                      <div
                        onClick={(e) => {
                          let done = false;
                          if (!done) {
                            e.target.animate(
                              [
                                {
                                  opacity: `0.5`,
                                },
                                {
                                  opacity: `1`,
                                },
                                {
                                  opacity: `0.5`,
                                },
                              ],
                              {
                                duration: 5000,
                                iteraction: Infinity,
                                fill: "both",
                              }
                            );
                          }
                          report_channel({
                            reason,
                            channel: target_channel?.Name,
                            channel_id: target_channel?._id,
                            reporter: user?.Email,
                          })
                            .then((res) => {
                              if (res.data?.success_report) {
                                const CloseMenuPromise = new Promise(
                                  (resolve, reject) => {
                                    setTimeout(() => {
                                      closeOptionChannelMenuPopover();
                                      resolve();
                                    }, 4000);
                                  }
                                )
                                  .then(() => {
                                    clearTimeout(CloseMenuPromise);
                                  })
                                  .finally(() => (done = false));
                              }
                            })
                            .catch((err) => console.log(err));
                        }}
                        style={{
                          transition: `transform 250ms ease-in-out, opacity 250ms ease-in`,
                          transitionDelay: index * 500 + "ms",
                        }}
                        className={`   flex h-[35px]  w-[95%] cursor-pointer items-center justify-start rounded-md px-[12px] py-[10px] font-[PoppinsReg] text-[14px] text-gray-800 hover:bg-gray-200/80 ${
                          Reported ? ` opacity-0 ` : `opacity-100`
                        }`}
                      >
                        <p className={`pointer-events-none`}>{reason}</p>
                      </div>
                    ))}
                  </div>

                  {/* THANK YOU FOR REPORTING MESSAGE*/}
                  <div
                    style={{
                      transition: `transform 250ms 300ms ease`,
                    }}
                    className={`flex h-1/2 w-full items-center justify-center overflow-hidden p-[8px]
                    ${Reported ? `translate-y-[-100%]` : `translate-y-0`}`}
                  >
                    <small
                      className={`z-[2] w-[75%] font-[garet] [text-wrap:balance]`}
                    >
                      thank you helping us improving our services we will look
                      into your report soon
                    </small>
                    <GoReport
                      size={88}
                      className={`absolute right-[10px] text-orange-300  transition-transform delay-[600ms] ${
                        Reported ? `translate-y-[0]` : `translate-y-full`
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* CLOSE BUTTON */}
      <button
        id={`channelOptionsMenuPopoverCloseBTN${categoryIndex}${channel_index}`}
        popoverTarget={`channelOptionsMenuPopover${categoryIndex}${channel_index}`}
        popoverAction={`hide`}
        className={`hidden w-0`}
      />
    </div>
  );
};

const JoinChannelRespondingWindow = ({
  categoryIndex,
  channel_index,
  data,
  channelState,
  isMemeber,
  isAdmin,
  target_channel,
  user,
  isRequiesting,
  joinRequiestError,
}) => {
  return (
    <div
      id={`RequiestingJoinPopover_${categoryIndex}_${channel_index}`}
      popover={"auto"}
      className={` m-auto min-h-[300px] w-[450px] overflow-hidden bg-transparent  backdrop:bg-black/80`}
    >
      <div
        className={`absolute flex h-full w-full overflow-hidden rounded-md `}
      >
        {isRequiesting ? (
          <div
            className={`absolute flex h-full w-full items-center justify-center`}
          >
            <Logo
              loading={true}
              scale={1.1}
              Menu={false}
              ScrollingDown={false}
            />
          </div>
        ) : joinRequiestError?.data?.unautherized ? (
          <div
            className={`hideScroller relative flex h-full w-full flex-col items-start justify-start gap-y-[10px] overflow-y-scroll bg-transparent  p-[20px] transition-opacity duration-[500ms]`}
          >
            <div
              className={`absolute left-0 top-0 z-[-5] h-full w-full bg-gradient-to-tl from-zinc-300 to-gray-100`}
              id={`JoinChannelRespondingWindowBG`}
            />
            <div className={`mb-[35px] flex w-full items-center `}>
              <span
                className={`flex h-full w-[70%] flex-col items-start justify-center`}
              >
                <h2 className={`font-[Now] text-[25px] uppercase text-black `}>
                  unAutherized
                </h2>
                <p
                  className={` w-[80%] font-[brandinkLight] leading-none [text-wrap:balance]`}
                >
                  you are not a member in {target_channel?.Name}
                </p>
              </span>
              <span className={`flex w-[20%] items-center justify-center `}>
                <CiLock size={30} />
              </span>
            </div>

            <div
              style={{
                transition: `height 250ms ease , background 250ms ease`,
              }}
              onClick={(e) => {
                const JoinChannelRespondingWindowBG = document.getElementById(
                  "JoinChannelRespondingWindowBG"
                );
                if (!JoinChannelRespondingWindowBG) return;
                e.target.classList.toggle("h-[85px]");
                e.target.classList.toggle("bg-gray-100");
                JoinChannelRespondingWindowBG.classList.toggle("opacity-80");
              }}
              className={`relative flex h-[40px]  w-full cursor-pointer flex-col items-start justify-start overflow-hidden rounded-md border border-black  px-[5px]  `}
            >
              <div
                className={`text-md pointer-events-none absolute flex h-[40px] w-full  items-center justify-between pr-[12px] font-[openSauceReg] text-black`}
              >
                <h2>more about {target_channel?.Name}</h2>
                <CiSquareInfo size={22} />
              </div>
              <div
                className={`hideScroller pointer-events-none absolute flex h-[40px] translate-y-[40px] items-start justify-start overflow-y-scroll py-[2px] `}
              >
                <p
                  className={` select-none  font-[openSauceReg] text-[13px] [text-overflow:fade(15px)]`}
                >
                  {target_channel?.Describtion}
                </p>
              </div>
            </div>
            <div
              className={`absolute bottom-0 left-0 flex h-[20%] w-[450px]  px-[20px]`}
            >
              <div
                className={`relative flex h-full w-full items-center justify-between `}
              >
                {[
                  {
                    title: `likes`,
                    data: target_channel?.LikedBy?.length,
                    Icon: BsHeart,
                  },
                  {
                    title: `members`,
                    data: target_channel?.Members?.length,
                    Icon: AiOutlineTeam,
                  },
                  {
                    title: `Admins`,
                    data: data?.Admins?.length,
                    Icon: AiOutlineCrown,
                  },
                ].map(({ title, data, Icon }) => (
                  <div
                    className={`flex h-[30px] w-[130px] max-w-[30%] items-center justify-between gap-x-[9px] rounded-sm border border-gray-800/10 px-[5px] outline outline-[0.5px] outline-offset-1 outline-black/60 `}
                  >
                    <Icon size={15} fill={"black"} />
                    <span
                      className={`flex h-full flex-grow items-center justify-start gap-x-[5px] text-start font-[garet] text-[.9em] text-gray-800`}
                    >
                      <p className={`  text-black`}>{title}</p>
                      <p className={`font-[openSauceReg]  text-gray-800 `}>
                        {data}
                      </p>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={``}>something went wrong please try again later</div>
        )}
      </div>
    </div>
  );
};

/* <================== MAIN CHANNEL BOX ==========================> */
export default function channel_box({
  data,
  isLoading,
  channel_index,
  categoryIndex,
  user,
  styling,
}) {
  /* DESTRUCTERING THE DATA FROM THE API */
  const {
    _id = "",
    Name = "",
    Admin = "",
    Admins = "",
    Members = "",
    Categories = "",
    Type = "",
    Describtion = "",
    Raised = "",
    Cover = "",
    Locked = "",
    Revenue = "",
    Messages = "",
    Date = "",
    LikedBy = [],
  } = React.useMemo(() => {
    if (data) {
      return {
        _id: data?._id || "",
        Name: data.Name || "",
        Admin: data.Admin || "",
        Admins: data.Admins || "",
        Members: data.Members || "",
        Categories: data.Categories || "",
        Type: data.Type || "",
        Describtion: data.Describtion || "",
        Raised: data.Raised || "",
        Cover: data.Cover || "",
        Locked: data.Locked || "",
        Revenue: data.Revenue || "",
        Messages: data.Messages || "",
        Date: data.Date || "",
        LikedBy: data.LikedBy || "",
      };
    }
    return {};
  }, [data]);

  //UseState
  const [channelLiked, setChannelLiked] = React.useState(false);
  const [target_channel, setTarget_channel] = React.useState();
  const { isPressing, startPress, endPress } = useLongPress();
  const [videoLoaded, setVideoLoaded] = React.useState(
    Cover && Cover.includes("mp4") ? false : true
  );

  /* IN VIEW */
  const [channelRef, channelRefInView] = useInView({ threshold: 0.2 });

  /* <---------- API ----------> */
  const [
    join_requiest,
    {
      isLoading: isRequiesting,
      error: joinRequiestError,
      isSuccess: channel_join_responded,
      data: channel_join_respond,
    },
  ] = useChannelJoinRequestMutation();
  const [
    interact,
    {
      isLoading: isInteracting,
      error: interactionError,
      data: interactionResponse,
    },
  ] = useChannelInteractMutation();

  //<-------------use Effects--------->
  //Detecing LongPress
  React.useEffect(() => {
    if (Array.isArray(LikedBy)) {
      setChannelLiked(
        Boolean(LikedBy?.some((like) => like?.includes(user?._id)))
      );
    }
  }, [isLoading, LikedBy]);
  React.useEffect(() => {
    const { press, long_press } = isPressing;
    const video = document.getElementById(`channel_video_${channel_index}`);
    if (press) {
      video?.play && video.play();
    } else {
      video?.pause && video.pause();
    }
  }, [isPressing]);
  React.useEffect(() => {
    const video = document.getElementById(
      `channel_video_${categoryIndex}_${channel_index}`
    );
    if (!video) return;
    if (isPressing.long_press) {
      if (video?.play instanceof Function) {
        video.play();
      }
    } else {
      if (video?.pause instanceof Function) {
        video.pause();
      }
    }
  }, [isPressing.long_press]);
  React.useEffect(() => {
    if (channelRefInView) {
      console.log("gggggggggggggg");
    } else {
      const channelID = document.getElementById(
        `channel_container_${categoryIndex}_${channel_index}`
      );
      if (!channelID) return;
      const hide = setInterval(() => {
        channelID.style.display = "none";
      }, 3000);
      return clearInterval(hide);
    }
  }, [channelRefInView]);
  React.useEffect(() => {
    const skeleton = document.getElementsByClassName(`channels_skeleton`);
    if (!skeleton) return;
    if (!data && isLoading) {
      [...skeleton].forEach((anim) =>
        anim.animate(
          [
            {
              background: "linear-graident(to left , red , white)",
              opacity: 0.5,
              backgroundSize: `100% 100%`,
            },
            {
              background: "linear-graident(to left , gray , gray)",
              opacity: 0.9,
              backgroundSize: `200% 200%`,
            },
          ],
          {
            duration: 2000,
            iteration: Infinity,
            fill: "both",
          }
        )
      );
    }
  }, [data]);

  /* <---- VARIABLES ----> */
  const navigate = useNavigate();
  const current_Admin = React.useMemo(
    () => data?.Admins && data?.Admins[0],
    [data]
  );

  const isAdmin = Array.isArray(data?.Admins) && [
    Boolean(data?.Admins[0]?._id === user?._id),
    Boolean(
      data?.Admins[0] === user?._id ||
        data?.Admins.slice(1, data?.Admins.length - 1).some(
          ({ _id }) => _id === user._id
        )
    ),
  ];
  const isOpen = data?.Locked;
  const isMemeber =
    Array.isArray(data?.Members) &&
    data.Members.some((member) => member?._id === user?._id);

  //isOpen
  const channelState =
    typeof Locked === "boolean" && !isOpen ? isMemeber && Locked : true;

  const handleTargetChannelSelection = () => {
    setTarget_channel(data);
  };
  const handleOpenPopover = () => {
    try {
      const channelMenuPopover = document.getElementById(
        `channelOptionsMenuPopover${categoryIndex}${channel_index}`
      );
      if (!channelMenuPopover) return;

      console.log(target_channel);
      if (document?.startViewTransition) {
        document.startViewTransition(() => {
          channelMenuPopover.showPopover();
        }, 5000);
      } else {
        channelMenuPopover?.showPopover();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleOpenRequiestingPopover = () => {
    try {
      console.log("open");
      const RequiestingJoinPopover = document.getElementById(
        `RequiestingJoinPopover_${categoryIndex}_${channel_index}`
      );
      if (!RequiestingJoinPopover) return;
      console.log(RequiestingJoinPopover);
      RequiestingJoinPopover.showPopover();
    } catch (err) {
      throw new Error(err.message);
    }
  };
  const MediaLoadingSkeleton = ({ text = false, vid = false }) => {
    return (
      <div
        id={`channel_video_${categoryIndex}_${channel_index}`}
        className={`channels_skeleton absolute flex items-center justify-center 
        bg-gradient-to-tl from-gray-500/80 to-gray-300/90 opacity-30 

        ${vid && videoLoaded && `hidden`}
        ${text ? `h-[30px] w-[60%] rounded-md opacity-60` : `h-full w-full`}  `}
      />
    );
  };

  const componentData = {
    channelState: channelState,
    data: data,
    categoryIndex: categoryIndex,
    channel_index: channel_index,
    isMemeber: isMemeber,
    isAdmin: isAdmin,
    target_channel,
    user: user,
    isRequiesting,
    joinRequiestError,
  };

  return (
    <div
      id={`channel_container_${categoryIndex}_${channel_index}`}
      ref={channelRef}
      style={{ transition: "background 140ms ease" }}
      className={`absolute h-full w-full`}
    >
      {!Boolean(data) || isLoading ? (
        <MediaLoadingSkeleton />
      ) : (
        <div
          style={{
            transition: `transform 200ms ease-in-out , opacity 200ms ease-in , filter 200ms 100ms ease`,
          }}
          onMouseDown={startPress}
          onMouseUp={endPress}
          onMouseMove={endPress}
          className={`flex h-full w-full flex-col items-center justify-center rounded-[10px] p-[10px] text-gray-50
          ${
            channelRefInView
              ? `translate-y-0 opacity-100 grayscale-[0]`
              : `translate-y-[55px] opacity-0 grayscale-[100]`
          }
           ${
             isPressing.long_press
               ? `bg-black`
               : `shadow-[0_0_20px_-15px] shadow-white ${styling?.bg} ${styling?.border}`
           } `}
        >
          {/* POPOVERS */}
          <JoinChannelRespondingWindow {...componentData} />
          <OptionsMenuPopover {...componentData} />

          {/* ART MENU BUTTON AND POPOVER  */}
          <div className={` relative h-1/2 w-[100%] `}>
            {/* MENU POPOVER OPEN DOTS */}
            <ul
              onClick={() => {
                handleTargetChannelSelection();
                handleOpenPopover({
                  category: categoryIndex,
                  channel: channel_index,
                });
              }}
              className={`items-cetner group absolute right-0 top-0 z-[11] m-[5px]  flex h-[30px] w-[40px] cursor-pointer justify-around rounded-sm p-[5px] hover:backdrop-blur-md  `}
            >
              {Array(3)
                .fill("")
                .map((menuDot, menuDotIndex) => (
                  <li
                    key={v4()}
                    style={{
                      transition: `transform 100ms  ease-in-out`,
                      transitionDelay: `${menuDotIndex * 200}ms`,
                    }}
                    className={`pointer-events-none aspect-square w-[6px] origin-center scale-100 rounded-full bg-white opacity-70 group-hover:scale-y-[.3] ${
                      isPressing.long_press && `scale-y-0`
                    }`}
                  />
                ))}
            </ul>

            {/* COVER */}
            {Cover ? (
              <div
                style={{
                  transition: `height 600ms cubic-bezier(0.19, 1, 0.22, 1)`,
                }}
                className={`absolute top-0  w-full overflow-hidden rounded-[10px]  ${
                  isPressing.long_press ? `z-10 h-[150%]` : `h-full`
                }`}
              >
                {Cover.includes("mp4") ? (
                  <>
                    <MediaLoadingSkeleton vid={true} />

                    <video
                      onLoadedData={() => setVideoLoaded(true)}
                      id={`channel_video_${channel_index}`}
                      className={`absolute h-full w-full object-cover`}
                    >
                      <source
                        src={Cover}
                        className={`absolute h-full w-full object-cover`}
                      />
                    </video>
                  </>
                ) : (
                  <img
                    src={Cover}
                    className={`absolute h-full w-full object-cover`}
                  />
                )}{" "}
                <span
                  style={{
                    transition: `transform 250ms 250ms ease-in-out`,
                  }}
                  className={`absolute bottom-0 h-[30%] w-full rounded-[0_0_11px_11px] backdrop-blur-lg ${
                    !isPressing.long_press
                      ? `hidden translate-y-full `
                      : `z-[11] flex translate-y-0`
                  }`}
                />
              </div>
            ) : (
              <MediaLoadingSkeleton />
            )}
          </div>

          {/* TEXT AND DATA  */}
          <div
            className={`flex h-1/2 w-full flex-col items-center justify-start gap-y-[2px] `}
          >
            {/* CATEGORIES & TITLE AND DESC */}
            <div
              className={`flex h-[75%] w-full flex-col items-center justify-start gap-y-[4px]  py-[7px] ${
                isPressing.long_press && `overflow-hidden`
              }`}
            >
              {/* CATEGORIES */}
              <div
                className={`swiper hideScroller flex w-full  items-center justify-start gap-x-[5px] overflow-scroll  ${
                  isPressing.long_press &&
                  `z-[11]   translate-y-[44px] scale-[.95] `
                }`}
              >
                {/* THE CATEGORIES */}
                {Categories?.map((category, index) => {
                  return (
                    <span
                      key={v4()}
                      className={` w-max items-center justify-center rounded-md bg-blue-100/70  p-[2px_4px] ${
                        isPressing.long_press && index > 2 ? "hidden" : "flex"
                      }`}
                    >
                      <small
                        className={`w-max scale-[.8] font-[openSauceReg] text-[10px] text-sm text-black `}
                      >
                        {category}
                      </small>
                    </span>
                  );
                })}
              </div>

              {/* TITLE AND DESC & BUTTON */}
              <div
                className={`flex w-full flex-col items-start justify-center `}
              >
                {/* TITLE & JOIN BUTTON*/}
                <div className={`flex items-center justify-center`}>
                  {/* CHANNEL NAME */}
                  <h2
                    className={`font-[PoppinsBold] text-[20px] leading-9 transition-[font] first-letter:uppercase
                  ${
                    isPressing.long_press
                      ? `z-[11] translate-x-[10px] translate-y-[-22px] text-[28px] text-white`
                      : `text-[20px] text-gray-200 `
                  }`}
                  >
                    {Name}
                  </h2>
                  {/* JOIN BUTTON */}
                  <button
                    onMouseOver={() => handleTargetChannelSelection()}
                    onClick={() => {
                      handleOpenRequiestingPopover();
                      join_requiest({
                        channel_name: target_channel?.Name,
                        user_id: user?._id,
                      })
                        .then((res) => {
                          console.log(res);
                          if (res.data?.path && res.data?.channel_data) {
                            if (document?.startViewTransition) {
                              document.startViewTransition(() => {
                                navigate(`/${res.data.path}`, {
                                  state: res.data?.channel_data,
                                });
                                return;
                              }, 500);
                            }
                            navigate(`/${res.data.path}`, {
                              state: res.data?.channel_data,
                            });
                          }
                        })
                        .catch((err) => console.log(err));
                    }}
                    className={`mx-[8px]  min-w-[70px] items-center justify-center gap-x-[12px] overflow-hidden rounded-full border  border-black p-[2px_5px] font-[openSauceReg] text-[12px] text-black 
                    ${
                      isAdmin.some(Boolean)
                        ? `bg-green-200`
                        : channelState
                        ? `bg-green-200`
                        : `bg-red-200`
                    }
                    ${
                      isPressing.long_press
                        ? `absolute hidden `
                        : `relative flex`
                    }`}
                  >
                    <small>
                      {isAdmin.some(Boolean)
                        ? `visit`
                        : channelState
                        ? `join`
                        : `requiest`}
                    </small>
                    <AiOutlineArrowRight />
                  </button>
                </div>

                {/* DESC */}
                <small
                  className={`font-[openSauceReg] text-[11px] leading-[12px] text-gray-50 ${
                    isPressing.long_press && `opacity-50`
                  }`}
                >
                  {Describtion}
                </small>
              </div>
            </div>

            <hr
              className={`m-auto h-[2px] w-[30%] origin-center translate-y-[-2px] self-center bg-gray-300 opacity-80 transition-transform ${
                isPressing.long_press && `scale-0`
              }`}
            />

            {/* ADMIN AVATAR _ INFO & DATE */}
            <div
              className={`flex h-[25%] w-full items-center justify-between ${
                isPressing.long_press && `opacity-20`
              }`}
            >
              {/* USER AVATAR + USER NAME & DATE */}
              <span
                onClick={() => {
                  if (document?.startViewTransition) {
                    document.startViewTransition(() => {
                      navigate(`Profile/${current_Admin?._id}`);
                    }, 500);
                    return;
                  }
                  navigate(`Profile/${current_Admin?._id}`);
                }}
                className={`relative flex h-full w-[60%] cursor-pointer items-center justify-start gap-x-[10px] rounded-md p-[5px] transition-[background] hover:bg-gray-200/40 `}
              >
                {/* AVATAR */}
                <div className="relative aspect-square w-[32px] overflow-hidden rounded-md">
                  {current_Admin ? (
                    <img
                      style={{
                        viewTransitionName: `ProfileAvatarViewTransiton`,
                      }}
                      src={current_Admin?.Avatar}
                      className={` border border-blue-200/80 `}
                    />
                  ) : (
                    <MediaLoadingSkeleton />
                  )}
                </div>

                {/* NAME & DATE */}
                <div
                  className={`flex h-full flex-col items-start justify-start gap-y-[5px] p-[5px]  text-gray-200`}
                >
                  <h2
                    className={`h-1/2 font-[garet] text-[11px]  first-letter:uppercase `}
                  >
                    {current_Admin ? (
                      <>
                        {current_Admin?.userName}
                        {current_Admin?.LastName}
                      </>
                    ) : (
                      <MediaLoadingSkeleton text={true} />
                    )}
                  </h2>
                  {/* DATE */}
                  <sub className={`h-1/2  text-[10px]  `}>
                    {Date?.slice(0, 10)}
                  </sub>
                </div>
              </span>

              {/* THE INTERACTION BUTTONS */}
              <ul
                className={`ml-[3px] flex h-full w-[40%] items-center justify-center  rounded-md`}
              >
                {[
                  /* THE CHANNEL STATE */
                  {
                    Icon: isAdmin.some(Boolean)
                      ? AiOutlineCrown
                      : channelState
                      ? BsUnlock
                      : BsLock,
                    name: "join",
                    onClick: (target) => {
                      const interactionIconTarget = document.getElementById(
                        `interactionIcon_${categoryIndex}_${channel_index}`
                      );
                      if (!interactionIconTarget || !isAdmin.some(Boolean))
                        return;

                      interactionIconTarget.animate(
                        [
                          { translate: `0 0px` },
                          {
                            translate: `3px -8px`,
                            rotate: "12deg",
                            scale: 1.2,
                            boxShadow: `0 0 30px -3px yellow`,
                          },
                          { translate: `0px 0px` },
                        ],
                        {
                          duration: 1000,
                          easing: "ease-in-out",
                          iterations: 1, // Play only once
                          delay: 500, // Add a delay before the animation starts
                        }
                      );
                    },
                  },
                  /* THE LIKE BUTTON */
                  {
                    Icon: channelLiked ? BsHeartFill : BsHeart,
                    name: "like",
                    onClick: (target) => {
                      setChannelLiked((c) => !c);
                      if (isInteracting) {
                        target.animate(
                          [
                            { scale: 0.7, color: "black", opacity: 0.7 },
                            { scale: 1, color: "gray", opacity: 1 },
                            { scale: 0.7, color: "black", opacity: 0.7 },
                          ],
                          {
                            duration: 2000,
                            iteration: Infinity,
                            fill: "both",
                          }
                        );
                      }
                      const properResponse = {
                        success_added: true,
                        success_delete: false,
                      };
                      interact({
                        action: "like",
                        channel_id: _id,
                        user_id: user?._id,
                      })
                        .then((res) => {
                          console.log(res);
                          if (
                            properResponse[Object.keys(res.data)[0]] ===
                            channelLiked
                          )
                            return;

                          if (interactionError) {
                            setChannelLiked(false);
                            return;
                          }
                        })
                        .catch((err) => setChannelLiked(false));
                    },
                  },
                ].map(({ Icon, onClick, name }, index) => {
                  return (
                    <li
                      key={`${name}${index}`}
                      onClick={({ target }) => onClick(target)}
                      className={`flex h-full w-[40%] scale-100 items-center justify-center rounded-md p-[2px] text-black transition-[transform] hover:scale-[1.1] hover:bg-gray-300/40 ${
                        !index && isAdmin.some(Boolean)
                          ? isAdmin[0]
                            ? `text-[19px] text-yellow-500`
                            : `text-[19px] text-orange-500`
                          : `text-[17px] text-black`
                      }`}
                    >
                      <Icon
                        id={`interactionIcon_${categoryIndex}_${channel_index}`}
                        className={`cursor-pointer text-white`}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import io from "socket.io-client";
import Chat_message_box from "./channel_chat_room_components/chat_message_box.jsx";

import { v4 } from "uuid";

import { Show_Footer_Provider } from "../../context/showFooter_context.jsx";
import InputToggle from "../../components/Elements/InputToggle.jsx";
import { CgMenuCake } from "react-icons/cg";
import Logo from "../../assets/icons/Logo.jsx";

//ICONS
import { BiMessageSquareDots } from "react-icons/bi";
import { CiSquareRemove } from "react-icons/ci";
import { HiOutlinePhotograph } from "react-icons/hi";
import { TbPhotoPlus } from "react-icons/tb";
import { BsArrowLeft, BsHeart, BsSend } from "react-icons/bs";
import {
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineCrown,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { isNull } from "lodash";

const ChatSkeleton = function () {
  return (
    <div
      className={`absolute h-full w-full rounded-md bg-gradient-to-l from-gray-300 to-gray-500 opacity-80`}
    />
  );
};

const chat_room_popovers = {
  channel_info_popover: ({ channel_data }) => {
    const navigate = useNavigate();
    let { Name, Admins, Describtion, Members, LikedBy } = channel_data || {
      Name: "",
      Describtion: "",
      Members: [],
      Admins: [],
      LikedBy: [],
    };

    return (
      <div
        popover={`auto`}
        id={`channel_info_popover`}
        className={`m-auto h-[180px] w-[390px] rounded-md backdrop:backdrop-blur-sm`}
      >
        <div
          className={`absolute flex h-full w-full flex-col items-start justify-center gap-[5px] `}
        >
          {/* THE INFO POPOVER TEXT AND TITLE */}
          <div
            className={`flex h-[65%] flex-col items-start justify-center px-[15px]`}
          >
            <h2
              className={` flex w-full items-center justify-between font-[PoppinsBold] text-[25px] leading-tight text-black`}
            >
              {(Name && Name) || ""}
              <AiOutlineArrowLeft
                onClick={() =>
                  document.getElementById("channel_info_popover")?.hidePopover()
                }
                size={20}
                className={` cursor-pointer transition-transform duration-[100ms] hover:translate-x-[-8px] hover:text-red-400 `}
              />
            </h2>
            <p
              className={`w-full font-[Poppins] text-[12px] leading-normal text-gray-900 [text-wrap:balance]   `}
            >
              {Describtion}
            </p>
          </div>

          {/* THE INFO POPOVER DATA AND ADMINS */}
          <div
            className={`flex h-[35%]  w-full items-center justify-between bg-gray-200/50`}
          >
            <span
              className={`group relative flex h-full w-[65%] items-center justify-start `}
            >
              {Admins.map((admin, admin_index) => (
                <div
                  title={
                    Admins.length != 1 &&
                    `${Admins[0]?.userName} ${Admins[0]?.LastName}`
                  }
                  onClick={() => {
                    if (document?.startViewTransition) {
                      document?.startViewTransition(
                        () => navigate(`/Profile/${admin?._id}`),
                        500
                      );
                      return;
                    }
                    navigate(`/Profile/${admin?._id}`);
                  }}
                  key={v4()}
                  className={`relative mr-[5%] flex h-full w-[25%] cursor-pointer items-center justify-around hover:bg-gray-300/50`}
                >
                  {!admin_index && (
                    <AiOutlineCrown
                      size={18}
                      className={`absolute top-0 origin-bottom translate-y-[-0%] rotate-[15deg] fill-yellow-400`}
                    />
                  )}
                  <img
                    src={admin?.Avatar}
                    className={`aspect-square h-[35px] rounded-full object-cover `}
                  />
                </div>
              ))}
              {Admins.length === 1 && (
                <span
                  className={`relative flex max-w-[110px] items-center justify-start `}
                >
                  <p
                    className={`w-full truncate font-[openSauce] text-[12px] text-[black]`}
                  >
                    {Admins[0]?.userName} {Admins[0]?.LastName}
                  </p>
                </span>
              )}
            </span>
            <span
              className={`flex h-full flex-grow items-center justify-center p-[5px]`}
            >
              {[
                {
                  Icon: BsHeart,
                  title: `liked by`,
                  data: LikedBy?.length,
                },
                {
                  Icon: FiUsers,
                  title: `Members`,
                  data: Members.length,
                },
              ].map(({ Icon, title, data }) => (
                <div
                  key={v4()}
                  title={title}
                  className={`flex h-full w-[40%] items-center justify-around rounded-md hover:bg-gray-300/50`}
                >
                  <Icon size={15} />
                  <small
                    className={`font-[Poppins] text-[12px] font-semibold text-gray-800`}
                  >
                    {data}
                  </small>
                </div>
              ))}
            </span>
          </div>
        </div>
      </div>
    );
  },
  AddPopover: ({ pop_sidebar }) => {
    return (
      <div
        popover={"auto"}
        id={`AddPopoverChatRoom`}
        className={` top-[28%]  h-[52px] w-[100px]  rounded-md bg-transparent backdrop:bg-black/20 ${
          !pop_sidebar ? `translate-x-[170%]` : `m-auto translate-y-[-350px]`
        }`}
      >
        <div
          className={`group absolute flex h-full w-full items-center justify-around overflow-hidden bg-gray-300 p-[4px]`}
        >
          {[
            { Icon: AiOutlineUserAdd, title: `start a chat with a member` },
            { Icon: AiOutlineUsergroupAdd, title: `create a group chat` },
          ].map(({ Icon, title }) => {
            return (
              <div
                key={v4()}
                style={{
                  transition: `transform 250ms ease , opacity 250ms ease `,
                }}
                className={`flex h-full w-full cursor-pointer items-center justify-center  rounded-md hover:bg-gray-100/90`}
              >
                <Icon
                  title={title}
                  size={20}
                  className={`
                      ${
                        document.getElementById("AddPopoverChatRoom")
                          ?.popover == "auto"
                          ? `translate-y-0 opacity-100`
                          : `translate-y-full opacity-0`
                      }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

const ChatContainer = function ({
  default_styling,
  handleSendMessage,
  user,
  auth_api_data,
  channel_data,
  dialuge,
  connected_Socket,
  isAutherized,
}) {
  // CHAT CONTAINER STATES
  const [isScrollingDown, setIsScrollingDown] = React.useState(true);

  React.useEffect(() => {
    const chat_container = document.getElementById("chat_messages_container");
    if (!chat_container) return;

    let prevScroll = 0;
    const handleScrollingDown = (e) => {
      let currentScrollPosition = chat_container.scrollTop;
      setIsScrollingDown(Boolean(currentScrollPosition < prevScroll));
      prevScroll = currentScrollPosition;
    };

    chat_container.addEventListener("scroll", handleScrollingDown);
    return () =>
      chat_container.removeEventListener("scroll", handleScrollingDown);
  }, []);

  const handleOpenChatRoomMenu = function () {
    const menuSideBarChatRoom = document.getElementById(
      "chatRoom_sideBar_main_popover"
    );
    if (!menuSideBarChatRoom) retrun;
    menuSideBarChatRoom.showPopover();
  };

  const { Name, Admins, Members, Describtion } = channel_data || {
    Name: "",
    Admins: "",
    Members: "",
    Describtion: "",
  };

  return (
    <span
      className={`linear_border relative flex  h-full w-full items-center justify-center rounded-md  bg-red-50 md:w-[67%] ${default_styling}`}
    >
      <chat_room_popovers.channel_info_popover channel_data={channel_data} />
      {/* THE CHAT MESSAGES HANDLER */}
      {!connected_Socket && !isAutherized ? (
        <Logo loading={true} />
      ) : (
        <>
          <div
            id={`chat_messages_container`}
            className={`hideScroller absolute flex h-full w-full flex-col justify-start overflow-x-hidden overflow-y-scroll rounded-md  p-[9px] [align-items:space-between]`}
          >
            <div
              style={{
                transition: `transform 250ms ease ,  opacity 250ms 250ms cubic-bezier(0.36, 1.19, 0.68, 0.99)`,
              }}
              className={`sticky  top-0  flex min-h-[45px] w-full translate-x-[-2px] translate-y-[-2px] items-center justify-center  backdrop:blur-lg  
              ${
                Boolean(Name) && !isScrollingDown
                  ? `translate-y-[-100%] opacity-0`
                  : `translate-y-[-0%]  opacity-100`
              }`}
            >
              <div
                className={`absolute flex  w-full flex-col items-start justify-center `}
              >
                <h2
                  className={`relative flex h-[40px] max-h-full w-[40%] min-w-[140px] items-center justify-start font-[brandinkLight] text-[25px] leading-none text-gray-200`}
                >
                  {Boolean(Name) ? <h2>{Name}</h2> : <ChatSkeleton />}
                </h2>
                <small
                  onClick={() => {
                    const info_popover = document.getElementById(
                      "channel_info_popover"
                    );
                    if (!info_popover) return;
                    info_popover.showPopover();
                  }}
                  className={`cursor-pointer font-[Poppins] text-[12px] text-blue-400/90`}
                >
                  {Describtion && "click to know more"}
                  {/*  {AuthRespond?.ChannelPopulated?.Describtion.slice(0, 40)} */}
                </small>
              </div>
            </div>
            <div
              className={`mb-[60px] mt-[20px] flex h-max w-full flex-col  items-center justify-center gap-y-[15px] `}
            >
              {Array.isArray(dialuge)
                ? dialuge?.map((msg) =>
                    msg.type === "notification" ? (
                      <div
                        className={`flex h-max w-full items-center justify-start self-center border border-white bg-gray-800 p-[2px_4px] md:w-[80%] md:self-auto`}
                      >
                        {msg.message}
                      </div>
                    ) : (
                      <Chat_message_box
                        key={v4()}
                        msg={msg}
                        isSender={
                          msg?.sender_info?._id ===
                          JSON.parse(localStorage?.user)?._id
                        }
                      />
                    )
                  )
                : console.log(dialuge)}
            </div>
          </div>

          {/* THE MESSAGES INPUT  */}
          <div
            style={{
              transition: `opacity 250ms ease `,
            }}
            className={` sticky top-full flex h-[47px] w-full translate-y-[-20%] items-center justify-between gap-x-[8px] opacity-80 focus-within:opacity-100 hover:opacity-100 md:translate-y-[-30%]`}
          >
            {/* THE CHAT INPUT */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage({
                  message: e.target.chat_room_message_name.value,
                });
                e.target.chat_room_message_name.value = "";
                e.target.chat_room_message_name.value =
                  e.target.chat_room_message_name.value;
              }}
              className={` flex h-full w-[88%]  flex-grow  items-center justify-center overflow-hidden rounded-md bg-gradient-to-tl from-gray-200/90 to-gray-50 px-[10px] text-[16px] md:w-[96%]`}
            >
              <input
                name={`chat_room_message_name`}
                placeholder={`send message`}
                className={`h-full w-[95%]  bg-transparent  font-[openSauceReg] outline-none`}
              />

              <div
                className={`flex h-full w-[15%] items-center justify-around`}
              >
                <div className={`z-[1]`}>
                  <TbPhotoPlus size={20} />
                </div>
                <div
                  title={`send`}
                  className={`group  relative flex aspect-square w-[55px] items-center justify-center `}
                >
                  <span
                    style={{
                      transition: `transform 300ms cubic-bezier(0.36, 1.19, 0.68, 0.99)`,
                    }}
                    className={`absolute  h-full w-full scale-0 rounded-full bg-gray-300/90 group-hover:scale-[2]`}
                  />
                  <BsSend size={18} className={`z-[1] cursor-pointer`} />
                </div>
              </div>
            </form>
            {/* OPEN MENU POPOVER BUTTON */}
            <span
              onClick={handleOpenChatRoomMenu}
              className={`group relative flex h-full w-[10%] max-w-[47px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border border-transparent  bg-gray-200 hover:border-gray-100/50 hover:bg-transparent md:hidden`}
            >
              <AiOutlineArrowDown
                style={{
                  transition: `transform 500ms cubic-bezier(0.19, 1, 0.22, 1)`,
                }}
                size={19}
                className={`absolute  translate-y-[-250%] text-black group-hover:translate-y-0 group-hover:text-white `}
              />
              <CgMenuCake
                style={{
                  transition: `transform 500ms cubic-bezier(0.19, 1, 0.22, 1)`,
                }}
                size={19}
                className={`absolute translate-y-0 text-black group-hover:translate-y-[250%] group-hover:scale-[1.2] group-hover:text-white `}
              />
            </span>
          </div>
        </>
      )}
    </span>
  );
};

const SideBarChat = function ({
  transform_point,
  default_styling,
  private_message,
  setPrivateMessage,
}) {
  // SIDE BAR CHAT STATES
  const [pop_sidebar, setPop_sidebar] = React.useState(false);
  const [isSearchingInChannelMembers, setIsSearchingInChannelMembers] =
    React.useState(false);
  const [side_bar_menu, setSide_bar_menu] = React.useState([
    {
      Icon: AiOutlinePlus,
      onClick: () => {
        const AddPopover = document.getElementById("AddPopoverChatRoom");
        if (!AddPopover) return;
        AddPopover.showPopover();
      },
    },
    {
      Icon: AiOutlineSearch,
      onClick: () => {
        setIsSearchingInChannelMembers(true);
      },
    },
    {
      Icon: BiMessageSquareDots,
      onClick: () => {},
    },
  ]);

  // SIDE BAR CHAT USE EFFECTS
  React.useEffect(() => {
    setPop_sidebar(!Boolean(window.innerWidth > 768));
    const handlePopState = () => {
      setPop_sidebar(!Boolean(window.innerWidth > 768));
    };
    window.addEventListener("resize", handlePopState);
    return () => window.removeEventListener("resize", handlePopState);
  }, []);

  //Handlers
  return (
    <>
      <span
        {...(pop_sidebar && { popover: "auto" })}
        id={"chatRoom_sideBar_main_popover"}
        className={`  relative m-auto  h-[65%] min-w-[290px]  flex-col items-start justify-start overflow-visible rounded text-white md:flex  md:h-full md:w-[32%] 
        ${
          pop_sidebar
            ? `mx-auto w-[99%] translate-y-[-27%] border border-gray-50  bg-gradient-to-tl from-gray-900  to-black p-[10px] backdrop:bg-black/50 `
            : `linear_border ${default_styling} m-0 w-full `
        }`}
      >
        {/* POPOVERS */}
        <chat_room_popovers.AddPopover pop_sidebar={pop_sidebar} />
        {/* THE UPPER SESSION  */}
        <div
          className={`relative flex h-[48px] w-full items-center justify-between `}
        >
          <div
            className={`group flex h-full w-[25%] cursor-pointer items-center justify-center `}
          >
            {/* RETURNING ICON DEPENDING ON THE SEARCHING STATE  */}
            {React.createElement(
              isSearchingInChannelMembers ? CiSquareRemove : BsArrowLeft,
              {
                onClick: () => {
                  if (isSearchingInChannelMembers) {
                    setIsSearchingInChannelMembers(false);
                  }
                },
                style: {
                  transition: `transform 250ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
                },
                size: isSearchingInChannelMembers ? 20 : 25,
                className: `z-[5]  
                  ${
                    isSearchingInChannelMembers
                      ? ` text-black group-hover:scale-[1.5]  origin-center group-hover:text-red-400 ${
                          pop_sidebar
                            ? `translate-x-[-40px] `
                            : `translate-x-[-20px]`
                        }`
                      : `text-white group-hover:translate-x-[-30px] group-hover:translate-x-[-23px] origin-right`
                  }`,
              },
              null
            )}

            <hr
              style={{
                transition: `transform 250ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
              }}
              className={`absolute z-10 h-[1px]  w-[5px] origin-right translate-x-[10px] scale-x-100 bg-white group-hover:scale-x-[7] ${
                isSearchingInChannelMembers && `hidden`
              }`}
            />
          </div>

          {/* THE NAV BOX IN THE SIDEBAR */}
          <nav
            style={{
              transition: `width 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86)`,
            }}
            className={` absolute right-0 flex h-full  items-center justify-evenly overflow-hidden rounded-md border-[.5px] border-gray-400/10  p-[2px] ${
              isSearchingInChannelMembers ? `w-full` : `w-[60%]`
            }`}
          >
            {/* THE THREE OPTIONS CONTAINER  */}
            <div
              id={`Three_chatroom_sideBar_options`}
              style={{
                transition: `transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86)`,
              }}
              className={`flex h-full w-full items-center justify-evenly 
              ${
                isSearchingInChannelMembers
                  ? `-translate-x-full`
                  : `translate-x-0`
              }`}
            >
              {side_bar_menu.map(({ Icon, onClick }, index) => (
                <span
                  onClick={() => onClick()}
                  key={v4()}
                  className={`tranisiton-[background_color] flex h-full w-[30%] cursor-pointer items-center justify-center rounded-md text-gray-400 duration-[200ms] hover:bg-gray-50 hover:text-black`}
                >
                  <Icon size={19} />
                </span>
              ))}
            </div>

            {/* THE SEARCH INPUT */}
            <form
              style={{
                transition: `transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86)`,
              }}
              className={`absolute right-0 flex h-full w-full  items-center justify-center rounded-md bg-gradient-to-l from-gray-300 to-gray-200 ${
                isSearchingInChannelMembers
                  ? `-translate-x-0`
                  : `translate-x-[105%]`
              }`}
            >
              <input
                name={`search_memebers_in_channel`}
                placeholder={`search for memebers`}
                className={`w-full bg-transparent px-[50px] font-[openSauceReg] text-[13.3px] text-gray-700 outline-none placeholder:text-gray-400 `}
              />
            </form>
          </nav>
        </div>
      </span>
    </>
  );
};

const Unautherized = function () {
  return (
    <span
      popover={`manual`}
      id={`unautherizedInteractionPopoverChatRoom`}
      className={`m-auto h-[400px] w-[80%] min-w-[350px] `}
    >
      <div
        className={`absolute flex h-full w-full items-center justify-center rounded-md bg-gray-300`}
      ></div>
    </span>
  );
};

export default function Channel_chat_room() {
  const navigate = useNavigate();
  const param = useParams();

  //-----VARIABLES-----
  const location = useLocation();
  const channel_data_nav_state = location?.state;
  const default_styling = `bg-gradient-to-tl from-[#050505]   to-[#111111] p-[8px] rounded-md`;
  const transform_point = `500px`;

  //MAIN CHAT ROOM STATES
  const [pageEnd, setPageEnd] = React.useState(false);
  const [stopShowingFooter, setStopShowingFooter] = React.useState(false);
  const [isAutherized, setIsAutherized] = React.useState(
    Boolean(location?.state) ?? null
  );
  const [channel_data, setChannel_data] = React.useState(
    channel_data_nav_state
  );
  const [dialuge, setDialuge] = React.useState([]);
  const [connected_Socket, setConnected_Socket] = React.useState(false);
  const [disconnect_Socket, setDisconnect_Socket] = React.useState();
  //-----SOCKET-----
  const socket = io(import.meta.env.VITE_BACKENDSERVER);

  //-----CONTEXT ------
  const { footerVisible, FooterVisibilityHandler } =
    React.useContext(Show_Footer_Provider);

  //MAIN CHAT ROOM USE PARAM
  const [private_message, setPrivateMessage] = useSearchParams({
    isPrivate: false,
    to: undefined,
  });

  //USE EFFECT MAIN JSX CHAT ROOM
  React.useEffect(() => {
    socket.on("connect", () => {
      setConnected_Socket(true);
      setDialuge((c) => [
        ...c,
        {
          type: "notification",
          message: `${
            JSON.parse(localStorage?.user)?.userName
          } have joined the chat`,
        },
      ]);
    });
  }, []);

  React.useEffect(() => {
    if (isAutherized) return;
    socket.emit(
      "validate",
      {
        user_id: localStorage?.user && JSON.parse(localStorage?.user)?._id,
        channel_name: param?.name,
      },
      (res) => {
        console.log(res);
        if (res?.ChannelPopulated) {
          setIsAutherized(true);
          setChannel_data(res.ChannelPopulated);
        } else if (res?.unautherized) {
          setIsAutherized(false);
          setChannel_data(null);
        }
      }
    );
  }, []);

  React.useEffect(() => {
    const main_chat_room_container = document.getElementById(
      "chat_room_main_container"
    );
    if (!main_chat_room_container) return;

    const handleMouseMove = function (e) {
      const elementRect = main_chat_room_container.getBoundingClientRect();
      const pageEndCondition =
        e.clientY > elementRect.top + elementRect.height - (pageEnd ? 55 : 25);
      if (!pageEnd) {
        const startShowingArrow = new Promise((res, rej) => {
          setTimeout(() => {
            setPageEnd(pageEndCondition);
            res();
          }, 2000);
        }).then((res) => clearTimeout(res));
      } else {
        setPageEnd(pageEndCondition);
      }
    };

    main_chat_room_container.addEventListener("mousemove", handleMouseMove);
    return () =>
      main_chat_room_container.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, [pageEnd]);

  React.useEffect(() => {
    if (stopShowingFooter) {
      FooterVisibilityHandler(false);
    }
  }, [stopShowingFooter]);

  React.useEffect(() => {
    const socketDisconnect = function () {
      socket.disconnect();
    };
    window.addEventListener("beforeunload", socketDisconnect);
  });

  // ----- HANDLERS ----
  // Define the `handleSendMessage` function
  const handleSendMessage = ({ message }) => {
    try {
      if (!isNull(isAutherized) && !isAutherized) return;
      if (!localStorage?.user) throw new Error("no sender");
      const message_data = {
        sender: JSON.parse(localStorage.getItem("user"))?._id,
        message,
        Type: private_message.get("isPrivate") ? "Private" : "Public",
        channel_name: param?.name,
      };

      if (private_message?.to) {
        message_data.To = private_message.get("to");
      }

      socket.emit("send_message", message_data);

      socket.on("receive_message", (SRVRMessage) => {
        console.log(SRVRMessage);
        if (!Boolean(SRVRMessage)) {
          setDialuge((c) => [...prev, message_data]);
        }
        setDialuge((prev) => [...prev, SRVRMessage]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  //-----DATA-----
  const data_to_components = {
    transform_point,
    isAutherized,
    channel_data_nav_state,
    channel_data,
    default_styling,
    handleSendMessage,
    connected_Socket,
    disconnect_Socket,
    dialuge,
    private: {
      private_message,
      setPrivateMessage,
    },
  };

  return (
    <div
      id={`chat_room_main_container`}
      style={{
        viewTransitionName: `NavigateToProfileViewTransition`,
      }}
      className={` relative flex h-[84vh] w-full items-center justify-center border-[5px] border-yellow-500 p-[12px]`}
    >
      <div
        className={`flex h-full w-full flex-col items-center justify-center`}
      >
        <div
          className={`relative flex h-full w-full items-center justify-between `}
        >
          {/* SIDEBAR */}
          <SideBarChat {...data_to_components} />
          {/* CHAT */}
          <ChatContainer {...data_to_components} />
        </div>
        {/* TOGGLE BUTTON & STOP FOOTER VISIBILITY TOGGLE BUTTON  */}
        <div
          style={{
            transition: `height 250ms ease `,
          }}
          className={`group  relative flex w-full cursor-pointer items-center justify-center overflow-hidden  
              ${!stopShowingFooter && pageEnd ? `h-[40px]` : `h-0`}`}
        >
          {/* TOGGLE ARROW  */}
          <AiOutlineArrowDown
            onClick={() => {
              FooterVisibilityHandler(!footerVisible);
              window.scrollTo(0, document.body.scrollHeight);
            }}
            size={25}
            className={`drop-shadow-gray-50/50 translate-x-[-30px] text-gray-50 group-hover:drop-shadow-[0_0_15px_-2px] md:translate-x-0
              ${footerVisible ? `rotate-[180deg]` : `rotate-0`}`}
          />

          {/* STOP SEEING  ARROW  */}
          <div
            style={{
              transition: `opacity 250ms 250ms ease  `,
            }}
            className={`  absolute right-0 mx-[15px] flex h-[50%] max-h-full min-w-[15%] items-center justify-around gap-x-[8px] ${
              !stopShowingFooter && pageEnd
                ? `scale-y-100 opacity-100`
                : `scale-y-0 opacity-0`
            }`}
          >
            <small className={`font-[garet] text-[12px] text-gray-300`}>
              don't show this button again
            </small>
            <InputToggle
              isCheck={stopShowingFooter}
              onClick={() => setStopShowingFooter((c) => !c)}
              style={{ width: "37px", height: `20px` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

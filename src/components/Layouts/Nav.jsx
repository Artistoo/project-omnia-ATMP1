import React from 'react';
import { Link, useNavigate, NavLink, useSearchParams } from 'react-router-dom';

//COMPONENTS
import Logo from '../../assets/icons/Logo.jsx';
import Menu from '../../assets/icons/menuIcon.jsx';
import { NavData, transitionTimingFunctions } from '../../../data.js';
import Channel_type_info_popover from '../Popovers/channel_type_info_popover.jsx';

import SuccessWindowPopover from '../Popovers/SuccessWindowPopover.jsx';

import { v4 } from 'uuid';
import { useScrollingDirection } from '../../hooks/useScrollingDirection.jsx';
import Channel_card from '../Elements/CreateChannelCard.jsx';

//ASSETS
import create_tribe from '../../assets/img/CreateTribe.png';
import create_community from '../../assets/img/CreateCommunity.png';

//ICONS
import { CiSquareInfo, CiSquarePlus, CiSquareRemove } from 'react-icons/ci';
import { IoIosArrowRoundForward, IoMdArrowForward } from 'react-icons/io';
import { RotateSpinner } from 'react-spinners-kit';

//HOOKS
import { useClickAway, useMediaQuery } from '@uidotdev/usehooks';
import { handlePopoverState } from '../../utils/handlePopoverState.js';
import { useCreateChannelMutation } from '../../redux/API.js';
import { isBoolean } from 'lodash';
import { AiOutlineCrown } from 'react-icons/ai';
import DOMPurify from 'dompurify';

const Components = {
  text: ({ Ele_data, important = false, type }) => (
    <div className="pointer-events-none relative flex h-max w-[100px] min-w-max items-center justify-start">
      <IoMdArrowForward
        style={{
          transition: `transform 400ms cubic-bezier(0.32, 1.39, 0.67, 1)`,
        }}
        size={16}
        className={`absolute left-0 translate-x-[-5px] opacity-0 group-hover/main_container:translate-x-[2px] group-hover/main_container:opacity-100 `}
      />
      {Ele_data?.func === 'nav' && <NavLink to={Ele_data.to} className={`pointer-events-auto absolute h-full w-full `} />}

      {React.createElement(
        type === 'menu' ? (important ? 'b' : 'p') : 'div',
        {
          style: {
            transition: `transform 100ms cubic-bezier(0.32, 1.39, 0.67, 1)`,
          },
          className: {
            nav: `text-[16.5px] pointer-events-auto flex hover:text-gray-500  relative  font-[openSauceReg]  w-[100%]   min-w-max group mx-[2px] overflow-hidden  md:h-[40px]   items-center justify-start flex-col cursor-pointer ${Ele_data?.mediaQueryClass}`,
            menu: `md:text-[15px] text-[15.3px] md:h-auto h-[40px] flex-center  translate-x-0 group-hover/main_container:translate-x-[22px]  `,
          }[type],
        },
        type === 'menu' ? (
          Ele_data?.title
        ) : (
          <div
            style={{
              transition: `transform 200ms cubic-bezier(0.32, 1.39, 0.67, 1)`,
            }}
            className={`pointer-events-none absolute flex h-[200%] w-full flex-col items-center justify-start  group-hover/main_container:-translate-y-1/2`}
          >
            <div className={`flex h-1/2 items-center justify-center`}>{Ele_data?.title}</div>
            <div className={`flex h-1/2 items-center justify-center font-[openSauce] text-green-400`}>
              <p>GO </p>
              <IoMdArrowForward
                style={{
                  transition: `transform 200ms 250ms cubic-bezier(0.32, 1.39, 0.67, 1) , opacity 250ms 250ms ease`,
                }}
                size={16}
                className={`absolute translate-x-[0px]  opacity-0 group-hover/main_container:translate-x-[130%] group-hover/main_container:opacity-100 `}
              />
            </div>
          </div>
        )
      )}
    </div>
  ),

  btn: ({ Ele_data, index, type }) => {
    const navigate = useNavigate();
    return (
      <button
        onMouseOver={(e) => (document.getElementById(`navBtnClipPathCircle_${index}`).style.clipPath = `circle(200% at 100% 100%)`)}
        onMouseLeave={(e) => (document.getElementById(`navBtnClipPathCircle_${index}`).style.clipPath = `circle(0% at 100% 100%)`)}
        onClick={() =>
          ({
            nav: navigate(Ele_data.to),
            fire: Ele_data?.onClick instanceof Function && Ele_data.onClick(),
            open:
              Ele_data?.onClick instanceof Function &&
              ['tribe', 'community'].filter((ele) => Ele_data?.title?.includes(ele)) &&
              Ele_data.onClick(
                document.getElementById(
                  `channel_cardPopover_of${
                    'community'
                    /* Ele_data?.title.match(/tribe|community/g)[0] */
                  }`
                )
              ),
          }[Ele_data?.func])
        }
        className={` flex items-center justify-center font-[openSauceReg]  
          ${
            {
              nav: `relative mx-[5px] w-[150px] overflow-hidden rounded-md border border-gray-200/50 p-[6px_15px] text-[16.3px] text-gray-50 hover:text-black`,

              menu: `md:text-md absolute bottom-[28%] left-0 w-full flex-grow rounded-sm border border-gray-900/50  py-[10px] text-[15.3px] hover:text-gray-200 md:relative md:w-auto md:translate-y-0 md:py-[5.5px]  translate-y-[${
                index + 1 * 100
              }%]`,
            }[type]
          }`}
      >
        <span
          id={`navBtnClipPathCircle_${index}`}
          style={{
            clipPath: `circle(0% at 100% 100%)`,
            transition: `clip-path 400ms cubic-bezier(0.32, 1.39, 0.67, 1)`,
          }}
          className={`absolute left-0  h-full w-full  ${{ nav: `bg-purple-300/90 `, menu: `bg-black` }[type]}`}
        />
        <p className={`z-[1]`}>{Ele_data?.title}</p>
      </button>
    );
  },

  icon: ({ Ele_data, search_state, index, scrollingDir, open_menu, onClick = () => null }) => {
    return (
      <div
        onClick={onClick}
        style={{
          transition: `transform 250ms ${index * 50}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) , 
          opacity 300ms ${index * 50}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        }}
        className={`flex-center  h-full w-[5%] min-w-[60px] cursor-pointer  md:relative   md:translate-y-0 md:opacity-100 
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
        <div className={`absolute aspect-square h-[50px] rounded-md border border-gray-500/50`} />
        <Ele_data.Icon
          style={{
            transition: `transform 250ms cubic-bezier(0.32, 1.39, 0.67, 1) , fill 250ms cubic-bezier(0.32, 1.39, 0.67, 1) , filter 500ms cubic-bezier(0.32, 1.39, 0.67, 1)  `,
          }}
          size={26}
          className={`md:text-gray-100 ${Boolean(open_menu?.at) ? `text-black` : `text-gray-100`}  ${
            open_menu.at - 1 === index && [' fill-yellow-500 drop-shadow-[0px_0px_9px_yellow]', 'rotate-[45deg]'][open_menu.at - 1]
          } `}
        />
      </div>
    );
  },

  form: ({ Ele_data, search_state, index, scrollingDir, open_menu, offset }) => {
    const navigate = useNavigate();
    return (
      <form
        style={{
          transition: `transform  250ms ${index * 50}ms ease`,
        }}
        className={`relative  z-[5] flex  h-full w-[100px] min-w-full items-center justify-end  md:w-[380px] ${
          !!!Boolean(open_menu.at) ? (scrollingDir ? `-translate-y-[50%]` : `translate-y-0`) : `translate-y-0`
        }`}
        onSubmit={function (event) {
          event.preventDefault();
          const purified = DOMPurify.sanitize(event.target.nav_bar_main_search_input.value);
          navigate(`search/${purified}`);
        }}
      >
        <div
          style={{
            transition: `width 200ms ${search_state.isSearching ? `250ms` : `0ms`} cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
          }}
          className={`flex-center absolute left-0 h-full max-w-[400px] md:w-full md:max-w-none 
          ${search_state.isSearching ? `w-[240%]` : `w-full `}`}
        >
          {/* SEARCH NAV INPUT */}
          <input
            name={`nav_bar_main_search_input`}
            style={{
              transition: `opacity 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) , border 100ms  150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            }}
            placeholder={Ele_data.placeholder}
            className={`absolute left-0 h-[45px] w-full rounded-sm border  px-[10px] font-[openSauce] text-[14.8px] outline-none   backdrop-blur-lg placeholder:text-gray-500  md:left-auto md:w-[95%] md:border-gray-600 md:opacity-100 
            ${Boolean(offset) ? `bg-gray-200/90 backdrop-opacity-50` : `bg-gray-950/80 backdrop-opacity-100`}
            ${search_state.isSearching ? `border-gray-600 opacity-100` : `border-transparent opacity-0`}
          `}
          />
          {/* ICONS SEARCH NAV BAR */}
          <div className={`flex-center absolute right-0 aspect-square w-[40px] cursor-pointer md:cursor-auto`}>
            {[
              { Icon: Ele_data.Icon, id: 'MainNavSearchIcon' },
              { Icon: CiSquareRemove, id: 'MainNavCancelSearchIcon' },
            ].map(({ Icon, id }, index) => (
              <Icon
                key={id}
                onClick={() => search_state.setIsSearching(!Boolean(index))}
                style={{
                  transition: `transform 200ms 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) , color 250ms ease`,
                }}
                size={23}
                className={`absolute  md:right-[20px] 
              
              ${open_menu.at ? (Boolean(offset) ? `text-black ` : `text-black md:text-gray-100`) : `${!scrollingDir && Boolean(offset) ? `text-black` : `text-gray-100`} `}
              ${Boolean(index) ? `hover:text-gray-50 md:scale-0` : `hover:text-gray-50 md:scale-100`}
              ${search_state.isSearching ? (Boolean(index) ? `scale-100` : `scale-0`) : Boolean(index) ? `scale-0` : `scale-100`}`}
              />
            ))}
          </div>
        </div>
      </form>
    );
  },

  img: ({ Ele_data, onClick = () => null, index, open_menu }) => (
    <div onClick={onClick} className={`flex-center group relative z-[5] h-full w-[8%] min-w-[80px] cursor-pointer`}>
      <img src={Ele_data?.img} className={` aspect-square w-[65px] rounded-full`} alt={`profile avatar z-[5]`} />
      {console.log(open_menu.at + 1)}
      <div
        style={{
          transition: `transform 250ms ease`,
        }}
        className={`absolute h-[78px] w-[80px] scale-[.8] rounded-full border border-gray-100  opacity-0  ${
          open_menu.at + 1 === 4
            ? `scale-[.9] opacity-100`
            : `group-hover:scale-[.9]
          group-hover:opacity-100`
        }`}
      />
    </div>
  ),

  box: ({ Ele_data, isMD, sectionIndex, open_menu, index, box_parameter, create_state_param, getCreatedChannelData }) => {
    //STATES
    const [isCreating] = box_parameter;
    const [isCreatingParams, handleUpdateBoxParams] = create_state_param;

    const [creating_channel, setCreating_channel] = React.useState(false);

    //VAR
    const selected = isCreatingParams === Ele_data.title;
    const hasSelected = isCreatingParams
    const channel_type = Ele_data.title.toLowerCase().includes(`community`) ? `community` : `tribe`;
    const transition = (properties) =>
      Array.isArray(properties) && {
        transition: properties.map((prop) => `${prop.split(' ')[0]} ${prop.split(' ')[2] || 250}ms ${prop.split(' ')[1] || `cubic-bezier(0.36, 2.2, 0.66, 1.25)`}`),
      };

    //REF
    const Channel_parameters_ref = React.useRef(null);

    //HANDLERS
    const handleOpenChannelCreationPopover = (state) => {
      handlePopoverState(`create_channel_popover_${Ele_data.title}`, state);
      handleUpdateBoxParams(state ? Ele_data.title : false);
    };
    const handleIfSelected = (isSelected, notSelected, noneSelected, inMD = false) => (!inMD && !isMD && hasSelected ? (selected ? isSelected || '' : notSelected || '') : noneSelected || '');

    const handleChannelCreation = function () {
      if (!Channel_parameters_ref?.current) return;
      Channel_parameters_ref.current.handleSubmit();
    };

    const CreateChannelBoxHandlers = {
      handleUpdateLoadingState: (state) => setCreating_channel(state),
    };

    React.useEffect(() => {
      //hiding the popover on menu section change
      handlePopoverState(`create_channel_popover_${Ele_data.title}`, false);
    }, [open_menu.at]);

    return (
      <>
        <div
          style={{ ...transition(['height']) }}
          className={` m-auto my-[5px] w-[90%]  overflow-hidden md:my-[2px] md:h-[43px]  md:w-full 
          ${handleIfSelected(`flex-center h-[70px]`, `hidden`, `flex-center h-[115px]`)}`}
        >
          <div
            style={{ ...transition(['width']) }}
            className={`relative flex h-full min-w-[200px]   items-center justify-start rounded-md border border-black bg-gray-100 md:w-full 
            ${handleIfSelected(`w-[60%] `, null, `w-[70%] max-w-[360px]`)}`}
          >
            <span className={`z-[1] flex h-full w-[60%] flex-col items-start  justify-between  p-[15px_15px]   md:w-full md:flex-row md:items-center md:p-[5px_10px]`}>
              <h2 className={`w-min font-[openSauceReg]  text-[17px] leading-none md:text-sm `}>{Ele_data.title}</h2>

              {/* THE INFO BUTTON + CREATE BUTTON*/}
              <div
                className={`flex-center absolute left-0  font-[openSauceReg] text-gray-100 md:left-auto md:right-0 md:w-[40%] md:justify-start  md:gap-x-[5px] md:pl-[20px] 
                ${handleIfSelected(`bottom-0  h-full w-full`, null, `bottom-[10%]  h-[27px] w-[170px]`)}`}
              >
                {/* INFO BUTTON */}
                <button
                  //EVENTS
                  onClick={() => handlePopoverState(`channel_type_info_popover_${channel_type}`, true)}
                  className={` absolute z-[1]  aspect-square h-[25px] translate-x-full rounded-[4px] text-black hover:text-green-800 md:relative  md:translate-x-0 md:hover:scale-[1.1] ${handleIfSelected(
                    `hidden`,
                    `hidden`,
                    `flex-center`
                  )}`}
                >
                  <CiSquareInfo size={isMD ? 30 : 22} className={`scale-[1.2]`} />
                </button>

                {/* CREATE BUTTON */}
                <div className={`relative flex h-full w-full items-center justify-start md:w-[25px] md:justify-center`}>
                  {[
                    {
                      role: `create`,
                      Content: {
                        placeholder: `create`,
                        Icon: handleIfSelected(CiSquareRemove, CiSquarePlus, CiSquarePlus),
                      },
                      Props: { key: React.useId() },
                      Events: { onClick: () => handleOpenChannelCreationPopover(!hasSelected) },
                    },
                    {
                      role: `submit`,
                      Content: {
                        placeholder: ``,
                        Icon: creating_channel ? RotateSpinner : IoIosArrowRoundForward,
                      },
                      Props: { key: React.useId() },
                      Events: { onClick: () => handleChannelCreation() },
                    },
                  ].map(({ Events, Props, role, Content: { placeholder, Icon } }, index) => (
                    <button
                      {...Events}
                      {...Props}
                      className={`flex-center group absolute h-full  gap-x-[3px] border border-gray-100 bg-[#121212] md:relative md:aspect-square md:rounded-md  md:border-none md:bg-transparent  md:text-black 
                          ${
                            //SELECT STATAE
                            !isMD && { selected: `mx-[5px] w-[77px] rounded-[7px]`, not_selected: `mx-[15px] w-[82px] rounded-[5px]` }[handleIfSelected(`selected`, null, `not_selected`)]
                          }
                          ${
                            //BUTTON TYPE
                            {
                              create: `z-[1] ${handleIfSelected(`right-full`, null, ``)} `,
                              submit: `md:hidden  ${handleIfSelected(`left-full`, null, `hidden`)}`,
                            }[role]
                          }`}
                    >
                      {isMD || handleIfSelected(true) ? (
                        <Icon
                          //SPINNER
                          color={!isMD && `rgb(243,244,246)`}
                          //ICON
                          size={!!index ? (creating_channel ? 20 : 30) : 30}
                          style={{
                            transitionDuration: `220ms`,
                            transitionTimingFunctions: transitionTimingFunctions.Soft_Back_And_Forth,
                          }}
                          className={
                            {
                              create: `transition-[transform_color] group-hover:rotate-90 group-hover:scale-[1.1]  group-hover:text-red-500 md:scale-[1.1] md:text-black md:group-hover:text-green-600`,
                              submit: `transition-[transform] group-hover:translate-x-[5px] group-hover:scale-x-[1.1]`,
                            }[role]
                          }
                        />
                      ) : (
                        <>
                          <Icon size={23} />
                          <p>{placeholder}</p>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* THE CHANNE TYPE INFO POPOVER  */}
              <Channel_type_info_popover type={channel_type} />
            </span>

            <span className={`flex-center relative h-full w-auto max-w-[40%] md:hidden `}>
              <img
                style={{ ...transition(['opacity']) }}
                src={Ele_data.box_art}
                className={`h-[100%] min-h-[150px] w-auto scale-[1.5] object-cover  
                ${handleIfSelected(`translate-x-[-15px] opacity-50`, null, null)}`}
              />
            </span>
          </div>
        </div>

        {/* POPOVER_BOX */}
        <div
          {...(isMD && { popover: 'auto' })}
          id={`create_channel_popover_${Ele_data.title}`}
          style={{
            transitionProperty: `transform , opacity`,
            transitionTimingFunction: `cubic-bezier(0.45, 0.05, 0.55, 0.95)`,
            transitionDuration: `250ms , 250ms`,
            transitionDelay: isCreating ? `250ms` : `0ms`,
          }}
          className={`pointer-events-none rounded-md
          ${
            {
              popover: `m-auto h-[420px] w-[430px] overflow-hidden bg-transparent backdrop:bg-black/60  md:w-[450px]`,
              element: `flex-center absolute left-0  h-screen w-screen  
                ${handleIfSelected(`transalte-y-0 opacity-100`, `translate-y-full opacity-0`, `translate-y-full opacity-0`)}`,
            }[isMD ? `popover` : 'element']
          }`}
        >
          <Channel_card
            CreateChannelBoxHandlers={CreateChannelBoxHandlers}
            getCreatedChannelData={(data) => {
              getCreatedChannelData(data);
              handleOpenChannelCreationPopover(false);
            }}
            close={() => handleOpenChannelCreationPopover(false)}
            ref={Channel_parameters_ref}
            Ele_data={Ele_data}
            selected={selected}
            isCreating={isCreating}
          />
        </div>
      </>
    );
  },
};

export default function Nav() {
  //ROUTER DOM
  const navigate = useNavigate();
  const [open_menu, setOpen_menu] = React.useState({ state: false, at: '' });
  const [isSearching, setIsSearching] = React.useState(false);
  const [created_channel_data, setCreated_channel_data] = React.useState({ state: false, data: { Name: null, _id: null } });
  const [isCreating, set_isCreating] = React.useState(false);
  const [isCreatingParams, setIsCreatingParams] = React.useState({ name: false });

  //USEHOOKS
  const NavBar = useClickAway(() => setOpen_menu((c) => ({ ...c, at: 0 })));

  //COSTOM HOOKS
  const isMD = useMediaQuery('only screen and (min-width : 768px');
  const [scrolling] = useScrollingDirection();
  const scrollingDir = scrolling?.dir;
  const offset = scrolling?.offset;

  //VARIABLES
  const user_state = localStorage?.user ? 'in' : 'out';

  //DATA
  const dataToComponents = {
    search_state: {
      isSearching,
      setIsSearching,
    },
    scrollingDir,
    offset,
    open_menu,
  };

  //HANDLERS
  const handleUpdateBoxParams = (update_name) =>
      setIsCreatingParams(() => {
        try {
          const update = isCreatingParams !== update_name ? update_name : false;
          return { name: update };
        } catch ({ message: error }) {
          console.log({ error });
        }
      }),
    handleGetCreatedChannelData = (data) => setCreated_channel_data({ state: Boolean(data), ...data });

  //EFFECT
  React.useEffect(() => {
    if (isSearching) {
      setOpen_menu((c) => ({ ...c, at: 0 }));
    }
  }, [isSearching]);

  React.useEffect(() => {
    handleUpdateBoxParams(false);
  }, []);

  return (
    <>
      <nav
        ref={NavBar}
        style={{
          transition: `transform 200ms cubic-bezier(0.18, 1.02, 0.49, 1) ,
         background 500ms cubic-bezier(0.32, 1.39, 0.67, 1)`,
        }}
        className={`sticky top-0 z-[15] flex h-[90px] w-full items-center  justify-between  p-[0px_10px_0px_25px] font-[openSauceReg] text-gray-100 backdrop-blur-lg  
      ${
        open_menu.at
          ? `translate-y-0 bg-gray-200 to-blue-950/60 md:bg-black/80 `
          : scrollingDir
          ? `-translate-y-full`
          : Boolean(offset)
          ? `translate-y-0 bg-black/80 to-blue-950/90  backdrop-opacity-100`
          : `translate-y-0 bg-transparent backdrop-opacity-0`
      }`}
      >
        {/* LOGO */}
        <div
          onClick={() => {
            navigate('/');
          }}
          style={{ transition: `transform 250ms ease` }}
          className={`z-[5px] flex h-full  w-[15%] cursor-pointer items-center justify-start pl-[20px] ${!Boolean(open_menu.at) && scrollingDir ? `translate-y-full` : `translate-y-0`}`}
        >
          <span
            style={{ transition: `transform 250ms ease , opacity 250ms ease` }}
            className={`absolute h-full w-[80px] translate-x-[-5%] bg-blue-900/90 mix-blend-multiply backdrop-blur-md 
          ${!Boolean(open_menu.at) ? (!scrollingDir ? `-translate-y-full opacity-0` : `translate-y-0 opacity-100`) : `-translate-y-full opacity-0`}`}
          />
          <Logo
            Menu={true}
            loading={false}
            scale={scrollingDir ? 1 : 1.1}
            ScrollingDown={!scrollingDir}
            color={{
              main: !isMD ? (Boolean(open_menu.at) ? `black` : 'whitesmoke') : 'whitesmoke',
              colors: !isMD && Boolean(open_menu.at) ? [`black`, `black`, `black`] : ['white', 'blue', 'white'] || ['white', 'blue', 'white'],
            }}
          />
        </div>

        {/* NAV BAR  */}
        <div className={`relative flex h-full w-[80%] items-center justify-between  gap-x-[30px] overflow-hidden  pr-[15px]  md:justify-end  md:gap-1 md:gap-x-[20px]`}>
          {NavData[user_state].map((navSection, navSection_index) => {
            return React.createElement(
              'div', //ELEMENT
              {
                className: `flex  max-w-max min-w-[35%]  justify-end pr-[20px] items-center h-full flex-grow gap-x-[5px]  md:gap-x-[15px] relative w-auto `,
                key: navSection_index + `NavBarSection`,
              },
              (() => {
                //RETURNING THE MEDI ON SM DISPLAY
                if (!isMD && Boolean(navSection_index) && user_state === 'out') {
                  return <Menu open={open_menu} onClick={() => setOpen_menu((c) => !c)} />;
                } else {
                  return navSection.map((ele, index) => {
                    console.log({ index, type: ele.type });
                    const NavComponent = Components[ele.type];
                    return (
                      <>
                        <NavComponent
                          Ele_data={ele}
                          {...dataToComponents}
                          index={index}
                          type={'nav'}
                          onClick={() => {
                            if (ele?.func === 'update') {
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

        {/* MENU OPTION */}
        <div
          //STYLING
          style={{ transitionTimingFunction: transitionTimingFunctions.Elastic_Out_And_Settle }}
          className={`pointer-events-none absolute  left-0 top-full flex h-screen w-screen   items-start justify-end bg-gray-950/80 text-sm text-gray-900 transition-opacity duration-[300ms]  
        ${!Boolean(open_menu.at) ? `opacity-0` : `opacity-100`}`}
        >
          <div
            style={{
              transition: `all 250ms cubic-bezier(0.32, 1.39, 0.67, 1)`,
              right: isMD ? `${open_menu.at && 35 + (100 / 3) * (open_menu.at - 1)}px 0 ` : '0px',
              translate: isMD ? `${open_menu.at && -70 + (100 / 3) * (open_menu.at - 1)}% 0 ` : 0,
            }}
            className={` absolute top-0 flex h-screen min-h-max w-screen items-center gap-x-[15px]   overflow-hidden md:top-[5px] md:h-[262px] md:w-[250px] 
            ${isMD ? `justify-${['start', 'center', 'end'][open_menu.at - 1]}` : `justify-start`}
          `}
          >
            <div
              style={{
                transition: `all 250ms  ease , clip-path 1300ms cubic-bezier(0.32, 1.39, 0.67, 1)`,
                clipPath: isMD ? `` : `circle(${Boolean(open_menu.at) ? `200%` : 0} at 100% -50%)`,
                translate: `${isMD ? 0 : -(100 / 3) * (open_menu.at - 1)}% 0`,
              }}
              className={`pointer-events-auto absolute flex h-screen w-[300%]  items-start justify-end bg-transparent md:h-auto`}
            >
              {[...NavData[user_state][1].filter(({ menu }) => Boolean(menu)).map((sec) => sec.menu)].map(({ title, options }, i) => (
                <div
                  className={`relative  flex  h-full  w-1/3  flex-col items-start justify-start gap-y-[5px] rounded-none md:h-[50%] md:rounded-md 
                  ${['bg-zinc-200', 'bg-slate-200', `bg-gray-200`][i]}`}
                >
                  <strong className={`flex h-[80px] w-full items-center bg-gray-300/40 p-[8px_15px] font-[brandinkLight] text-[25px] md:h-max md:text-lg  `}>{title}</strong>

                  <div className={` my-[5px] flex h-max w-full flex-col  items-start  justify-center gap-y-[10px]   p-[1px_5px] `}>
                    {options.map((items_section) => (
                      <div className={`flex w-full flex-col  gap-y-[2px] `}>
                        {items_section.map((item, itemIndex) => {
                          const ItemComponent = item?.type && Components[item.type];
                          return (
                            <div
                              className={`group/main_container  flex w-full  cursor-pointer items-start justify-start  px-[10px]   md:relative    
                              ${
                                {
                                  text: 'rounded-sm py-[3.5px] hover:bg-gray-300/50',
                                  btn: '',
                                }[item?.type]
                              }`}
                            >
                              <ItemComponent
                                type={'menu'}
                                Ele_data={item}
                                index={itemIndex}
                                isMD={isMD}
                                sectionIndex={i}
                                open_menu={open_menu}
                                box_parameter={[isCreating, set_isCreating]}
                                create_state_param={[isCreatingParams, handleUpdateBoxParams]}
                                getCreatedChannelData={handleGetCreatedChannelData}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* SUCCESS POPOVER  */}
      <SuccessWindowPopover
        isSuccess={created_channel_data.state}
        title={`success`}
        close={() => setCreated_channel_data((c) => ({ ...c, state: false }))}
        message={`channel was created successfully , click below to get started`}
        ProcessIcon={AiOutlineCrown}
        BTN={{ BtnEvents: { onClick: () => navigate(`channel_chat_room/${created_channel_data.data.Name}`) }, btnPlaceholder: `visit channel` }}
      />
    </>
  );
}

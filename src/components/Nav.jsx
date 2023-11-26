import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';

//COMPONENTS
import Logo from '../assets/icons/Logo.jsx';
import Menu from '../assets/icons/menuIcon.jsx';
import { NavData } from '../../data.js';

import { v4 } from 'uuid';
import { useScrollingDirection } from '../hooks/useScrollingDirection.jsx';
import Channel_card from './ChannelCard.jsx';

//ASSETS
import create_tribe from '../assets/img/CreateTribe.png';
import create_community from '../assets/img/CreateCommunity.png';

//ICONS
import { CiSquareInfo, CiSquarePlus, CiSquareRemove } from 'react-icons/ci';
import { IoMdArrowForward } from 'react-icons/io';
//HOOKS
import { useClickAway, useMediaQuery } from '@uidotdev/usehooks';
import { handlePopoverState } from '../utils/handlePopoverState.js';

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
      {Ele_data?.func === 'nav' && (
        <NavLink to={Ele_data.to} className={`pointer-events-auto absolute h-full w-full `} />
      )}

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
        onMouseOver={(e) =>
          (document.getElementById(`navBtnClipPathCircle_${index}`).style.clipPath = `circle(200% at 100% 100%)`)
        }
        onMouseLeave={(e) =>
          (document.getElementById(`navBtnClipPathCircle_${index}`).style.clipPath = `circle(0% at 100% 100%)`)
        }
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
            open_menu.at - 1 === index &&
            [' fill-yellow-500 drop-shadow-[0px_0px_9px_yellow]', 'rotate-[45deg]'][open_menu.at - 1]
          } `}
        />
      </div>
    );
  },

  form: ({ Ele_data, search_state, index, scrollingDir, open_menu, offset }) => (
    <form
      style={{
        transition: `transform  250ms ${index * 50}ms ease`,
      }}
      className={`relative  z-[5] flex  h-full w-[100px] min-w-full items-center justify-end  md:w-[380px] ${
        !!!Boolean(open_menu.at) ? (scrollingDir ? `-translate-y-[50%]` : `translate-y-0`) : `translate-y-0`
      }`}
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
              
              ${
                open_menu.at
                  ? Boolean(offset)
                    ? `text-black `
                    : `text-black md:text-gray-100`
                  : `${!scrollingDir && Boolean(offset) ? `text-black` : `text-gray-100`} `
              }
              ${Boolean(index) ? `hover:text-gray-50 md:scale-0` : `hover:text-gray-50 md:scale-100`}
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

  box: ({ Ele_data, isMD, sectionIndex, open_menu, index, box_parameter }) => {
    const [isCreating, set_isCreating] = box_parameter;

    const selected = isCreating === Ele_data.title;
    const transition = (properties) =>
      Array.isArray(properties) && {
        transition: properties.map(
          (prop) =>
            `${prop.split(' ')[0]} ${prop.split(' ')[2] || 250}ms ${
              prop.split(' ')[1] || `cubic-bezier(0.36, 2.2, 0.66, 1.25)`
            }`
        ),
      };

    const handleOpenChannelCreationPopover = (state) => {
      handlePopoverState(`create_channel_popover_${Ele_data.title}`, state);
      set_isCreating((c) => (c === Ele_data.title ? false : Ele_data.title));
    };
    const handleIfSelected = (isSelected, notSelected, noneSelected, inMD = false) =>
      !inMD && !isMD && Boolean(isCreating) ? (selected ? isSelected || '' : notSelected || '') : noneSelected || '';

    //hiding the popover on page reload
    React.useEffect(() => {
      handlePopoverState(`create_channel_popover_${Ele_data.title}`, false);
      set_isCreating(false);
    }, []);
    //hiding the popover on menu section change
    React.useEffect(() => {
      handlePopoverState(`create_channel_popover_${Ele_data.title}`, false);
      set_isCreating(false);
    }, [open_menu.at]);

    return (
      <>
        <div
          style={{ ...transition(['height']) }}
          className={` m-auto my-[5px] w-[90%]  overflow-hidden md:my-[2px] md:h-[43px]  md:w-full 
          ${handleIfSelected(`flex-center h-[70px]`, `hidden`, `flex-center h-[125px]`)}`}
        >
          <div
            style={{ ...transition(['width']) }}
            className={`relative flex h-full min-w-[200px]   items-center justify-start rounded-md border border-black bg-gray-100 md:w-full 
            ${handleIfSelected(`w-[60%] `, null, `w-[70%] max-w-[360px]`)}`}
          >
            <span
              className={`flex h-full w-[60%] flex-col items-start justify-between  p-[15px_15px]  md:w-full   md:flex-row md:items-center md:p-[5px_10px] `}
            >
              <h2 className={`w-min font-[openSauceReg]  text-[17px] leading-none md:text-sm `}>{Ele_data.title}</h2>

              {/* THE TWO BUTTONS */}
              {Array(isMD ? 1 : 2)
                .fill('')
                .map((_, btn_index) => (
                  <button
                    style={{ ...transition(['opacity', 'left', 'transform ease', 'background linear 100', 'color']) }}
                    onClick={() => {
                      !isMD && !Boolean(btn_index) ? handleOpenChannelCreationPopover(!isCreating) : null;
                    }}
                    className={`flex-center absolute rounded-md  border  border-gray-700/80 pr-[20px] hover:bg-black  hover:text-gray-200 md:bottom-auto md:right-0 md:h-[30px] md:w-[40%] md:border-transparent md:bg-transparent md:hover:bg-transparent md:hover:text-black

                    ${
                      Boolean(btn_index)
                        ? ` ${handleIfSelected(`left-[101%]`, null, `pointer-events-none left-0 opacity-0`)}`
                        : handleIfSelected(`left-0 translate-x-[-105%]`, null, null)
                    }

                    ${handleIfSelected(
                      `bottom-0 h-full w-[20%] min-w-[70px] bg-black text-gray-200`,
                      null,
                      `bottom-[15px] h-[30px] w-[45%]`
                    )}`}
                  >
                    {[
                      handleIfSelected(btn_index ? CiSquarePlus : CiSquareRemove, CiSquarePlus, CiSquarePlus),
                      CiSquareInfo,
                    ].map((Channel_creation_icon, Channel_creation_icon_index) => (
                      <Channel_creation_icon
                        style={{ ...transition(['left', 'transform']) }}
                        onClick={() => {
                          isMD && !Channel_creation_icon_index ? handleOpenChannelCreationPopover(true) : null;
                        }}
                        size={isMD ? 30 : handleIfSelected(32, 27, 27)}
                        className={`absolute md:left-auto   hover:md:scale-[1.1]
                        translate-x-[${Channel_creation_icon_index * 100}%] 
                        ${Boolean(Channel_creation_icon_index) ? (isMD ? `flex` : `hidden`) : 'flex'}
                        ${handleIfSelected(`left-1/2 -translate-x-1/2`, null, `left-0`)}`}
                      />
                    ))}

                    <p className={` text-[13px] md:hidden ${handleIfSelected(`hidden`, '', '')}`}>CREATE</p>
                  </button>
                ))}
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

        {/* POPOVER */}
        <div
          {...(isMD && { popover: 'auto' })}
          id={`create_channel_popover_${Ele_data.title}`}
          style={{
            transition: `transform 250ms cubic-bezier(0.45, 0.05, 0.55, 0.95) , opacity 250ms  cubic-bezier(0.45, 0.05, 0.55, 0.95) `,
            transitionDelay: isCreating ? `250ms` : `0ms`,
          }}
          className={`pointer-events-none rounded-md
          ${
            {
              popover: `m-auto h-[420px] w-[430px] overflow-hidden bg-transparent  backdrop:bg-black/60`,
              element: `flex-center absolute left-0  h-screen w-screen  
                ${handleIfSelected(
                  `transalte-y-0 opacity-100`,
                  `translate-y-full opacity-0`,
                  `translate-y-full opacity-0`
                )}`,
            }[isMD ? `popover` : 'element']
          }`}
        >
          <Channel_card
            Ele_data={Ele_data}
            selected={selected}
            isCreating={isCreating}
            close={() => {
              handleOpenChannelCreationPopover(false);
            }}
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
  const [isCreating, set_isCreating] = React.useState(false);
  //USEHOOKS
  const NavBar = useClickAway(() => {
    setOpen_menu((c) => ({ ...c, at: 0 }));
  });

  //COSTOM HOOKS

  const isMD = useMediaQuery('only screen and (min-width : 768px');
  console.log(isMD);
  const [scrolling] = useScrollingDirection();
  const scrollingDir = scrolling?.dir;
  const offset = scrolling?.offset;

  //VARIABLES
  const user_state = localStorage?.user ? 'in' : 'out';

  //EFFECT
  React.useEffect(() => {
    if (isSearching) {
      setOpen_menu((c) => ({ ...c, at: 0 }));
    }
  }, [isSearching]);

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

  return (
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
      <div
        onClick={() => {
          navigate('/');
        }}
        style={{ transition: `transform 250ms ease` }}
        className={`z-[5px] flex h-full  w-[15%] cursor-pointer items-center justify-start pl-[20px] ${
          !Boolean(open_menu.at) && scrollingDir ? `translate-y-full` : `translate-y-0`
        }`}
      >
        <span
          style={{ transition: `transform 250ms ease , opacity 250ms ease` }}
          className={`absolute h-full w-[80px] translate-x-[-5%] bg-blue-900/90 mix-blend-multiply backdrop-blur-md 
          ${
            !Boolean(open_menu.at)
              ? !scrollingDir
                ? `-translate-y-full opacity-0`
                : `translate-y-0 opacity-100`
              : `-translate-y-full opacity-0`
          }`}
        />
        <Logo
          Menu={true}
          loading={false}
          scale={scrollingDir ? 1 : 1.1}
          ScrollingDown={!scrollingDir}
          color={{
            main: !isMD ? (Boolean(open_menu.at) ? `black` : 'whitesmoke') : 'whitesmoke',
            colors:
              !isMD && Boolean(open_menu.at)
                ? [`black`, `black`, `black`]
                : ['white', 'blue', 'white'] || ['white', 'blue', 'white'],
          }}
        />
      </div>

      <div
        className={`relative flex h-full w-[80%] items-center justify-between  gap-x-[30px] overflow-hidden  pr-[15px]  md:justify-end  md:gap-1 md:gap-x-[20px]`}
      >
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

      <div
        style={{
          transition: `opacity 300ms cubic-bezier(0.32, 1.39, 0.67, 1)`,
        }}
        className={`pointer-events-none absolute  left-0 top-full  flex   h-screen w-screen items-start justify-end bg-gray-950/80 text-sm text-gray-900  
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
            {[...NavData[user_state][1].filter(({ menu }) => Boolean(menu)).map((sec) => sec.menu)].map(
              ({ title, options }, i) => (
                <div
                  className={`relative  flex  h-full  w-1/3  flex-col items-start justify-start gap-y-[5px] rounded-none md:h-[50%] md:rounded-md 
                  ${['bg-zinc-200', 'bg-slate-200', `bg-gray-200`][i]}`}
                >
                  <strong
                    className={`flex h-[80px] w-full items-center bg-gray-300/40 p-[8px_15px] font-[brandinkLight] text-[25px] md:h-max md:text-lg  `}
                  >
                    {title}
                  </strong>

                  <div
                    className={` my-[5px] flex h-max w-full flex-col  items-start  justify-center gap-y-[10px]   p-[1px_5px] `}
                  >
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
                              />
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

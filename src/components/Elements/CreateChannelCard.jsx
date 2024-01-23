import React, {useImperativeHandle} from 'react';
import DOMPurify from 'dompurify';

import {channel_parameter, transitionTimingFunctions} from '../../../data.js';
import {AnimatedCounter} from 'react-animated-counter';
import {useNavigate} from 'react-router-dom';
import {useInView} from 'react-intersection-observer';

//ICONS
import {VscDiffAdded} from 'react-icons/vsc';
import {CiSquareAlert, CiSquareCheck, CiSquareRemove} from 'react-icons/ci';
import {RotateSpinner, StageSpinner} from 'react-spinners-kit';
import {IoIosArrowDropright, IoIosArrowDropup, IoIosArrowRoundForward, IoIosCheckmarkCircle, IoIosRemoveCircleOutline} from 'react-icons/io';
import {BsStars} from 'react-icons/bs';
import {TbSquareRoundedCheck, TbSquareRoundedX} from 'react-icons/tb';
import {FiPlay} from 'react-icons/fi';

//API
import {usePhotosSearchGetQuery, useCreateChannelMutation} from '../../redux/API.js';

//UTILITIES
import {handlePopoverState} from '../../utils/handlePopoverState';

//ASSETS
import Logo from '../../assets/icons/Logo.jsx';
import PixabyLogo from '../../assets/icons/Pixabay_icon.png';
import ChannelQuotaAlert from '../Popovers/ChannelQuotaAlert.jsx';

//COMPONENTS
const channel_parameter_component = {
  input: React.memo(({param, param_index, reducer, validation}) => {
    const handleInputEvents = React.useCallback(
      (value) =>
        reducer.channel_parameters_dispatcher({
          type: value ? `UPDATE` : `VALIDATE`,
          payload: (() => {
            const payload_obj = {name: param.name};
            if (value) payload_obj.value = DOMPurify.sanitize(value);
            return payload_obj;
          })(),
        }),
      []
    );

    //VARIABLES
    const isValidating = validation.formValidationState.validating && validation.formValidationState.name === param.name;

    //VARIABLES
    const input_type = param.type.split(' ')[param.type.split(' ').length - 1];

    return (
      <div className={`group relative  flex h-max w-full items-end justify-start py-[5px] pt-[18px]`}>
        {/* INPUT */}
        {React.createElement(
          input_type,
          {
            //ID
            id: `channel_create_parameter_${param.name}`,

            //HADLNERS
            onInput: ({target}) => handleInputEvents(target.value),
            onBlur: () => handleInputEvents(),

            //COSTUME PROP
            ...{
              textarea: {maxLength: 500},
              input: {maxLength: 30},
            }[input_type],

            //STYLING
            style: {
              transition: `background 600ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
              backgroundSize: `2000%`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: `${'isValid' in param.validator && param.value ? (param.validator.isValid ? 50 : 0) : 100}% 0%`,
            },
            className: `w-full  bg-gradient-to-l from-gray-100 via-green-50  to-red-100 outline-none font-[openSauceReg] leading-[15px] border border-black/20 pl-[8px] rounded-md  
            ${
              {
                input: `h-[40px]`,
                textarea: `h-[200px]  pt-[8px] resize-none scroller-rounded `,
              }[input_type]
            }
          `,
          },
          null
        )}

        {/* PLACEHOLDER  */}
        <div className={`pointer-events-none absolute top-0 flex h-full  translate-x-[8px]    items-start justify-start  `}>
          <p
            style={{
              transition: `transform 50ms linear `,
              ...{
                input: {},
                textarea: {
                  backgroundSize: `1500%`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: `${((500 * param.value.length) / 1500) % 1500}% 0%`,
                },
              }[input_type],
            }}
            className={`   
            ${
              {
                input: `text-gray-400`,
                textarea: `bg-gradient-to-l from-green-500 from-[45%] via-yellow-400 via-[50%] to-gray-400 to-[60%] bg-clip-text text-transparent`,
              }[input_type]
            }
            ${param.value ? `translate-y-0 text-[12px] ` : `group-focus-within:translate-y-0:text-[12px] translate-y-[140%] text-[13px] group-focus-within:translate-y-0 group-focus-within:text-[12px]`}`}>
            {param.placeholder}
          </p>
        </div>

        <span
          //STYLING
          style={{transition: `width 250ms ease`}}
          className={`absolute right-0 flex  items-start justify-center overflow-hidden  p-[2px]  
            ${
              {
                input: `h-[40px]  w-[35px]`,
                textarea: `m-[10px]  h-[25px]  rounded-sm
                ${param.value.length > 1 ? `w-[100px] outline outline-[.1px]  outline-black/50` : `w-[35px]`}`,
              }[input_type]
            }`}>
          {/* VALIDATION STATE ICONS */}
          <span
            //STYLING
            style={{transition: `transform 250ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`}}
            className={`absolute left-0 top-0 flex h-[200%] w-[35px] flex-col items-start justify-start pr-[5px] 
            ${Boolean(param.value) ? `opacity-100` : `opacity-0`}
            ${!isValidating && !param.validator?.isValid ? `-translate-y-1/2` : `translate-y-0`}`}>
            {
              {
                validating: (
                  <div className={`flex-center h-1/2 `}>
                    <RotateSpinner color={`#000000`} size={17} />
                  </div>
                ),
                validated: [
                  {ICON: CiSquareCheck, id: `validation_state_valid`},
                  {ICON: CiSquareAlert, id: `validation_state_invalid`},
                ].map(({ICON, id}) => (
                  <div
                    //ID
                    key={id}
                    //STYLING
                    style={{transition: `transform 250ms ease`}}
                    className={`flex-center relative h-1/2 w-full 
                ${
                  {
                    textarea: param.value.length > 1 ? `scale-[.9]` : `scale-100`,
                  }[input_type]
                }`}>
                    <ICON className={``} size={25} />
                  </div>
                )),
              }[isValidating ? `validating` : `validated`]
            }
          </span>

          {/* DYNAMIC ELEMENT COMPONENTS  */}
          {
            {
              textarea: (
                <span
                  style={{
                    transitionProperty: `transform , opacity`,
                    transitionDuration: '250ms , 150ms',
                    transitionTimingFunction: `cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
                    transitionDelay: param.value.length > 1 ? '250ms' : '0ms',
                  }}
                  className={`flex-center absolute right-0 top-0 h-full  w-max min-w-[70px] font-[openSauce] text-[12px] text-gray-900
                  ${param.value.length > 1 ? 'translate-y-0 opacity-100' : `translate-y-full opacity-0`}`}>
                  <small>{param.value.length}/300</small>
                </span>
              ),
            }[input_type]
          }
        </span>
      </div>
    );
  }),

  list: React.memo(({param, param_index, reducer, validation}) => {
    const [list_selected, setList_selected] = React.useState(false);
    const [options_list, setOptions_list] = React.useState([]);
    //HANDLERS
    const options_list_handler = () => {
      if (param.options instanceof Function && param.options() instanceof Promise) {
        param
          .options()
          .then((res) => setOptions_list(res))
          .catch(({message: error}) => console.log({error}));
      } else {
        setOptions_list(param.options);
      }
    };
    //EFFECT
    React.useEffect(() => options_list_handler(), []);

    return (
      <div
        style={{transition: `height 250ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`}}
        className={`relative m-[5px_3px] flex  w-full flex-grow  items-start justify-start overflow-hidden rounded-md bg-white px-[15px] font-[openSauceReg] text-[13.5] shadow-[0_1px_11px_-5px_gray] 
        ${list_selected ? `h-[220px]` : `h-[60px]`}
        `}>
        {/* MAIN CONTENT */}
        <div className={`relative z-[1] flex h-full  w-full flex-col items-start justify-between px-[5px]`}>
          {/* TEXT */}
          <div onClick={() => setList_selected((c) => !c)} className={`absolute top-0 flex h-[60px] w-full items-center justify-between pr-[12px]  `}>
            <h2>{param?.placeholder}</h2>
            <span className='flex-center'>
              <IoIosArrowDropright
                size={21}
                style={{
                  transition: `transform 250ms  linear , opacity 250ms ${list_selected ? 250 : 0}ms ease`,
                }}
                className={`absolute ${list_selected ? `rotate-[90deg] opacity-0` : `rotate-0 opacity-100`}`}
              />
              <IoIosRemoveCircleOutline size={21} style={{transition: `opacity 250ms ${list_selected ? 250 : 0}ms linear`}} className={`absolute  ${list_selected ? `opacity-100` : `opacity-0`}`} />
            </span>
          </div>

          {/* OPTIONS LOOPING */}
          <div className={`scroller-rounded absolute left-0 top-[62px] flex h-[140px]  w-full min-w-[60px] flex-wrap items-start justify-between gap-[4px] rounded-md  p-[7px] outline outline-[.5px] outline-gray-400`}>
            {(Array.isArray(options_list) ? options_list : []).map((option) => (
              <span
                onClick={() => {
                  reducer.channel_parameters_dispatcher({type: 'UPDATE', payload: {option, name: param.name}});
                  reducer.channel_parameters_dispatcher({
                    type: 'VALIDATE',
                    payload: {value: param.value, name: param.name},
                  });
                }}
                className={`flex-center-between relative h-[25px] min-w-[60px] flex-grow overflow-hidden rounded-full border border-gray-300 pl-[3px] pr-[8px]`}>
                {option ? (
                  <>
                    <div className={`relative aspect-square w-[18px] rounded-full border border-gray-500`}>
                      <div
                        style={{
                          clipPath: `circle(${param.value.includes(option?.title || option) ? 100 : 0}% at center)`,
                          transition: `clip-path 250ms cubic-bezier(0.68, -0.55, 0.27, 1.55) `,
                        }}
                        className={`flex-center h-full w-full rounded-full`}>
                        <IoIosCheckmarkCircle size={16} />
                      </div>
                    </div>
                    <small>{option?.title || option}</small>
                  </>
                ) : (
                  <span className={`stretch loading_screen left-0 bg-gradient-to-l from-gray-200  via-gray-100 to-slate-300 `} />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* BACKDROP */}

        <div
          style={{
            transform: `scaleX(${Math.max((1 / param?.validator.limit.min) * param.value?.length, 1)})`,
            backgroundPosition: `${Math.min((100 / param.validator.limit.min) * param.value?.length, 100)}% 0`,
            backgroundSize: `3000%`,
            transition: `all 200ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
          }}
          className={`absolute left-0 h-full w-full origin-left bg-gradient-to-r from-gray-100  via-red-300 via-30% to-green-300  ${list_selected ? `opacity-20` : `opacity-50`}`}
        />
      </div>
    );
  }),

  boolean: React.memo(({param, param_index, reducer, validation}) => (
    <div onClick={() => reducer.channel_parameters_dispatcher({type: 'UPDATE', payload: {value: !param.value, name: param.name}})} className={`outline-offset-3 relative m-[5px_5px] flex h-[50px] w-[45%] flex-grow     items-center justify-between overflow-hidden rounded-md bg-gray-100 p-[5px] text-[13px] shadow-[0_1px_10px_-5px_gray] outline outline-[.5px] outline-gray-400/10`}>
      <div className={`z-[1] flex h-[20%] w-full items-center justify-between px-[8px] `}>
        <p className={` text-gray-600`}>{param.placeholder}</p>
        <span className={`flex-center h-full w-max `}>
          <TbSquareRoundedCheck
            style={{
              transitionDuration: `250ms`,
              transitionTimingFunction: `cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
              transitionProperty: `transform`,
            }}
            size={22}
            className={`absolute right-[8px] ${param.value ? `scale-100` : `scale-0`}`}
          />
          <TbSquareRoundedX
            style={{
              transitionDuration: `250ms`,
              transitionTimingFunction: `cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
              transitionProperty: `transform`,
            }}
            size={22}
            className={`absolute right-[8px] ${param.value ? `scale-0` : `scale-100`}`}
          />
        </span>
      </div>
    </div>
  )),

  box: React.memo(({param, param_index, reducer, validation}) => {
    //box states
    const [goal, setGoal] = React.useState(0);
    return (
      <div className={`flex-center m-auto h-[120px] w-full`}>
        <div
          //STYLING
          style={{transition: `transform 250ms ease`}}
          className={`flex h-full w-full select-none  justify-around   overflow-hidden rounded-md  bg-gradient-to-l from-gray-950 to-purple-800 font-[openSauce] shadow-[0_0_55px_-30px_blue]  `}>
          <span className={`flex-center relative h-full w-[50%] `}>
            <BsStars size={120} className={`text-gray-50 drop-shadow-[0_0_40px_purple]`} />
          </span>

          <span className={` relative flex h-full w-[50%] flex-col items-center justify-start text-black `}>
            <div className={`flex-center  m-0 h-full w-full rotate-0 p-0 leading-none`}>
              <p>
                <AnimatedCounter value={goal} fontSize={40} decimalPrecision={false} color={`#ffffff`} />
              </p>
            </div>
            <small className={`absolute bottom-3 h-[25%] font-[openSauceReg] text-gray-200`}>{param.placeholder}</small>

            <div className={`absolute flex h-full w-full flex-col-reverse items-center justify-between  `}>
              {Array(2)
                .fill('')
                .map((_, i) => (
                  <div
                    onClick={() => {
                      const GoalPromise = new Promise((res, rej) => {
                        let old_goal = goal;
                        setGoal((c) => [() => Boolean(c) && c - 10, () => c + 10][i]());
                        if (goal != old_goal) res(goal);
                        else return;
                      }).then((goal_value) =>
                        reducer.channel_parameters_dispatcher({
                          type: 'UPDATE',
                          payload: {value: goal || 0, name: param.name},
                        })
                      );
                    }}
                    className={`group relative flex h-[40%] w-full justify-center py-[8px] ${[`items-end `, `items-start `][i]}`}>
                    <div
                      style={{transition: `all 500ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`}}
                      className={`absolute aspect-square w-[10px] border-[1px]   border-transparent    
                      ${[` border-t-gray-50 group-hover:rotate-[135deg] group-hover:border-r-gray-50`, ` border-b-gray-50 group-hover:rotate-[135deg] group-hover:border-l-gray-50`][i]}`}
                    />
                  </div>
                ))}
            </div>
          </span>
        </div>
      </div>
    );
  }),
};

// MEDIA COVER VIDEO COPONENT
const MediaCover = React.memo(({AddingCoverState, handleCoverUpdate, media_result_parameters, cover_state, media_containerRef, LoadingBG}) => {
  const navigate = useNavigate();
  const [media_result, setMedia_results] = React.useState({hits: [], total: 0});
  const {isAddingCover, setIsAddingCover} = AddingCoverState;

  //API
  const {data: media, isLoading, refetch: refetch_media, error, isSuccess} = usePhotosSearchGetQuery(media_result_parameters);

  //EFFECT
  React.useEffect(() => {
    (async () => {
      const media_response = await refetch_media(media_result_parameters);
      //#ERR
      if (!isSuccess) return;
      //STATE UPDATE
      const {hits = Array(media_result_parameters.per_page).fill(false), totalHits} = media_response.data || {};
      setMedia_results((c) => ({hits, totalHits}));
    })(); //STATE UPDATE
  }, [media_result_parameters]);


  const handleMediaPlayState = (target, state, media_index) => {
    const play_icon = document.getElementById(`play_icon_${media_index}`);

    if (!target?.play || !target?.pause || !play_icon) return;

    play_icon.classList.toggle(`hidden`, state);
    target[state ? `play` : 'pause']();
  };

  const LoadingComponent = () => <div className={`flex-center loading_screen absolute h-full w-full border ${LoadingBG}`} />;

  const Cover_Component = ({media_asset, media_index}) => {
    //REF IN VIEW
    const [vid_ref, vid_refInView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <div ref={vid_ref} className={` flex-center group  h-full  w-full`}>
        {vid_refInView && media_asset ? (
          <video
            loading={'lazy'}
            //HANDLE VIDEO STATE
            onMouseDown={({target}) => handleMediaPlayState(target, true, media_index)}
            onTouchStart={({target}) => handleMediaPlayState(target, true, media_index)}
            onMouseUp={({target}) => handleMediaPlayState(target, false, media_index)}
            onTouchEnd={({target}) => handleMediaPlayState(target, false, media_index)}
            //HIDE THE SKELETON LOADER
            onLoadedData={() => {
              const video_loading_skeleton = document.getElementById(`video_loading_skeleton_${media_index}`);
              if (!video_loading_skeleton) return;
              video_loading_skeleton.classList.add('hidden');
            }}
            //STYLING
            className={` absolute h-full w-full overflow-hidden rounded-[10px] object-cover ${LoadingBG}`}>
            <source src={vid_refInView && media_asset?.videos?.small.url} />
          </video>
        ) : (
          <span id={`video_loading_skeleton_${media_index}`} className={`absolute z-[2] h-full w-full`}>
            <LoadingComponent />
          </span>
        )}

        {/* PLAY ICON */}
        <FiPlay size={22} id={`play_icon_${media_index}`} className={`scale-0 text-gray-100 opacity-0 transition-[transform_opacity] group-hover:scale-100 group-hover:opacity-100  `} />

        {/* INFO TAB */}
        <span style={{transition: `opacity 250ms ease`}} className={`flex-center-around absolute right-0 top-0 z-[1] m-[5px] h-[20%] w-[65%] rounded-md bg-slate-300/90 px-[5px] opacity-100  group-hover:opacity-40 `}>
          <img src={media_asset?.userImageURL} alt={`photographer_avatar`} className={`aspect-square w-[20px] rounded-full`} />
          <h2 className={`w-[60%] truncate  font-[openSauce] text-[11px]`}>{media_asset?.user}</h2>
        </span>
      </div>
    );
  };

  //HANDLING ERRORS
  if (error) {
    console.log(error);
    return <div className={`absolute h-full w-full bg-red-500`}>an error occured {error?.message}</div>;
  }
  return (
    <div className={`flex h-full w-full flex-col items-start justify-between`}>
      <div
        //ID
        ref={media_containerRef}
        //EVENTS
        onScroll={({target}) => {
          if (!media_containerRef?.current) return;
          if (target.scrollTop + target.clientHeight === target.scrollHeight && media_result.hits.length < media_result.total) media_containerRef?.current.viewMore();
        }}
        //STYLING
        className={`scroller-rounded  flex  h-[90%] flex-wrap content-start justify-center gap-[11px] overflow-scroll overflow-x-hidden p-[5px] `}>
        {[...(Array.isArray(media_result.hits) ? media_result.hits : [])].map((media_asset, media_index) => {
          return (
            <span
              onClick={() => {
                handleCoverUpdate({
                  src: media_asset?.videos?.small?.url,
                  user: media_asset?.user,
                  user_avatar: media_asset?.userImageURL,
                });
                setIsAddingCover(false);
              }}
              style={{transition: `all 250ms ${media_index * 200}ms ease`}}
              className={` relative h-[145px] w-[32%] min-w-[110px] flex-grow overflow-hidden rounded-[10px] shadow-[0_0_15px_-15px_gray] outline-[.5px]  outline-offset-1 outline-gray-900/50
              
              ${isAddingCover ? `translate-y-0 opacity-100` : `translate-y-1/2 opacity-0`}`}>
              {React.createElement(media_asset ? Cover_Component : LoadingComponent, {media_asset, media_index}, null)}
            </span>
          );
        })}
      </div>
      <div className={`jusitfy-start flex h-[10%] w-[96%] items-center rounded-[10px]  `}>
        <p>image from Pixaby </p>
      </div>
    </div>
  );
});

const Popovers = {
  ChannelQuotaAlert: (channels) => <ChannelQuotaAlert channels={channels} />,
};

export default React.forwardRef(function ChannelCard({Ele_data, close, getCreatedChannelData, CreateChannelBoxHandlers: {handleUpdateLoadingState}}, ref) {
  //STATE
  const [media_result_parameters, setMedia_result_parameters] = React.useState({
    param: ``,
    page: '1',
    per_page: 10,
  });
  const [formValidationState, setFormValidationState] = React.useState({valid: false, validating: false, name: null});
  const [Error, setError] = React.useState({severity: 500, message: ``});
  const [channels, setChannels] = React.useState(``);
  const [isAddingCover, setIsAddingCover] = React.useState(false);
  const [cover_src, setCover_src] = React.useState(``);
  const [cover_state, setCover_state] = React.useState({
    src: '',
    user: '',
    user_avatar: '',
    isLoading: false,
  });

  //API
  const [create_channel, {isLoading: creating_channel, error: channel_error, data: create_channel_res}] = useCreateChannelMutation();

  //REDUCER
  const channel_creation_reducer = (state, action) => {
    try {
      switch (action.type) {
        case 'UPDATE':
          return state.map((sec) => {
            return sec.map((parameter) => {
              if (parameter.type.split(' ')[0].includes('list')) {
                if (parameter.name === action.payload.name) {
                  try {
                    // HANDLING ERRORS
                    if (!Boolean(parameter.value instanceof Array)) {
                      throw new Error(`value is not an array `);
                    }
                    if (!Boolean(action.payload.option)) {
                      throw new Error(`please provide an option in the payload object `);
                    }

                    //MANAGING VALUE ARRAY
                    const reached_limit = parameter.validator.limit.max === parameter.value.length;
                    let new_value;

                    const update = (new_val) => ({
                      ...parameter,
                      value: (() => {
                        if (reached_limit) {
                          setError((c) => ({severity: 500, message: `you can only select ${parameter.validator.limit.max} option`}));
                          return new_val.slice(1, new_val.length);
                        }
                        setError((c) => ({severity: 500, message: ``}));
                        return new_val;
                      })(),
                    });

                    const {option} = action.payload;
                    const deselect = parameter.value.includes(option);

                    if (!deselect) {
                      new_value = update([...parameter.value, option]);
                    } else {
                      new_value = update(parameter.value.filter((item) => item !== option));
                    }

                    return new_value;
                  } catch ({message: error}) {
                    console.log({error});
                    return parameter;
                  }
                }
                return parameter;
              }
              if (parameter.name === action.payload.name) {
                return {...parameter, value: action.payload.value};
              }
              return parameter;
            });
          });

        case 'VALIDATE':
          try {
            return state.map((sec) =>
              sec.map((parameter_obj) => {
                if (parameter_obj.name === action.payload.name) {
                  //HANDLE LOADING STATE
                  setFormValidationState((c) => ({...c, name: action.payload.name, validating: true}));

                  //BINDING TO MAIN PARAM OBJECT
                  const bind = parameter_obj.validator.validate.bind(parameter_obj);

                  //VALIDATING PARAM
                  if (parameter_obj.validator.async && bind() instanceof Promise) {
                    bind()
                      .then((res) => {
                        parameter_obj.validator.isValid = res;
                        setError((c) => ({severity: 500, message: !res ? parameter_obj.validator.error_message : false}));
                      })
                      .catch((err) => console.log(err))
                      .finally(() => setFormValidationState((c) => ({...c, name: null, validating: false})));
                  } else {
                    parameter_obj.validator.isValid = bind();
                    setError((c) => ({severity: 500, message: !bind() ? parameter_obj.validator.error_message : false}));
                    setFormValidationState((c) => ({...c, name: null, validating: false}));
                  }
                  return parameter_obj;
                }
                return parameter_obj;
              })
            );
          } catch ({message: error}) {
            console.log({error});
            return state;
          }
        default:
          console.log(action.type);
          return state;
      }
    } catch ({message: error}) {
      console.log({error});
    }
  };
  const [channel_parameters_state, channel_parameters_dispatcher] = React.useReducer(channel_creation_reducer, channel_parameter);

  //REF
  const media_containerRef = React.useRef(null);
  React.useImperativeHandle(media_containerRef, () => ({
    viewMore: () => setMedia_result_parameters((c) => ({...c, per_page: c.per_page + 10})),
  }));

  //VARIABLES
  const LoadingBG = `bg-gradient-to-l from-gray-100 via-zinc-200 to-slate-300 loading_screen`;
  const channel_type = ((type) => type.replace(type[0], type[0].toUpperCase()))(Ele_data.title.match(/(community|tribe)/g)[0]);
  const isReady = () => channel_parameters_state.flat().map((param) => Boolean(!param?.validator || ('isValid' in param.validator && param.validator.isValid)));

  // EFFECT
  React.useEffect(() => {
    /* EDITING THE PLACEHOLDER FOR THE COVER SEARCH */
    const Name_input_value = channel_parameters_state.map((sec) => sec.filter((x) => x.name === 'Name'))[0].value;
    if (!Name_input_value) return;
    media_result_parameters((c) => ({...c, param: Name_input_value}));
  }, [isAddingCover]);

  React.useEffect(() => {
    //OBSERVING COVER_STATE CHANGE
    if (Boolean(cover_state.src)) setCover_src(cover_state.src);
  }, [cover_state]);

  React.useEffect(() => {
    //handle ready state for channel creation
    if (!ref || !ref?.current) console.log('ref is undefined');
    ref.current = {
      handleSubmit,
    };
  }, [ref, creating_channel]);

  React.useEffect(() => {
    //updating the create channel loading state
    handleUpdateLoadingState(creating_channel);
  }, [creating_channel]);

  //HANDLERS
  const render_params = (type, param, param_index) => {
    const ParamComponent = channel_parameter_component[type.split(' ')[0]];
    return <ParamComponent param={param} param_index={param_index} validation={{formValidationState, setFormValidationState}} reducer={{channel_parameters_state, channel_parameters_dispatcher}} />;
  };
  const handleCoverUpdate = (cover) => setCover_state((prev) => ({...prev, ...cover}));
  const handleSubmit = () => {
    if (isReady().every(Boolean)) {
      //#ERR
      if (formValidationState.validating || cover_state.isLoading) return setError((c) => ({severity: 200, message: `still loading`}));
      if (!Boolean(cover_src)) return setError((c) => ({severity: 500, message: `select a cover `}));

      //API PARAMS
      const channel_params = channel_parameters_state.flat().reduce(
        (params_obj, param) => {
          params_obj[param.name] = param.value;
          return params_obj;
        },
        {
          Admin: localStorage?.user && JSON.parse(localStorage.user)?._id,
          Cover: cover_state.src,
          Type: channel_type,
        }
      );

      //API
      const create_channel_res = create_channel(channel_params);
      /* ERR */
      const handleResponse = function (res) {
          if (res.error) {
            //#DEST
            const {channels} = res.error.data;
            setChannels(channels);
            handlePopoverState(`channels_quota_alert_popover`, true);

            console.log(channels);

            /* ERR */
            const error_index = isReady().findIndex((i) => !Boolean(i));
            const {error_message} = channel_parameters_state.flat()[error_index].validator;
            throw new Error(error_message);

            return;
          } else {
            const {created_channel} = res.data;
            console.log(res);
            if (!created_channel) return console.log({error: `not created channel data`});
            getCreatedChannelData(res.data.created_channel);
          }
        },
        handleError = ({message: error}) => {
          console.log({error});
        };

      create_channel_res.then(handleResponse).catch(handleError);
    }
  };

  //COMPONENT
  const ChannelCreationFormError = () => (
    <div
      style={{transitionTimingFunction: transitionTimingFunctions}}
      className={`absolute top-0  h-[49%] w-full items-center justify-start overflow-hidden rounded-md border border-gray-400  px-[8px] font-[openSauceReg] text-[12.2px] md:my-[7px] md:h-[40%] 
      ${isAddingCover ? `hidden` : `flex`} bg-red-${Error.severity} `}>
      <p>{Error.message}</p>
      <CiSquareAlert size={20} className={`absolute right-[5px]  text-red-500 opacity-50`} />
      <IoIosArrowDropup onClick={() => setError((c) => ({severity: 500, message: false}))} size={20} className={`absolute right-12 text-gray-800 hover:text-red-500 `} />
    </div>
  );

  //<---------------MAIN JSX ---------------->
  return (
    <div className={` pointer-events-auto absolute  top-[80px] flex h-[52%] w-[77%]  max-w-[570px] flex-col items-start justify-between overflow-auto  overflow-x-hidden  rounded-md bg-gray-100 p-[4px] outline outline-[.8px] outline-offset-1  outline-black md:top-auto md:h-full md:w-full md:translate-y-0`}>
      {/* POPOVER  */}
      <Popovers.ChannelQuotaAlert channels={channels} />

      {/* ADD COVER _ ERROR + NAV FOR MD */}
      <div className={`relative  flex w-full ${isAddingCover ? `h-[12%] ` : `h-[22%]`} `}>
        {/* MEDIA WRAPPER */}
        <span className={` relative flex h-full w-full flex-col  justify-end md:w-[87%]  `}>
          {/* ERROR */}
          <ChannelCreationFormError />
          {/* COVER  */}
          <div
            //STYLING
            style={{
              transitionProperty: `background , height`,
              transitionDuration: '250ms , 250ms',
              transitionTimingFunction: `linear`,
            }}
            className={` relative flex w-full  overflow-hidden   rounded-md  border border-black/50  bg-gradient-to-tl from-slate-200 to-gray-200 px-[10px] hover:bg-red-500  md:my-[2px]
            ${isAddingCover ? `h-full ` : Error.message ? `h-[49%] ` : `h-full `}`}>
            <div className={`absolute left-0 flex h-[200%] w-full flex-col justify-start`}>
              {/* START ADDING COVER AND COVER DISPLAY SECTION */}
              <div
                onClick={() => setIsAddingCover((c) => !c)}
                className={`flex-center group h-1/2 w-full gap-x-[8px] text-[13px] 
                ${isAddingCover ? `-translate-y-full` : `translate-y-0`}`}>
                {/* ADD ICON */}
                <div
                  className={`stretch flex-center transition-opacity
                  ${cover_state ? `z-[5] bg-black/50 text-white opacity-0 group-hover:opacity-100` : `bg-transparent `}
              `}>
                  <VscDiffAdded size={22} />
                </div>

                {/* COVER OR ADD TEXT */}
                {!Boolean(cover_state.src) && <p>select a cover</p>}
                {Boolean(cover_state.src) && (
                  <>
                    <span
                      style={{transition: `transform 250ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`}}
                      id={`video_cover_loading_screen_display`}
                      className={` flex-center absolute  right-0 z-[5]  w-[150px] 
                      ${!Error.message && `bottom-0`}
                      ${cover_state.isLoading ? `stretch loading-screen bg-gradient-to-tl from-gray-800 to-black` : `h-1/2`}`}>
                      <Logo loading={cover_state.isLoading} scale={!Error.message ? (cover_state.isLoading ? 1 : '.6') : `.5`} />
                      <img id={`PixabyLogoCoverDisplayImage`} src={PixabyLogo} className={`h-[28px] w-auto ${cover_state.isLoading && `hidden`}`} />
                    </span>
                    <video key={cover_state.src} onLoadStart={() => setCover_state((c) => ({...c, isLoading: true}))} onLoadedData={() => setCover_state((c) => ({...c, isLoading: false}))} className={`stretch `}>
                      <source src={cover_state.src} />
                    </video>
                    <span
                      className={`absolute bottom-0 left-0 z-[2] flex  w-full justify-start gap-x-[12px] bg-gradient-to-t from-black via-black/50 to-transparent px-[12px]  
                    ${cover_state.isLoading && `opacity-0`} ${Error.message ? `h-full items-center` : `h-[95%] items-end pb-[8px]`}`}>
                      <img className={`aspect-square rounded-full outline outline-[.5px] outline-offset-2 outline-gray-200 ${Error.message ? `w-[20px]` : `w-[30px]`}`} src={cover_state.user_avatar} />
                      <h2 className={`flex w-[70%] items-center justify-start truncate text-start font-[openSauce] text-[22px] text-gray-200`}>{cover_state.user}</h2>
                    </span>
                  </>
                )}
              </div>

              {/* SEARCH FUNCTIONALITY  */}
              <div className={`flex-center-around h-1/2 w-full gap-x-[8px] bg-gray-50 p-[5px] ${isAddingCover ? `-translate-y-full` : `translate-y-0`}`}>
                {/* SEARCH FORM */}
                <form
                  //HANDLERS
                  onSubmit={(e) => {
                    e.preventDefault();
                    setMedia_result_parameters((c) => ({
                      ...c,
                      param: DOMPurify.sanitize(e.target.media_cover_search_input.value),
                    }));
                  }}
                  className={`flex-center relative h-full w-full gap-x-[8px] overflow-hidden  shadow-[0_0_15px_-14px_black]`}>
                  <input
                    //STYLING
                    style={{
                      transitionProperty: `transform , opacity`,
                      transitionDuration: `350ms , 250ms`,
                      transitionDelay: `0ms , 0ms`,
                      transitionTimingFunction: `cubic-bezier(0.175, 0.885, 0.32, 1.275) , linear`,
                    }}
                    placeholder={channel_parameters_state[0][0]?.value || media_result_parameters.param || 'search for videos'}
                    name={`media_cover_search_input`}
                    className={` h-full w-[45%]  bg-gray-200 px-[5px] font-[openSauceReg] text-[14px] outline-none
                  
                  ${isAddingCover ? `-translate-y-0 opacity-100` : `translate-y-[150%] opacity-0`}`}
                  />
                  {/* BUTTON CONTAINER */}
                  <span
                    //STYLING
                    className={`flex-center-around h-full flex-grow gap-x-[5px] overflow-hidden`}>
                    <button
                      //STYLING
                      style={{
                        transitionProperty: `transform , opacity`,
                        transitionDuration: `350ms , 250ms`,
                        transitionDelay: `460ms , 460ms`,
                        transitionTimingFunction: `cubic-bezier(0.175, 0.885, 0.32, 1.275) , linear`,
                      }}
                      className={`flex-center h-full flex-grow rounded-md border  border-transparent bg-black p-[2px] font-[openSauceReg] text-[1em]  text-gray-100 transition-[background_color_border] duration-[100ms] hover:border-black hover:bg-gray-200 hover:text-black
                  ${isAddingCover ? `-translate-y-0 opacity-100` : `translate-y-[150%] opacity-0`} `}>
                      search
                    </button>
                    <button
                      //EVENTS
                      onClick={() => setIsAddingCover(false)}
                      //STYLING
                      style={{
                        transitionProperty: `transform , opacity`,
                        transitionDuration: `350ms , 250ms`,
                        transitionDelay: `350ms , 350ms`,
                        transitionTimingFunction: `cubic-bezier(0.175, 0.885, 0.32, 1.275) , linear`,
                      }}
                      className={`flex-center h-full flex-grow rounded-md border  border-transparent bg-black p-[2px] font-[openSauceReg] text-[1em]  text-gray-100 transition-[background_color_border] duration-[100ms] hover:border-black hover:bg-gray-200 hover:text-black
                  ${isAddingCover ? `-translate-y-0 opacity-100` : `translate-y-[150%] opacity-0`} `}>
                      back
                    </button>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </span>

        {/* MD DISPLAY REMOVE SUBMIT BUTTONS  */}
        <span
          className={`m-auto hidden h-full w-[10%]  items-center justify-between py-[5px] md:flex 
          ${!isAddingCover && `flex-col`}`}>
          {[
            {
              key: React.useId(),
              Icon: CiSquareRemove,
              hover: `group-hover:rotate-90 transition-[transform]`,
              Events: {onClick: close},
            },
            {
              key: React.useId(),
              Icon: creating_channel ? RotateSpinner : IoIosArrowRoundForward,
              hover: `group-hover:scale-x-[1.1] group-hover:translate-x-[3px] transition-[transform]`,
              Events: {onClick: () => handleSubmit()},
            },
          ].map(({Events, Icon, key, hover}, index) => (
            <div
              {...Events}
              key={key}
              style={{transitionTimingFunction: transitionTimingFunctions.Quick_Bounce}}
              className={`flex-center group h-[48%] w-full rounded-md border 
              ${isAddingCover ? `border-transparent` : `border-gray-400`}`}>
              <Icon {...(creating_channel ? {size: Boolean(index) ? 20 : 25, color: `#000000`} : {size: 25})} className={hover} />
            </div>
          ))}
        </span>
      </div>

      {/* MEDIA COVER */}
      <div
        style={{
          transition: `all 250ms ease`,
          clipPath: `circle(${isAddingCover ? 200 : 0}% at 100% 0%)`,
          opacity: isAddingCover ? 1 : 0,
        }}
        className={`overfow-hidden absolute  bottom-0 left-0 z-[5] m-auto  h-[85%] w-[100%]  rounded-md bg-gradient-to-tl  from-slate-300 to-gray-200`}>
        <MediaCover
          AddingCoverState={{isAddingCover, setIsAddingCover}}
          media_result_parameters={media_result_parameters}
          cover_state={{setCover_state, cover_state}}
          media_containerRef={media_containerRef}
          LoadingBG={LoadingBG}
          //HANLDER
          handleCoverUpdate={handleCoverUpdate}
        />
      </div>

      {/* PARAMETERS */}
      <div className={` scroller-rounded  relative flex h-[78%] w-full flex-col  gap-y-[5px] rounded-md  md:h-[75%]`}>
        {channel_parameters_state instanceof Array &&
          channel_parameters_state.map((param_sec, param_sec_index) => (
            /* <- PARAMETER SECTION ->*/
            <>
              <hr className={`m-auto h-[2px] w-[50%] self-center bg-black `} />
              <div
                //ID
                key={`channel_creation_parameter_section_${param_sec_index}`}
                //STYLINg
                className={`flex h-max w-full  flex-wrap items-center justify-center p-[5px_5px]`}>
                {/* RENDERING EACH PARAM ACCORDING TO ITS TYPE */}
                {param_sec instanceof Array && param_sec.map((param, param_index) => render_params(param?.type, param, param_index))}
              </div>
            </>
          ))}
      </div>
    </div>
  );
});

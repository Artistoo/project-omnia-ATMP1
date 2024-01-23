import React from 'react';
import {useParams} from 'react-router-dom';
import {useMediaQuery} from '@uidotdev/usehooks';

//** DATA **
import {search_page_filters, transitionTimingFunctions} from '../../../data.js';

//** API **
import {useSearchMutation} from '../../redux/API.js';

//** ICON **
import {BsStars} from 'react-icons/bs';
import {IoIosArrowDown} from 'react-icons/io';
import {CiLock, CiUnlock} from 'react-icons/ci';

//** ELEMENTS **
import LoadingSkeleton from '../../components/Elements/LoadingSkeleton.jsx';
import Range from '../../components/Elements/Range.jsx';
import DefaultInput from '../../components/Elements/DefaultInput.jsx';
import {MdOutlineCategory} from 'react-icons/md';

export default function SearchPage() {
  //ROUTER
  const {param: search_param} = useParams();

  //STATES
  const [filter_over, setFilter_over] = React.useState('chans');
  const [search_resp, setSearch_resp] = React.useState([]);
  const [filter_open, setFilter_open] = React.useState(false);

  //REDUCER
  const search_filters_reducers = React.useCallback((state, {type, payload}) => {
    switch (type) {
      case 'UPDATE_SELECT_PARAM':
        try {
          const {selected_param, selected_option} = payload;
          if (!Boolean(selected_param) || !Boolean(selected_option)) throw new Error(`either the selected param or option is not provided `);

          const handleUpdateState = (param_object) => {
            const {selected} = param_object;

            //#ERR
            if (!Array.isArray(selected)) throw new Error(`selected is not an array`);
            if (param_object.param !== selected_param) return param_object;

            const is_selected = selected.some((option) => option === selected_option);
            const [add, remove] = [selected.concat(...selected, selected_option), selected.filter((option) => option != selected_option)];
            console.log({true: remove, false: add}[is_selected]);

            return {selected: {true: remove, false: add}[is_selected], ...param_object};
          };
          console.log(state[filter_over].map(handleUpdateState));

          return {
            ...state,
            [filter_over]: state[filter_over].map(handleUpdateState),
          };
        } catch ({message: error}) {
          console.log({error});
          return state;
        }
      case `UPDATE_RANGE_PARAM`:
        return state;
      default:
        return state;
    }
  }, []);
  const [search_filters_state, search_filters_dispatch] = React.useReducer(search_filters_reducers, search_page_filters);

  //HOOKS
  const is_MD = useMediaQuery(`only screen and (min-width : 800px)`);

  //API
  const [fetch_search_results, {isLoading: is_searching, error: search_error, data: search_results}] = useSearchMutation();

  //EFFECT
  React.useEffect(() => {
    (async () => await fetch_search_results({search_param}))();
  }, [search_param]);

  React.useEffect(() => {
    //UPDATING THE SEARCH RESPONSE ARRAY BASED ON THE API DATA
    try {
      if ((search_error, is_searching, !search_results)) return;
      setSearch_resp((prev) => (prev = search_results));
    } catch ({message: error}) {
      console.log({error});
    }
  }, [search_results, search_error, is_searching]);

  React.useEffect(() => {
    is_MD && setFilter_open((prev) => (prev = false));
  }, [is_MD]);
  React.useEffect(
    //OPENING THE MENU ON FILTER OVER STATE CHANGE
    () => setFilter_open((prev) => (prev = true)),
    [filter_over]
  );

  //LOGS
  console.log(search_error || is_searching || search_resp);

  //RENDER & COMPONENTS
  const Result = function () {
    //RESULT_COMPONENT
    const Result_type = {
      //ELEMENTS
      users: (result_data_object) => <div className={`h-[150px] w-[300px] rounded-[11px] bg-gray-900`}></div>,
      chans: ({Cover, _id, Name, Locked, Members, Categories}) => (
        <div className={`relative flex  h-[130px] w-[300px] max-w-[480px] flex-grow flex-col items-center justify-between rounded-[11px] border border-gray-800 bg-[#191919] p-[5px] md:h-[150px] md:flex-none`}>
          <div //DATA SECTION
            className={`flex-center group mb-[2px] relative h-[75%] w-full overflow-hidden px-[8px] `}>
            <video onMouseOver={({target}) => target.play()} onMouseLeave={({target}) => target.pause()} className={`stretch rounded-[8px]  object-cover`} loop>
              <source src={Cover} />
            </video>
            <div //THE CHANNEL TITLE CONTAINER
              style={{transitionTimingFunction: transitionTimingFunctions.Carousel_Ride}}
              className={`absolute bottom-0 flex h-[40%] w-full items-center justify-start overflow-hidden rounded-[8px]  p-[4px] transition-opacity duration-300 group-hover:opacity-30 `}>
              <span className={`absolute  inset-0 h-full w-full bg-gradient-to-t from-black to-transparent opacity-50`} />
              <h2 className={`z-[1] font-[openSauce] text-[25px] text-white`}>{Name}</h2>
              <span className={`flex-center absolute bottom-0 right-0 h-full w-[30px] `}>{Locked ? <CiLock data={`this channel is locked`} size={15} /> : <CiUnlock data={`this channel is open`} size={15} />}</span>
            </div>
          </div>

          <div //ACTIONS SECTION
            className={`flex h-[20%] w-full items-center justify-start p-[1px_5px] md:py-[2.5px] `}>
            <span //CATEGORIES
              onClick={() => {
                const categories_dialog = document.getElementById(`search_page_channel_categories_${Name}`);
                if (!categories_dialog) return;
                categories_dialog?.open ? categories_dialog.close() : categories_dialog.showModal();
              }}
              className={`flex-center-around relative h-full w-[100px] cursor-pointer rounded-[5px]  bg-purple-300 text-black`}>
              <dialog //THE CHANNEL CATEGORIES DIALOG
                id={`search_page_channel_categories_${Name}`}
                className={` absolute top-[30px] max-h-[170px] min-h-[100px] w-[300px] overflow-hidden rounded-md backdrop:bg-black/30`}>
                <div className={`stretch  flex flex-col items-start justify-start gap-y-[8px] p-[2px] `}>
                  <h2 className={`text-md font-[openSauce]`}>{Name}</h2>
                  <div //CATEGORIES CONTAINER
                    className={`scroller-rounded flex h-[80%] flex-wrap overflow-y-scroll`}>
                    {Array.isArray(Categories) && Categories.map((category) => <span className={`mx-[2px] h-max flex-grow rounded-full bg-purple-200 p-[2px_7px] text-[11.2px]`}>{category}</span>)}
                  </div>
                </div>
              </dialog>
              <MdOutlineCategory fill={`black`} size={17} />
              <small className={`text-[12px]`}>cateogries</small>
            </span>
            <span></span>
          </div>
        </div>
      ),

      //PAGES
      error: () => <div>im for error</div>,
      empty: () => <div>none found</div>,
      loadi: () => <div>im for loadi</div>,
    };

    //RESULT_EFFECT
    React.useEffect(() => {
      console.log(!is_searching ? (search_error ? 'error' : Object.keys(search_resp).length ? 'result' : 'empty') : 'loadi');
    }, [search_resp]);

    /* chans: [
      {
        _id: '6588fc19717df68adf162320',
        Name: 'god forever',
        Categories: [ 'Religion', 'History' ],
        Locked: true,
        Members: []
      }
    ], */

    return (
      <div // THE RESULTS CONTAINER
        className={`flex-center-around min-h-[450px] w-full flex-col gap-y-[10px] bg-[#121212] py-[22px] `}>
        {{
          ...Result_type,
          result: () =>
            Object.entries(search_resp).map(([result_key, result_value]) => (
              <div className={`flex h-[220px]  w-full  flex-col items-start justify-center  px-[11px] font-[openSauceReg] text-gray-200`}>
                <div //THE SEARCH RESULT TITLE AND TEXT
                  className={`flex h-[30px] w-full `}>
                  <h3 className={`text-sm text-gray-300`}>{{chans: `channels results found`, users: `users found`}[result_key]}</h3>
                </div>
                <div //LOOPING THROUGH THE SEARCH RESULT
                  className={`relative flex min-h-[200px] w-full items-center justify-center overflow-hidden md:justify-start `}>
                  {!!(result_value.length > 3) && <span className={`absolute inset-auto right-0 z-[5] h-full w-[150px] bg-gradient-to-l from-gray-950 via-black to-transparent opacity-50`} />}
                  {!!result_value.length ? result_value.map((result_data_object) => Result_type[result_key](result_data_object)) : Result_type.empty()}
                </div>
              </div>
            )),
        }[!is_searching ? (search_error ? 'error' : Object.keys(search_resp).length ? 'result' : 'empty') : 'loadi']()}
      </div>
    );
  };

  const Filter = function () {
    //FILTER_EFFECTS
    React.useEffect(() => {
      // **ADDING SELECTED CATEGORY UNDERLINE TRANSITION STYLING && DROP THE FILTER ON CHANGE**
      //ID
      const SELECTED_CATEGORY_LINE = document.getElementById(`SELECTED_CATEGORY_LINE`);
      //#ERR
      if (!SELECTED_CATEGORY_LINE) return;
      const selected_state = (selected) => eval(`${(!selected && `!`) || ''}filter_over == 'users' ? 'chans' : 'users'`);

      //STYLING
      const category_styling = {
        chans: `-translate-x-1/2`,
        users: `translate-x-1/2`,
      };
      const temp_styling = [`scale-x-[2]`, `bg-right`];

      //ACTIONS
      temp_styling.forEach((temp) => SELECTED_CATEGORY_LINE.classList.add(temp));
      const scale_style_timer = setTimeout(() => temp_styling.forEach((temp) => SELECTED_CATEGORY_LINE.classList.remove(temp)), 500);

      SELECTED_CATEGORY_LINE.classList.remove(category_styling[selected_state(false)]);
      SELECTED_CATEGORY_LINE.classList.add(category_styling[selected_state(true)]);

      return () => clearTimeout(scale_style_timer);
    }, [filter_over]);

    //FILTERS_COMPONENTS
    const Filter_List_Component = {
      SELECT: ({options, param, selected, Data_Export}) => {
        //SELECT STATES
        const [options_search_param, setOptions_search_param] = React.useState('');
        const options_selected = (option) => selected.some((selected_opt) => selected_opt === option);

        return (
          <div className={`stretch flex-center-around  flex-col  p-[2px_8px] `}>
            <div //SEARCH INPUT
              className={`mb-[18px] w-full rounded-[4px] text-[14px]`}>
              <DefaultInput placeholder={`filther through options`} style={{FormStyle: {width: '95%'}}} InputEvents={{onChange: ({target}) => setOptions_search_param(target.value)}} />
            </div>
            <div // OPTIONS LOOP
              className={`scroller-rounded flex h-[80%] w-full flex-wrap items-start  justify-around  gap-[3px] overflow-scroll`}>
              {Array.isArray(options) &&
                options
                  .filter((item, index, self) => /* REMOVE DUP */ index === self.findIndex((t) => t.select === item.select))
                  .filter(({select}) => (/* SEAECH FUNC */ Boolean(options_search_param) ? String(select).toUpperCase().includes(String(options_search_param).toUpperCase()) : true))
                  .map(({select, image = undefined, Icon = undefined}) => (
                    <span //IND OPTION
                      key={`${select}_search_page_filter_option`}
                      onClick={() => search_filters_dispatch({type: `UPDATE_SELECT_PARAM`, payload: {selected_option: select, selected_param: param}})}
                      className={` flex  w-[45%] flex-grow cursor-pointer items-center justify-start gap-x-[9px] rounded-[4px] bg-gray-50 py-[6px] font-[openSauceReg] text-[14px] hover:bg-gray-200 ${options_selected(select) ? `bg-green-300` : `bg-gray-300`}`}>
                      {{true: <img src={image} className={`aspect-square w-[15px] rounded-full object-cover `} />, false: <Icon />}[Boolean(image)]}
                      <p className={`truncate text-[12.8px]`}>{select}</p>
                    </span>
                  ))}
            </div>
          </div>
        );
      },

      RANGE: () => (
        <div className={`stretch flex-center bg-slate-100`}>
          <div className={`w-[90%] `}>
            <Range />
          </div>
        </div>
      ),
    };

    return (
      <div className={`flex w-full flex-col items-center justify-start  p-[3px] `}>
        <div // RESULT INSIGHT BOX
          className={`flex-center-between h-[140px] w-full flex-col overflow-hidden rounded-[7px] bg-gray-100`}>
          <div //INSIGHT BOX DATA
            className={`flex-center-around h-[65%] w-full px-[10px] `}>
            <span //INSIGHT LOGO
              className={`flex-center h-full w-[25%]`}>
              <div //INSIGHT LOGO COVER
                style={{backgroundSize: '5000%', transitionTimingFunction: transitionTimingFunctions.Jovial_Jig}}
                className={`peer/SEARCH_INSIGHT_LOGO_BOX absolute aspect-square w-[35px] rounded-[5px] bg-gradient-to-l from-pink-500 via-transparent to-green-300 bg-right transition-[background] duration-300 hover:bg-left`}
              />
              <BsStars size={18} className={`pointer-events-none z-[2] text-gray-100 peer-hover/SEARCH_INSIGHT_LOGO_BOX:text-black`} />
            </span>

            <span //INSIGHT DATA
              className={`relative mx-[4px] flex  h-[90%] w-full flex-grow  flex-col items-start justify-between overflow-hidden rounded-[10px] bg-gray-200 py-[5px] pl-[12px] shadow-[10px_0_15px_-15px_#dbdbdb9c_inset]`}>
              {!is_MD && ( //DROP DOWN FILTERS MENU SM DISPLAY ARROW
                <span onClick={() => setFilter_open((prev) => !prev)} title={`apply filter`} className={`flex-center group absolute right-[15px] top-[15px]    aspect-square w-[22px] cursor-pointer rounded-[2px]  border-gray-200 bg-gray-800`}>
                  <IoIosArrowDown size={18} fill={`white`} className={`pointer-events-none transition-transform duration-200  ${filter_open ? `rotate-[180deg] group-hover:-translate-y-[2px]` : `rotate-0 group-hover:translate-y-[2px]`}`} />
                </span>
              )}
              <h2 className={`font-[openSauce] `}>{search_param}</h2>
              <div className={`flex-center h-[80%]  flex-col gap-y-[5px]    text-[12.5px] `}>
                {[
                  {about: `total chans found`, key: React.useId(), data: !search_error ? search_results?.chans?.length || `none` : `something went wrong`},
                  {about: `total users found`, key: React.useId(), data: !search_error ? search_results?.users?.length || `none` : `something went wrong`},
                ].map(({about, key, data}) => (
                  <div //IND BOX INFO
                    className={`flex w-full items-center justify-start gap-x-[2px] rounded-sm font-[openSauceReg] leading-tight `}>
                    <h2>{about}:</h2>
                    <p>{(!is_searching && data) || <LoadingSkeleton />}</p>
                  </div>
                ))}
              </div>
            </span>
          </div>

          <div //INSIGHT BOX TYPE
            className={`flex-center relative h-[25%] w-full flex-col `}>
            <div // TYPE SELECTION
              className={`flex-center-between h-[80%] w-full`}>
              {[{category_value: `users`}, {category_value: `chans`}].map(({category_value}) => (
                <span onClick={() => setFilter_over((c) => (c = category_value))} className={`flex-center h-full flex-grow cursor-pointer font-[openSauceReg] text-[12.5px]`}>
                  <h2>{category_value}</h2>
                </span>
              ))}
            </div>
            <div className={`flex-center group absolute bottom-[-5px]  h-[3px] w-full items-center overflow-hidden bg-gray-500 `}>
              <span key={`SELECTED_CATEGORY_LINE`} id={`SELECTED_CATEGORY_LINE`} style={{transitionTimingFunction: `linear`, backgroundSize: '3000%'}} className={`absolute h-full w-[200%]  bg-gradient-to-l from-purple-400 via-green-300 to-blue-400 bg-right  transition-all   duration-500 `} />
            </div>
          </div>
        </div>

        <div // FILTERS LIST WRAPPER
          className={`flex w-full flex-col  items-center justify-between gap-y-[8px]`}>
          {search_filters_state[filter_over].map(({param, id, selected, options = false, ...filter_data}) => {
            //IND FILTER STATE
            const [options_state, setOptions_state] = React.useState(options);
            const [filterIs_Open, setFilterIs_Open] = React.useState(false);

            //IND FILTER HANDLERS
            const handleGetOptions = async () => {
              if (!options instanceof Promise) return;
              const options_response = await options;
              setOptions_state(options_response);
            };

            //IND FILTER EFFECT
            React.useEffect(() => {
              handleGetOptions();
            }, [options]);

            //IND FILTER DEST
            const {range: is_range = undefined} = options_state;
            const Filter_List = Filter_List_Component[Boolean(is_range) ? `RANGE` : `SELECT`];

            //IND VARIABLES
            const Data_Export = {param, selected, filter_data};

            return (
              <div //IND FILTER PARAM
                style={{transitionTimingFunction: transitionTimingFunctions.Disco_Fever}}
                className={`relative flex w-full  flex-col items-start justify-between overflow-hidden rounded-[7px] bg-white px-[12px] transition-all duration-150 ${filterIs_Open ? `h-[250px]` : `h-[50px]`}`}>
                <div //THE FILTER DISPLAY
                  className={`absolute top-0 flex h-[50px] w-full items-center justify-start  px-[5px] font-[openSauceReg] text-[14px]`}>
                  <h2>{param}</h2>
                  <span // THE FILTER ARROW CIRLCE
                    onClick={() => setFilterIs_Open((prev) => !prev)}
                    style={{transitionTimingFunction: transitionTimingFunctions.Cheeky_Chacha}}
                    className={`flex-center absolute right-[25px] aspect-square w-[20px] cursor-pointer rounded-full text-gray-50 transition-all delay-200  duration-150 ${filterIs_Open ? `bg-green-100` : `bg-black`}`}>
                    <IoIosArrowDown style={{transitionTimingFunction: transitionTimingFunctions.Cheeky_Chacha}} className={`transition-all duration-150 ${filterIs_Open && `rotate-180 text-black`} `} />
                  </span>
                </div>
                <div // THE FILTER CONTENT
                  className={` flex-center absolute inset-0  top-[50px] h-[200px] w-full text-black`}>
                  {options_state instanceof Object && React.isValidElement(<Filter_List />) && <Filter_List options={options_state} {...Data_Export} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`my-[15px] flex min-h-[500px] w-full  flex-wrap items-start justify-center gap-[15px_5px]  `}>
      <span // FILTER WRAPPER _ INSIDE MAIN CONTAINER
        id={`SEARCH_PAGE_FILTERS`}
        style={{transitionTimingFunction: transitionTimingFunctions.Disco_Fever}}
        className={`relative flex w-[25%] min-w-[210px] flex-grow  items-start overflow-hidden rounded-[7px]  bg-[#121212]   min-[800px]:min-h-[450px] ${!filter_open ? `h-[150px]` : `h-max`}`}>
        <Filter />
      </span>
      <span // RESULTS WRAPPER _ INSIDE MAIN CONTAINER
        id={`SEARCH_PAGE_RESULTS`}
        className={`relative  min-h-[450px] w-[73%] min-w-[210px] flex-grow rounded-sm `}>
        <Result />
      </span>
    </div>
  );
}

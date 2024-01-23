import React from "react";
import { Link, useNavigate } from "react-router-dom";
//API
import { usePhotosSearchGetQuery, PixabayAPI } from "../redux/API";
//LOGO
import Pixabay_icon from "../assets/icons/Pixabay_icon.png";
import DOMPurifyI from "dompurify";
//ICONS
import { VscLoading } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { VscSearchStop } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";
//components
import Skeleton from "../components/Skeleton.jsx";
import { HiPause } from "react-icons/hi";
import { BsArrowLeftShort, BsPause } from "react-icons/bs";

//The JSX For the Photo Modal
export default function channel_imageMOD({
  selectedImageHandler,
  searchParams,
}) {
  //Reducer State
  const imagesState = {
    page: 1,
    param: searchParams || "space",
    result_type: "img",
  };
  const imagesReducer = (state, action) => {
    switch (action.type) {
      case "search":
        return { ...state, param: DOMPurifyI.sanitize(action.payload.param) };
      case "paginate":
        return { ...state, page: action.payload.page };
      case "type":
        return { ...state, result_type: action.payload.result_type };
      default:
        return { ...state };
    }
  };
  const [imageReducerState, handleImagesState] = React.useReducer(
    imagesReducer,
    imagesState
  );
  console.log(searchParams);
  //VAR
  const navigate = useNavigate();

  //STATES
  const [isSelected, setIsSelected] = React.useState({
    isSelecting: false,
    Selected: false,
  });

  //API
  const {
    data: images,
    isLoading: isLoadingImages,
    error: imagesApiError,
    refetch: refetchImages,
    isFetching: isFetchingImages,
  } = usePhotosSearchGetQuery({ ...imageReducerState });

  //USEEFFECT
  React.useEffect(() => {
    refetchImages({ ...imageReducerState });
  }, [imageReducerState]);

  //REFS
  const closeChanngeImagePopoverBtn = React.useRef();

  /* <------- COMPONENTS ------> */
  //Media
  const MediaItem = React.memo(({ index }) => {
    const [loaded, setLoaded] = React.useState(false);
    const targetImage = images?.hits[index];
    const imageSrc =
      targetImage?.userImageURL ||
      targetImage?.previewURL ||
      targetImage?.webformatURL;

    const handleMediaLoaded = (e) => {
      e.target.classList.remove("opacity-0");
      e.target.classList.remove("translate-y-[15px]");

      setLoaded(true);
    };
    const handleSelction = () => {
      selectedImageHandler({
        type: targetImage?.videos ? "vid" : "img",
        cover:
          targetImage?.type === "photo"
            ? imageSrc
            : targetImage?.videos?.tiny?.url,
      });
      setIsSelected((c) => ({ ...c, isSelecting: true }));
      if (closeChanngeImagePopoverBtn.current) {
        closeChanngeImagePopoverBtn.current.click();
        console.log("closed");
        setIsSelected((c) => ({ isSelecting: false, Selected: true }));
      }
    };

    return (
      <div
        onClick={handleSelction}
        className={`group relative flex h-[180px] w-[130px] flex-grow cursor-pointer flex-col self-start overflow-hidden rounded-md`}
      >
        {/* MEDIA SECTION */}
        <div
          className={`relative flex h-[100%] items-center justify-center overflow-hidden`}
        >
          {/* HANDLING THE LOADING SKELETOON */}
          {index <= 6 && (
            <div
              onLoad={(e) =>
                e.target.animate(
                  [
                    { backgroundPosition: `50% 10%` },
                    { backgroundPosition: `10% 50%` },
                  ],
                  { duration: 100, iteration: Infinity }
                )
              }
              className={`absolute -z-10 h-full w-full rounded-md border bg-gradient-to-tl from-gray-300/40 via-gray-300/30 to-slate-300/40`}
            />
          )}

          {/* LOOPING THRO THE IMAGES */}
          {targetImage?.type === "photo" ? (
            <img
              onLoad={(e) => handleMediaLoaded(e)}
              loading="lazy"
              src={imageSrc}
              style={{
                transition: `opacity 800ms cubic-bezier(0.68, -0.55, 0.27, 1.55)
                , transform 850ms cubic-bezier(0.68, -0.55, 0.27, 1.55)
                `,
              }}
              className={`absolute h-[100%] w-full rounded-md object-cover opacity-0`}
            />
          ) : (
            <video
              onLoadedData={(e) => handleMediaLoaded(e)}
              id="videoPlayer"
              autoplay={false}
              loading="lazy"
              onMouseOver={(e) => e.target.play()}
              onMouseLeave={(e) => e.target.pause()}
              loop
              muted
              style={{
                transition: `opacity 800ms cubic-bezier(0.68, -0.55, 0.27, 1.55)
                , transform 850ms cubic-bezier(0.68, -0.55, 0.27, 1.55)
                `,
              }}
              className={`absolute h-full w-full translate-y-[15px] rounded-md object-cover  opacity-0`}
            >
              <source src={targetImage?.videos?.tiny?.url} type="video/mp4" />
              Your browser does not support playing videos.
            </video>
          )}
        </div>

        {/* PHOTOS DESC SECTION */}
        <div
          className={`absolute bottom-0 z-10  mb-[5px] h-[35%] w-full  flex-col items-center justify-start gap-y-[10px] px-[7px] py-[5px] group-hover:opacity-70 `}
        >
          {/* ARTIST PHOTO AND NAME */}
          <div
            style={{
              transitionProperty: `transform , opacity `,
              transitionDuration: "350ms 350ms",
              transitionTimingFunction: `ease-in-out`,
            }}
            className={`flex h-[40%] w-full  items-center justify-between px-[5px] font-[garet] ${
              loaded
                ? `translate-y-0 opacity-100`
                : `translate-y-[8px] opacity-0`
            }`}
          >
            <img
              className={`aspect-square w-[30px] max-w-[20%] rounded-full `}
              src={targetImage?.userImageURL}
            />
            <h2
              className={`w-[75%] truncate font-[openSauce] text-[14px] text-gray-200 mix-blend-difference first-letter:uppercase `}
            >
              {targetImage?.user}
            </h2>
          </div>

          {/* TAGS */}
          <div
            className={`flex h-[40%] w-full items-center justify-evenly gap-x-[2px] text-[11px]   text-gray-400/90`}
          >
            {targetImage?.tags
              ?.split(",")
              .slice(0, 3)
              .map((tag, tagIndex) => (
                <p
                  key={tag}
                  className={` blend-mix-difference  flex w-[29%] translate-y-[8px] items-center justify-start truncate rounded-sm bg-white/20 px-[3px] py-[1px]  pl-[5px] font-[brandinkLight] font-semibold backdrop-blur-md transition-opacity duration-[200ms] ${
                    loaded ? `opacity-100` : `opacity-0`
                  }`}
                >
                  {tag}
                </p>
              ))}
          </div>
        </div>
      </div>
    );
  });

  /* THE MAIN CHANNEL IMAGES MODAL RETURN  */
  return (
    <div
      popover={`auto`}
      id={`channel_image`}
      className={`hideScroller   m-auto h-[520px] w-[500px] overflow-y-scroll rounded-[12px] bg-gradient-to-tl from-gray-300/80 via-blue-50/70 to-gray-100/80 backdrop-blur-lg backdrop:bg-black/50  max-[580px]:top-full  max-[580px]:w-screen max-[580px]:-translate-y-[50%]`}
    >
      {/* CLOSING THE POPOVER BUTTON */}
      <button
        ref={closeChanngeImagePopoverBtn}
        popoverTarget={`channel_image`}
        popoverAction={"hide"}
        className={`absolute h-0 w-0 opacity-0`}
      />

      {/* POPOVER CONTENT */}
      <div
        className={`relative flex h-full w-full select-none flex-col items-center justify-center  gap-y-[5px] px-[15px] py-[15px]`}
      >
        {/* TITLE & SEARCH_TYPE */}
        <div
          className={`flex h-[18%] w-full flex-col items-center justify-center`}
        >
          {/* Select Cover TEXT & Close Popover BTN*/}
          <div className={`flex w-full items-center justify-between px-[5px]`}>
            <h2
              className={`my-[15px]  self-start text-start font-[openSauce] text-[25px]`}
            >
              Select Cover
            </h2>

            <span
              className={`group relative flex aspect-square w-[30px] cursor-pointer items-center justify-center  rounded-full bg-gray-100/10 p-[3px] transition-[background] hover:bg-gray-50/40`}
            >
              <AiOutlineClose
                className={`h-[100%] w-auto scale-[.8] group-hover:opacity-70  `}
                onClick={() => {
                  if (closeChanngeImagePopoverBtn.current) {
                    closeChanngeImagePopoverBtn.current.click();

                    setIsSelected((c) => ({
                      isSelecting: false,
                      Selected: true,
                    }));
                  }
                }}
              />
            </span>
          </div>

          {/* <--- TYPE & SEARCH --->  */}
          <div
            className={`my-[3px] flex h-[35%]  w-full items-center justify-between`}
          >
            {/* TYPES */}
            <span className={`flex  w-[50%] items-center justify-start `}>
              {[{ type: `vid` }, { type: `img` }].map((type) => (
                <div
                  onClick={() => {
                    handleImagesState({
                      type: "type",
                      payload: { result_type: type.type },
                    });
                  }}
                  style={{
                    transition: `border 250ms ease , color 250ms ease , background 250ms ease`,
                  }}
                  key={type.type}
                  className={` ml-[7px] flex w-[45%] cursor-pointer items-center justify-center rounded-md border  px-[5px] py-[3.1px] font-[garet] text-[15px] ${
                    imageReducerState.result_type === type.type
                      ? ` border-black bg-gray-200 text-gray-900`
                      : ` border-transparent bg-gray-300 text-gray-500 hover:border-gray-300 `
                  }`}
                >
                  {type.type}
                </div>
              ))}
            </span>

            {/* SEARCH */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleImagesState({
                  type: "search",
                  payload: { param: e.target.elements.image_search.value },
                });
              }}
              className={` relative flex h-full w-[50%] items-center justify-center`}
            >
              <input
                placeholder={`search for cover`}
                name={`image_search`}
                className={`w-full rounded-full border border-transparent bg-white/90 px-[15px] py-[6px] font-[brandinkLight] text-[16px] placeholder:text-gray-500 focus:border-gray-700 focus:outline-none`}
              />
              <button
                type={"submit"}
                className={`flex h-full items-center justify-center`}
              >
                <CiSearch size={17} className={`absolute right-[15px]`} />
              </button>
            </form>
          </div>
        </div>

        {/* RESULT CONTAINER */}
        <div
          id={`result`}
          style={{
            scrollbarGutter: "stable",
          }}
          className={`hideScroller relative my-[15px] flex h-[70%] w-full flex-wrap items-center justify-around gap-[8px] overflow-y-scroll rounded-md p-[5px]`}
        >
          {/* LOADING SCREEN */}
          <div
            className={`absolute z-10 h-full w-full items-center justify-center bg-black bg-gray-200/50 font-[garet] text-sm  text-gray-800 opacity-50 backdrop-blur-sm ${
              isLoadingImages || isFetchingImages ? `flex` : `hidden`
            }`}
          >
            <VscLoading
              className={`${
                isLoadingImages && `animate-spin`
              } mx-[10px] inline`}
            />
            loading
          </div>

          {/* Data Mapping */}
          {Array(!isLoadingImages ? images?.hits?.length || 1 : 20)
            .fill(null)
            ?.map((_, index) => {
              //if no result found
              if (!isLoadingImages && images?.hits?.length <= 0)
                return (
                  <div
                    key={"emoty_photos_Results"}
                    className={`flex h-full w-full items-center justify-center gap-x-[8px] font-[garet] text-[15px] text-gray-800`}
                  >
                    <VscSearchStop />
                    <p className={`max-w-[70%] truncate text-gray-600`}>
                      {" "}
                      your search {imageReducerState.param} returned no result{" "}
                    </p>
                  </div>
                );

              //if no result found
              return <MediaItem key={images?.hits[index]?.id} index={index} />;
            })}
        </div>

        {/* PAGINATION  */}
        <div
          id={`page_num`}
          className={` flex h-[5%] w-full items-center justify-center  font-[openSauceReg] text-[14px] text-gray-700 `}
        >
          {/* PAGES */}
          <div className={`flex w-[26%] items-center justify-around`}>
            {Array(!isLoadingImages && images?.hits.length)
              .fill(null)
              .map((_, num) => !!num && num)
              .slice(
                ((x) => (x >= 5 ? x - 4 || 2 : 0))(imageReducerState?.page),
                Math.min(
                  ((x) => (x >= 5 ? x + 2 : 6))(imageReducerState?.page),
                  images?.total / 12 > 1 ? images?.total / 12 : 2
                )
                /* imageReducerState?.page + 5 */
              )
              .map((num) => (
                <span
                  style={{
                    transition: `background 250ms ease`,
                  }}
                  onClick={() =>
                    handleImagesState({
                      type: `paginate`,
                      payload: { page: num },
                    })
                  }
                  className={`relative  flex aspect-square w-[20px] cursor-pointer  flex-col items-center justify-center rounded-full  ${
                    num === imageReducerState?.page
                      ? `border border-transparent bg-black text-white hover:border-black hover:bg-white hover:text-gray-900`
                      : `bg-transparent`
                  }   `}
                >
                  <p
                    className={`flex h-full w-full items-center justify-center self-center ${
                      num === imageReducerState?.page
                        ? `scale-[.7]  `
                        : `scale-100 text-gray-400 hover:text-gray-600`
                    }`}
                  >
                    {num}
                  </p>
                </span>
              ))}
          </div>

          {/* BACK ARROW */}
          <span
            onClick={() =>
              handleImagesState({
                type: "paginate",
                payload: { page: imageReducerState.page - 1 },
              })
            }
            className={` absolute translate-x-[-88px] cursor-pointer items-center justify-center text-gray-500 transition-[transform_color] hover:translate-x-[-93px] hover:text-gray-700
            ${!isNaN(images?.total / 12) ? `opacity-100` : `opacity-0`} 
            ${
              imageReducerState.page > 5
                ? `pointer-events-auto flex`
                : "pointer-events-auto hidden"
            }
            
            
            `}
          >
            <BsArrowLeftShort size={22} className={` `} />
          </span>
        </div>

        {/* PIXABAY ATTRIBUTE  */}
        <div
          id={`attribute`}
          className={`flex h-[5%] w-full items-center justify-start gap-x-[8px] text-[12px] text-gray-400 `}
        >
          <img className="h-[17px] w-[17px] rounded-sm" src={Pixabay_icon} />
          <small>provided by Pixabay</small>
        </div>
      </div>
    </div>
  );
}

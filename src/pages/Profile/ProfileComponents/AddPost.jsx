import React from "react";

//ICONS
import { CgAdd } from "react-icons/cg";
import { CiImageOn } from "react-icons/ci";
import { CgExtensionRemove } from "react-icons/cg";
import { MdArrowForward } from "react-icons/md";

export default function AddPost() {
  //handle functions

  const uploadedImagesRef = React.useRef([]);

  const [postImage, setPostImage] = React.useState([]);
  const [postMessage, setpostMessage] = React.useState("");

  const handleNewPostFile = (event) => {
    const file = event.target.files[0];
    setPostImage((e) => [...e, URL.createObjectURL(file)]);
  };

  /* TODO: make sure the images array is clean on page load */
  /*  React.useEffect(() => {
    setPostImage((e) => ({ images: [], overload: false }));
  }, []); */
  const [pressTimer, setPressTimer] = React.useState(0);
  let interval;

  return (
    <div
      className={`relative flex w-[90%]  min-w-[400px]  flex-col items-center justify-center  gap-y-[21px]  rounded-md border p-[12px] text-gray-50 lg:min-h-[160px] `}
    >
      {/* CONTENT  */}

      <div
        className={`flex h-[35%] w-full flex-col items-start   justify-center`}
      >
        <h2
          className={`flex w-max items-center justify-center gap-x-[8px] font-[garet] text-[22px] text-white`}
        >
          add post <CgAdd size={20} />{" "}
        </h2>
        <p className={`font-[poppins] text-[13px] text-gray-200`}>
          share photos and video with your community
        </p>
      </div>

      {postImage?.length ? (
        <div
          className={` relative flex h-[280px] w-full  flex-wrap items-center justify-center gap-[3px]`}
        >
          {postImage?.slice(0, 4)?.map((img, imgIndex) => (
            <div
              key={JSON.stringify(img)}
              onClick={() => {
                setPostImage((c) => {
                  const update = c.filter((_, i) => i !== imgIndex);
                  return update;
                });
              }}
              ref={(ref) => uploadedImagesRef.current.push(ref)}
              style={{
                width: postImage?.length >= 3 ? `49%` : `99%`,
                height: postImage?.length >= 2 ? `49%` : `99%`,
              }}
              className={`group relative flex flex-grow items-center justify-center`}
            >
              <div
                style={{
                  transition: `transform 550ms cubic-bezier(0.65, -0.85, 0.35, 1.85), background 250ms ease`,
                }}
                className={`pointer-events-none z-[2]  flex aspect-square w-[55px] origin-center scale-0 items-center justify-center rounded-full bg-gray-300   text-black  opacity-80 group-hover:scale-100 group-hover:bg-gray-50 `}
              >
                <CgExtensionRemove className={`scale-[1.8] `} />
              </div>
              <img
                src={img}
                className={`absolute h-full  w-full min-w-[80px] cursor-pointer  select-none rounded-md object-cover`}
              />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}

      {/* INPUT CONTAINER */}
      <div
        className={`relative flex h-[38px] w-full  items-center  justify-center overflow-hidden rounded-md border-b border-gray-100 bg-gradient-to-l from-green-200 via-purple-200 to-blue-200 `}
      >
        <input
          maxLength={120}
          onChange={(e) => setpostMessage(e.target.value)}
          onFocus={(e) => {
            null;
          }}
          placeholder={`add a post message`}
          className={`absolute left-0 h-full w-[75%] rounded-md border-none border-transparent bg-transparent   px-[10px] font-[openSauceReg] text-black caret-slate-600 outline-none placeholder:text-gray-400`}
        />
        <hr
          className={`absolute right-[25%] h-[50%] w-[0.7px] bg-gray-500 transition-transform duration-[200ms] 
            ${postMessage ? `scale-y-[1]` : `scale-y-0`}`}
        />
        {/* Text Limit  */}
        <div
          style={{
            transitionProperty: `opacity , transform `,
            transitionTimingFunction: `ease-in-out`,
            transitionDuration: "150ms",
          }}
          className={`absolute right-[14%] flex h-full w-[32px] translate-y-[2px] items-center justify-center text-[10.5px] text-gray-500 ${
            postMessage?.length
              ? `translate-x-0 opacity-100`
              : `translate-x-[14px] opacity-0`
          }`}
        >
          <p>{`${postMessage?.length}/120`}</p>
        </div>
        {/* Text Icons */}
        <div
          className={`absolute right-0 z-[2] flex h-full min-w-[15%] items-center justify-center  self-center `}
        >
          <div
            style={{
              transition: `transform 200ms ease-in-out`,
            }}
            className={`flex h-[25px] w-[25px] scale-[1.2] cursor-pointer items-center justify-center  ${
              postMessage || postImage?.length
                ? `translate-x-[-8px] `
                : `translate-x-0`
            }`}
          >
            <input
              title={`add a photo`}
              onInput={handleNewPostFile}
              id={`addPostFileInput`}
              type={"file"}
              className={`pointer-events-none absolute h-full w-full opacity-0`}
              accept="image/*"
            />
            <label for={`addPostFileInput`} className={`cursor-pointer`}>
              <CiImageOn
                style={{
                  transition: `opacity 200ms , transform 200ms ease-in-out`,
                }}
                className={`fill-black text-black 
                  ${
                    postImage?.images?.length >= 4
                      ? `translate-y-[-20px] opacity-0`
                      : `translate-y-[0] opacity-100`
                  }`}
              />
            </label>
          </div>
          <MdArrowForward
            style={{
              transition: `opacity 250ms , transform 250ms ease`,
            }}
            className={`  absolute right-[5px] cursor-pointer text-black hover:translate-x-[-2px] hover:scale-[1.1]  ${
              postMessage || postImage?.length
                ? `pointer-events-auto translate-x-[-5px] opacity-100`
                : `pointer-events-none translate-x-[-8px] opacity-0`
            }`}
          />
        </div>
      </div>
    </div>
  );
}

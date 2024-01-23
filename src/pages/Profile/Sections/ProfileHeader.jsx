import React from "react";


//____________________API______________________
import { useAccountConfigureMutation } from "../../../redux/API";
//____________________COMPONENTS______________________
import Modal from "../../../components/Popovers/Modal.jsx";
//____________________Libraries______________________
import { ColorExtractor } from "react-color-extractor";
//____________________ Assets ____________________
import Coin from "../../../assets/img/3D/Coin.png";
import CoinII from "../../../assets/img/3D/Coin 2.png";
import Spots from "../../../assets/mask/ProfileBgMasks/Spots.png";
import EditIcon from "../../../assets/icons/EditIcon.jsx";
import { BiArrowBack, BiArrowToRight, BiLike } from "react-icons/bi";
import { AiOutlineLoading } from "react-icons/ai";
import { userStateContext } from "../../../context/Data_context.jsx";

export default function ProfileHeader({ Profile, currentUser }) {
  //Obj Des
  const { ProfileData, isLoadingUserData } = Profile;

  //States
  const [AvatarColors, setAvatarColors] = React.useState([]);

  //Variables
  const easing = {
    bouncing: `cubic-bezier(0.25, 0.1, 0.25, 1)`,
  };

  //ApiCall
  const [
    configureAccount,
    {
      isLoading: isConfiguring,
      error: AccountConfigError,
      isSuccess: AccountConfigured,
    },
  ] = useAccountConfigureMutation();

  //Context
  const { loged, admin } = React.useContext(userStateContext).userState;

  //Components
  const Button = ({ btnData, btnIndex }) => {
    return (
      <div
        onClick={() => {
          if (!loged) {
            const loginPopover = document.getElementById("LoginToViewPopover");
            if (loginPopover) {
              loginPopover.showPopover();
            }
          }
        }}
        key={btnData.title}
        style={{
          transition: `background 140ms , border 150ms , outline 150ms  ease `,
        }}
        className={`group  relative flex  w-[48%] max-w-[290px] cursor-pointer items-center  justify-center rounded-full border py-[8px] font-[openSauceReg] text-[17px] outline outline-offset-0 outline-transparent hover:outline-[0.3px] hover:outline-offset-1 hover:outline-white/40 ${
          loged ? `` : `grayscale-[15px]`
        } ${btnData?.style.background} text-${btnData?.style?.color} `}
      >
        {btnData?.img &&
          Array.isArray(btnData?.img) &&
          btnData?.img.map((image, index) => (
            <>
              <img
                style={{
                  transition: `transform 500ms , opacity 235ms ease-in-out`,
                }}
                key={`COIN-button-image-AT${index}`}
                src={image}
                className={`absolute left-[20px] aspect-square w-[48px] ${
                  !index
                    ? `rotate-0 opacity-100 group-hover:rotate-[180deg] group-hover:opacity-0 `
                    : `rotate-[180deg] opacity-0 group-hover:rotate-0 group-hover:opacity-100`
                }`}
              />
            </>
          ))}
        <p>{btnData?.title}</p>
      </div>
    );
  };

  const MyProfile = currentUser?._id === ProfileData?._id;
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <div
      className={` my-[35px] flex w-full flex-wrap items-center justify-center gap-x-[30px] gap-y-[15px] px-[90px] text-white md:min-h-[400px]`}
    >
      {/* <----------PATEREN ----------> */}
      <div className={`Shine absolute top-0 z-[-1] h-[620px] w-screen `}>
        <div
          style={{
            maskImage: `url(${Spots})`,
            background: `white`,
            WebkitMaskImage: `url(${Spots})`,
            maskMode: `alpha`,
          }}
          className={`h-full w-full`}
        />
        <div
          className={` bottom-0 h-[200px] w-full translate-y-[-150px]  bg-gradient-to-t  from-black to-transparent`}
        />
      </div>

      {/* <---------- AVATAR PART CONTAINER -------------> */}
      <div
        id={`Profile_Picture`}
        className={`group flex h-full w-[15%] min-w-[120px] items-center justify-center `}
      >
        {/* AVATAR CONTAINER */}
        <div
          className={`group relative flex aspect-square h-[120px] items-center justify-center md:h-[160px] `}
        >
          {/* AVATAR */}
          {!isLoadingUserData && ProfileData?.Avatar ? (
            <div
              className={`flex cursor-pointer items-center justify-center overflow-hidden`}
            >
              <div
                style={{
                  transition: `opacity 150ms 150ms ease-in-out`,
                }}
                className={`absolute bottom-0 z-[3] h-full w-full origin-bottom rounded-full  bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100`}
              />
              <ColorExtractor
                getColors={(colors) => setAvatarColors([...colors])}
              >
                <img
                  style={{
                    viewTransitionName: "ProfileAvatarViewTransiton",
                  }}
                  src={ProfileData?.Avatar}
                  className={` border-transparent-500 z-[2]  rounded-full border object-cover`}
                />
              </ColorExtractor>
            </div>
          ) : (
            <div className={`stretch loading-screen`}/>
          )}

          {/* AVATAR BORDER */}
          <div
            style={{
              transition: `opacity 150ms , transform 250ms ${easing.bouncing}`,
            }}
            className={`absolute  aspect-square h-full scale-[1.08] rounded-full border opacity-100 group-hover:scale-[0.8] group-hover:opacity-0 `}
          />
          <div
            style={{
              transition: `opacity 150ms , transform 250ms ${easing.bouncing}`,
            }}
            className={`  absolute aspect-square h-full scale-[0.8] rounded-full border opacity-0 group-hover:scale-[1.08] group-hover:opacity-100 ${
              MyProfile ? `border-blue-600` : ``
            } `}
          />

          {/* AVATAR SPOT LIGHT */}
          <div
            style={{
              transition: `transform 250ms ${easing.bouncing}`,
              background:
                AvatarColors?.length &&
                `linear-gradient(130deg , ${AvatarColors.join(",")})`,
            }}
            className={`absolute aspect-square h-full w-full scale-[1.1] rounded-full blur-[60px]  ${
              AvatarColors?.length ? `scale-100` : `scale-0`
            }`}
          />
        </div>
      </div>

      {/* <---------- BIOGRAPHY PART CONTAINER -------------> */}
      <div
        className={`flew-grow flex h-full w-[60%] min-w-[650px] flex-col items-center justify-center gap-y-[35px] text-gray-50`}
      >
        <Modal
          modalState={openModal}
          showAvatar={true}
          handleModalState={() => setOpenModal(false)}
        >
          {(() => {
            const [updateBio, setUpdateBio] = React.useState();
            const maxBioLength = 100;
            return (
              <div
                className={`relative flex h-[300px] w-full items-center justify-center px-[12px] py-[30px] font-[Poppins]`}
              >
                <div
                  className={`relative flex h-full w-full flex-col  items-center justify-center  gap-y-[25px]`}
                >
                  <p
                    className={`group flex items-center justify-center self-start font-[openSauceReg]`}
                  >
                    update your bio{" "}
                    {/* TODO: add a feature where the user or remove the link */}
                    <small
                      className={`relative ml-[5px] border text-[0.8rem] text-blue-700`}
                    >
                      check best bios for this week
                      {[BiLike, BiArrowBack].map((Icon, IconIndex) => (
                        <Icon
                          key={`BestBioForTheWeek_N${IconIndex}`}
                          style={{
                            transition: `opacity 120ms , transform 250ms ease-in-out`,
                          }}
                          className={`absolute inline translate-y-[2px]  ${
                            !IconIndex
                              ? `translate-x-[5px]  opacity-100 group-hover:translate-x-[-5px] group-hover:opacity-0`
                              : `translate-x-[-5px] rotate-[180deg] opacity-0 group-hover:translate-x-[5px] group-hover:opacity-100`
                          }`}
                        />
                      ))}
                    </small>
                  </p>

                  <div className={`relative  h-[60%] w-full`}>
                    <textarea
                      maxLength={100}
                      onChange={(e) => setUpdateBio(e.target.value)}
                      placeholder={`your new bio`}
                      className={`  h-full w-full resize-none border border-black px-[5px] text-[15px] outline-none placeholder:text-gray-400`}
                    />

                    <div
                      className={`absolute bottom-0 right-0 m-[5px] flex h-[22px] w-[100px] items-center justify-center rounded-full border border-black px-[5px] py-[2px] text-[12px] tracking-[1px]`}
                    >
                      {updateBio?.length}/{maxBioLength}
                    </div>
                  </div>

                  <button
                    disabled={!!!updateBio?.length}
                    style={{
                      transition: `opacity 100ms , transform 150ms ease-in-out`,
                    }}
                    onClick={async () => {
                      const response = await configureAccount({
                        categories: {
                          Account: {
                            AboutMe: updateBio,
                          },
                        },
                        UserID: JSON.parse(localStorage?.user)?._id,
                      });
                      console.log({ response, AccountConfigured });
                      if (response?.data?.user) {
                        location.reload();
                      }
                    }}
                    className={`absolute bottom-0 flex  w-[100%] items-center justify-center rounded-full border bg-black py-[3px] font-[openSauceReg] text-[0.9rem] text-gray-200 hover:border-black hover:bg-transparent hover:text-black ${
                      updateBio
                        ? `translate-y-[25px] opacity-100`
                        : `translate-y-[20px] opacity-0`
                    }`}
                  >
                    update my bio
                    <AiOutlineLoading
                      className={`absolute right-[15px] ${
                        isConfiguring ? `animate-spin opacity-100` : `opacity-0`
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })()}
        </Modal>
        {/* TEXT */}
        <div
          className={`group/textContainer relative flex min-w-[80%] flex-col  items-center justify-center gap-y-[10px] md:min-w-[75%]`}
        >
          <div
            className={`relative flex  min-h-[42px] w-full min-w-[300px] items-center justify-center self-start font-[garet] text-[50px] first-letter:uppercase md:justify-start md:text-[55px]`}
          >
            {!isLoadingUserData &&
            ProfileData?.userName &&
            ProfileData?.LastName ? (
              <h2>{`${ProfileData?.userName} ${ProfileData?.LastName}`}</h2>
            ) : (
              <div className={`stretch loading-screen`}/>

            )}
          </div>
          <div
            className={` relative flex h-[35px] w-full min-w-[250px] items-center justify-center  pl-[5px] md:justify-start`}
          >
            {!isLoadingUserData ? (
              <p
                onClick={() => setOpenModal(true)}
                className={`group relative flex cursor-pointer items-center justify-center font-[Poppins] text-[16.8px] text-gray-100 hover:text-gray-400 md:self-start`}
              >
                {ProfileData?.AboutMe.replace("undefined", "")}
                <div
                  className={`absolute  right-[-80px] flex items-center justify-center  rounded-full bg-black/50`}
                >
                  <EditIcon width={"25px"} height={"25px"} />
                </div>
              </p>
            ) : (
              <div className={`stretch loading-screen`}/>
            )}
          </div>
        </div>

        {/* BUTTONS & INFO*/}
        <div
          className={`flex min-w-[80%]  flex-col items-center justify-center gap-y-[20px]`}
        >
          {/* Followers And Following */}
          <div className={`flex w-full items-center justify-around`}>
            {/* TODO:make it dynamic */}
            <p>12 followers</p>
            <div className={`flex items-center justify-center gap-x-[12px]`}>
              52 following
              {/* TODO: allow the user to edit profile settings right from the profile page  */}
            </div>
          </div>

          <div className={`relative flex w-full items-center justify-around  `}>
            {[
              {
                title: MyProfile ? "followers" : `Follow user`,
                style: { background: `bg-lime-300`, color: "black" },
              },
              {
                title: MyProfile ? "earningts" : `donate`,
                img: [Coin, CoinII],
                style: { background: `transparent`, color: "white" },
              },
            ].map((btn, index) => {
              return <Button key={btn.title} btnData={btn} btnIndex={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

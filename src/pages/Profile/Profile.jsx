import React from "react";
import ProfileHeader from "./Sections/ProfileHeader";
import { userStateContext } from "../../context/Data_context";
import { useParams } from "react-router-dom";
/* ___________ API ____________*/
import { useGetUserInfoQuery } from "../../redux/API";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProfileContent from "./Sections/Profile_content";
import { GiCancel } from "react-icons/gi";
import { MdCancel } from "react-icons/md";

/* ___________ Asset  ____________*/
import Logo from "../../assets/icons/Logo.jsx";

/* ___________ JSX ____________*/

export default function Profile() {
  const navigate = useNavigate();
  const { userState } = React.useContext(userStateContext);
  const { profileID } = useParams();

  //_________API CALL _______________
  const {
    data: userData,
    isLoading: isLoadingUserData,
    error: userDataError,
  } = useGetUserInfoQuery(profileID);

  const user = localStorage?.user && JSON.parse(localStorage.user);

  //___________USE EFFECT ____________
  React.useEffect(() => {
    if (!user) {
      let done = false;
      const showPopoverCounter = setTimeout(() => {
        const LoginPopover = document.getElementById("LoginToViewPopover");
        if (LoginPopover) {
          LoginPopover.showPopover();
        }
        done = true;
      }, 3000);
      return () => done && clearTimeout(showPopoverCounter);
    }
  }, []);

  //Variables
  const dataToPass = {
    Profile: {
      ProfileData: userData?.user,
      isLoadingUserData,
    },
    currentUser: user,
  };

  //Components
  const LoginToInteract = () => {
    return (
      <div
        popover={`auto`}
        id={"LoginToViewPopover"}
        className={`z-10 m-auto   h-[240px]   w-[430px] overflow-hidden rounded-md  bg-gradient-to-l from-gray-100 to-gray-200 text-center backdrop-blur-md backdrop:bg-gray-900/70 backdrop:backdrop-blur-md`}
      >
        <div className="group absolute  right-0   z-10 m-[2px] flex w-max items-center justify-end p-[5px]">
          <MdCancel
            className={` cursor-pointer  transition-[color] duration-[200ms] group-hover:text-orange-600`}
          />
          <button
            popovertarget={"LoginToViewPopover"}
            popovertagetaction={"hide"}
            className={`absolute h-full w-full  `}
          />
        </div>

        <div
          className={`flex h-full w-full flex-col items-center justify-around`}
        >
          {/* LOGO */}
          <div
            className={` absolute top-0  flex h-[20%] w-full cursor-pointer flex-col items-center justify-center opacity-40`}
          >
            <Logo
              Menu={true}
              loading={false}
              scale={0.6}
              color={{ main: "gray", colors: ["black", "black", "black"] }}
            />
            <span className="absolute top-full h-[0.8px] w-[80%] bg-gray-300" />
          </div>
          {/* IMG AND TEXT */}
          <div
            className={`flex h-[75%] translate-y-[15px] items-center justify-around p-[15px]`}
          >
            <div
              className={`flex h-full w-[10%] translate-y-[10px] items-center  justify-center`}
            >
              <img
                src={userData?.user?.Avatar}
                className={`scale-[1.8] rounded-full`}
              />
            </div>
            <div
              className={`flex h-full w-[75%] flex-col items-center  justify-center gap-y-[8px] self-end `}
            >
              <h2
                className={`w-max text-center font-[openSauce] text-[20px] text-black `}
              >
                log in to interact with {userData?.user?.userName}
              </h2>
              <p
                style={{
                  textWrap: `balance `,
                }}
                className={`w-full font-[Poppins] text-[14px] leading-tight text-gray-800`}
              >
                you are not logged in currently , login to you account of create
                a new account in order to be able to interact with{" "}
                {userData?.user?.userName || `this user`}
              </p>
            </div>
          </div>
          {/* BUTTONS */}
          <div
            className={`m-auto flex h-[22%] w-full translate-y-[2px] items-center justify-around self-center bg-gray-300/50 shadow-md backdrop-blur-sm`}
          >
            <span className="absolute top-0 h-[1px] w-[100%] scale-y-[0.4] bg-gray-400" />
            <nav
              className={`flex h-full w-full items-center justify-around px-[20px]`}
            >
              {[{ title: `log in` }, { title: "sign up " }].map((nav) => (
                <button
                  onClick={() => navigate(`/user/AccountAuth`)}
                  className={`flex h-max w-[40%] items-center justify-center rounded-full border border-gray-800 px-[8px] py-[3px] font-[openSauceReg] text-gray-700 transition-[border_background_color] duration-[100ms] hover:border-white hover:bg-black hover:text-white`}
                  key={`notLogged${nav.title}`}
                >
                  {nav.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div style={{
      viewTransitionName : `NavigateToProfileViewTransition`
    }} className={`flex flex-col items-center justify-center px-[30px] `}>
      <ProfileHeader {...dataToPass} />
      <LoginToInteract />
      <ProfileContent {...dataToPass} />
    </div>
  );
}

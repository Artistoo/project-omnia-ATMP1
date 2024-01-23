import React from "react";
import { useNavigate } from "react-router-dom";

export default function SavedUsers() {
  const navigate = useNavigate();
  const handleUnsaveAccount = () => {};
  const SavedUser = localStorage?.savedUsers
    ? JSON.parse(localStorage?.savedUsers)
    : [];
  React.useEffect(() => {
    !SavedUser && navigate("/");
  }, []);
  return (
    <div
      className={`flex min-h-[400px] w-full max-w-[1200px] translate-y-[55px] flex-col items-center justify-center gap-y-[35px]`}
    >
      <div
        className={`flex w-[40%] min-w-[450px] flex-col items-center justify-center text-gray-200 `}
      >
        <h2 className={`font-[Garet] text-[31px] `}>change user</h2>
        <p className={`text-center font-[Poppins] text-[14px] `}>
          when you select a user to log in with , the current account will be
          saved in the logged accounts to remove it please click the delete user
          button below
        </p>
        <div
          className={`mt-[25px] flex w-[70%] items-center justify-center rounded-full  border bg-white py-[6px] font-[Poppins] text-[14px] text-gray-900 hover:border-white hover:bg-transparent hover:text-white hover:outline-[1px]`}
        >
          {SavedUser?.length} saved
        </div>
      </div>
      <div
        className={`hideScroller  flex h-[520px]  w-[50%] min-w-[410px] max-w-[85%] flex-col items-center justify-start overflow-y-scroll text-gray-100`}
      >
        {SavedUser?.map((account, accountIndex) => {
          return (
            <div
              className={`flex h-[140px] w-[380px] items-center justify-center gap-x-[12px] rounded-md bg-[#262626]`}
            >
              <img
                className={`aspect-square h-[110px] rounded-full `}
                src={account?.Avatar}
              />
              <div className={`h-full w-[210px] `}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

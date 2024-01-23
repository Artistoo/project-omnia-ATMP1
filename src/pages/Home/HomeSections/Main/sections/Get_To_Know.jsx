import React from "react";
import { BiArrowFromBottom, BiArrowToBottom } from "react-icons/bi";
import {
  BsArrowClockwise,
  BsArrowDownLeft,
  BsArrowDownSquareFill,
} from "react-icons/bs";
import { CgArrowBottomRightR } from "react-icons/cg";
import io from "socket.io-client";

export default function Get_To_Know() {
  /* the data state   */
  const [DataInsight, setDataInsight] = React.useState([
    {
      name: `channel_count`,
      field_data: 0,
      title: `Community Thrive`,
      subtitle: "user have joined",
    },
    {
      name: `users_count`,
      field_data: 0,
      title: `Diverse Channels`,
      subtitle: "channels have created",
    },
    {
      name: `total gain`,
      field_data: 0,
      title: `Fueling growth`,
      subtitle: "Money Raised",
    },
  ]);
  /* initializing the socket io connection to the server side  */
  const socket = io.connect("http://localhost:5500");
  /* the user effects  */
  React.useEffect(() => {
    socket.emit(
      "insight Data",
      ["channels_count", "users_count", "Raised"],

      (res) => {
        res.data.map((data, i) =>
          setDataInsight((c) => {
            const update = [...c];
            update[i].field_data = data;
            return update;
          })
        );
      }
    );
  }, []);

  const id = React.useId();

  return (
    <div
      className={`relative flex min-h-[320px] w-screen select-none flex-col items-start justify-center gap-y-[50px] bg-gradient-to-tl  from-gray-400 to-purple-300 p-[15px_20px] px-[40px] py-[30px]`}
    >
      <span
        className={`absolute top-0 flex   aspect-square w-[70px] -translate-y-1/2  translate-x-[-25px] items-center justify-center self-center rounded-full border border-black bg-white/90  font-bold text-black  backdrop-blur-lg`}
      >
        <BsArrowDownLeft size={30} />
      </span>
      <div
        className={`flex w-full flex-wrap items-center justify-between gap-y-[10px] `}
      >
        <h2
          className={`min-w-[300px] max-w-[360px] font-[brandinkLight] text-[35px] font-semibold text-black`}
        >
          Beyond Boundaries: Connect & Thrive
        </h2>
        <small
          className={`min-w-[400px] max-w-[470px] font-[openSauceReg] text-[14px] text-gray-700  [text-wrap:balance]`}
        >
          Welcome to the epicenter of the social media revolution! As we embark
          on this exhilarating journey, our community is rapidly expanding,
          creating a digital tapestry that reflects the diversity and vibrancy
          of our users.
        </small>
      </div>
      <div
        className={` flex min-h-[180px] w-full flex-wrap items-center justify-evenly gap-x-[15px] gap-y-[20px] px-[10px] min-[840px]:px-0`}
      >
        <div
          className={`flex w-[100%] min-w-[340px] flex-grow flex-wrap   items-center justify-around gap-[5px] md:min-w-[380px]  min-[840px]:w-[50%]`}
        >
          {DataInsight.map(({ name, field_data, subtitle, title }, index) => (
            <span
              key={`boxDataBoxHomePageLoged_${id}_${name}`}
              className={` h-[180px] w-[32%] min-w-[120px] flex-grow rounded-[20px] bg-gray-300`}
            >
              <div className={``}></div>
            </span>
          ))}
        </div>

        <div
          className={`flex h-[180px] w-[100%] min-w-[340px] flex-grow items-center justify-center rounded-[20px] bg-orange-300 md:min-w-[280px] min-[840px]:w-[45%] `}
        ></div>
      </div>
    </div>
  );
}

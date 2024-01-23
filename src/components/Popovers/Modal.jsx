import React from "react";
import { GrFormClose } from "react-icons/gr";
import { userStateContext } from "../../context/Data_context.jsx";
export default function Modal({
  children,
  switchCase,
  modalState,
  OnSwitch,
  onClose,
  handleModalState,
  closeMessage,
  showAvatar = false,
}) {
  const DeleteAccountPasswordConfirmRef = React.useRef();
  const Dialogstyle = DeleteAccountPasswordConfirmRef?.current?.style;

  const { loged } = React.useContext(userStateContext).userState;

  React.useEffect(() => {
    if (DeleteAccountPasswordConfirmRef.current && Dialogstyle) {
      let { opacity, pointerEvents } = Dialogstyle;
      if (modalState) {
        Dialogstyle.opacity = 1;
        Dialogstyle.pointerEvents = "auto";
        DeleteAccountPasswordConfirmRef.current.showModal();
      } else {
        Dialogstyle.opacity = 0;
        Dialogstyle.pointerEvents = "none";
        DeleteAccountPasswordConfirmRef.current.close();
      }
    }
  }, [modalState]);
  const handleCloseModal = () => {
    handleModalState();
  };
  return (
    <dialog
      style={{
        transition: "background 250ms , backdrop 3000ms 600ms   ease",
      }}
      ref={DeleteAccountPasswordConfirmRef}
      className={`${
        switchCase
          ? ` bg-transparent backdrop:backdrop-brightness-0`
          : ` bg-white backdrop:bg-black/20 backdrop:backdrop-brightness-50`
      } pointer-events-none z-10 m-auto flex min-h-[400px] min-w-[420px] max-w-[600px] flex-col items-center justify-start gap-y-[20px] self-end  overflow-hidden overflow-x-hidden opacity-0     max-[600px]:top-full max-[600px]:w-screen max-[600px]:-translate-y-[53%] lg:w-[400px]`}
    >
      {OnSwitch && OnSwitch instanceof Element && <OnSwitch />}

      {/* DIALOG EXIT ICON AND TEXT */}
      <div
        onClick={() => {
          {
            handleCloseModal();
            onClose &&
              Array.isArray(onClose) &&
              onClose.forEach((reset) => reset instanceof Function && reset());
          }
        }}
        className={`group z-[5] flex h-[50px] w-full items-center justify-center p-[5px]`}
      >
        {/* Cancel Deleting Account Button */}
        <div
          className={`relative  flex h-full w-[40%] translate-x-[-80%] translate-y-[60%] cursor-pointer items-center justify-between`}
        >
          <GrFormClose
            style={{
              transition: `transform 250ms    ease-in-out`,
            }}
            className="m-auto  translate-x-[-50px]  scale-[1.7] border border-transparent group-hover:rotate-[-180deg] group-hover:scale-[1.1] group-hover:rounded-full group-hover:border-white group-hover:bg-red-500 md:group-hover:translate-x-[-50px] "
          />
          {/* THE BORDER AND CHANGED MY MIND TEXT */}
          <div
            style={{
              transition: `border 250ms ease-in-out`,
            }}
            className={`absolute  hidden h-[50%] w-full translate-x-[5px] items-center justify-end rounded-full border border-transparent py-[10px] pr-[5px] group-hover:border-black md:flex`}
          >
            <p
              style={{
                transition: `opacity 250ms 300ms ease-in-out`,
              }}
              className={`w-max translate-x-[-5px] font-[Poppins] text-[11px]  text-gray-800 opacity-0 group-hover:opacity-100`}
            >
              {closeMessage}
            </p>
          </div>
        </div>
        {/* Dialog CurrentAccount  */}
        {showAvatar && (
          <img
            src={loged?.Avatar}
            alt={`avatar image`}
            className={`absolute aspect-square w-[21px] translate-y-full scale-[3] self-center rounded-full  border-[0.5px] border-white/50 object-cover `}
          />
        )}
      </div>
      {children}
    </dialog>
  );
}

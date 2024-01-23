import React from "react";
import { IoMdClose } from "react-icons/io";

export const ModelContext = React.createContext();

export default function Models({ children }) {
  const [Model, setModel] = React.useState({
    title: "",
    show: false,
    content: () => <div>hello gentlemen</div>,
    styling: {
      width: "md:w-[600px] min-w-[350px] w-[85%]",
      height: "min-h-[330px] h-[400px]",
      bg: "",
      container: "",
      Backdrop: ["backdrop-blur-md", "bg-black/10"],
    },
  });

  const GlobalDialog = React.useRef(null);
 

  /* React.useEffect(() => {
    if (GlobalDialog) {
      if (Model.show) {
        GlobalDialog.showModal();
      } else {
        GlobalDialog.close();
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setModel((c) => ({ ...c, show: false }));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [Model.show]);

  React.useEffect(() => {
    GlobalDialog && GlobalDialog.showModel();
  }, []); */

  return (
    <ModelContext.Provider value={{ ModelConfiguration: { setModel, Model } }}>
     {/*  <dialog
        ref={GlobalDialog}
        className={`inset-0 z-[15] m-auto flex h-[150px] w-[320px] items-center justify-center p-[12px] backdrop:bg-red-500/50 backdrop:backdrop-blur-md `}
      >
        <IoMdClose
          size={25}
          onClick={() => {
            if (GlobalDialog?.current) GlobalDialog?.current.close();
            else alert("no GlobalDialog");
          }}
          className={`scale-[3] hover:scale-[3.2]`}
        />
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id deserunt
        facilis earum eum, consectetur aliquam.
      </dialog> */}

      {children}
    </ModelContext.Provider>
  );
}

import React from "react";
import Channel_box from "../components/channel_box";
import { useFetchChannelsMutation } from "../../../../../redux/API";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { v4 } from "uuid";
import DOMPurify from "dompurify";

//UTILITIES
import handleClickOutside from "../../../../../utils/handleClickOutside.js";

//ICONS
import { FaArrowRight } from "react-icons/fa";
import { CiSearch, CiSquareRemove, CiWarning } from "react-icons/ci";
import {
  MdOutlineDescription,
  MdOutlineGroups3,
  MdOutlineTitle,
} from "react-icons/md";
import {
  AiOutlineCheck,
  AiOutlineClear,
  AiOutlineCrown,
  AiOutlineRadiusSetting,
} from "react-icons/ai";
import { BsCheckCircle, BsSortAlphaDown } from "react-icons/bs";
import { GiBarracksTent } from "react-icons/gi";
import { TbHeartHandshake } from "react-icons/tb";

const Channel_Container = ({
  filters,
  styling,
  user,
  filter_thro,
  sortBy,
  handleSortBy,
  showTypeOf,
}) => {
  //ROUTER DOM

  //API
  const [
    fetch_channels,
    {
      isLoading: isFetchingChannels,
      data: channels,
      error: error_fetching_channels,
    },
  ] = useFetchChannelsMutation();

  //STATE
  const [channelsArray, setChannelsArray] = React.useState([
    ...Array(8).fill(null),
  ]);
  const [emptyRespond, setEmptyRespond] = React.useState(false);
  const [onlyShow, setOnlyShow] = React.useState(false);

  //USE MEMO
  const memoizedFilters = React.useMemo(() => filters, [filters]);
  const memoizedFilterThro = React.useMemo(() => filter_thro, [filter_thro]);
  //use effect
  React.useEffect(() => {
    if (!localStorage?.user) navigate(`/`);
    const channel_api_req_payload = {
      userID: JSON.parse(localStorage?.user)?._id,
    };

    fetch_channels(channel_api_req_payload).then((res) => {
      console.log(res);
      try {
        const channelsArrayParsed = JSON.parse(res.data);
        if (Array.isArray(channelsArrayParsed)) {
          if (channelsArrayParsed.length) {
            setChannelsArray([...channelsArrayParsed]);
          } else {
            setEmptyRespond(true);
          }
        } else {
          console.log(res);
          setChannelsArray([[...Array(8).fill(null)]]);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  React.useEffect(() => {
    console.log(filter_thro.map((x) => x?.label));
    if (!localStorage?.user) navigate(`/`);
    const channel_api_req_payload = {
      userID: JSON.parse(localStorage?.user)?._id,
    };
    if (Object.keys(filters)?.length) {
      channel_api_req_payload.filters = filters;
    }

    if (Object.keys(filter_thro)?.length) {
      channel_api_req_payload.filter_thro = filter_thro;
    }

    fetch_channels(channel_api_req_payload).then((res) => {
      try {
        const channelsArrayParsed = JSON.parse(res.data);
        if (Array.isArray(channelsArrayParsed)) {
          if (channelsArrayParsed.length) {
            console.log([...channelsArrayParsed]);
            setChannelsArray([...channelsArrayParsed]);
            setEmptyRespond(false);
          } else {
            setEmptyRespond(true);
          }
        } else {
          console.log(res);
          setChannelsArray([[...Array(8).fill(null)]]);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }, [memoizedFilters, memoizedFilterThro]);

  /* SORTING  */
  React.useEffect(() => {
    const sortingFunction = {
      date: (x, y) => new Date(y?.Date) - new Date(x?.Date),
      likes: (x, y) => y?.LikedBy?.length - x?.LikedBy?.length,
      alphabetically: (x, y) => x?.Name?.localeCompare(y?.Name),
    };
    if (channelsArray?.length) {
      if (sortBy.some(({ selected }) => Boolean(selected))) {
        setChannelsArray((prev) =>
          [...prev].sort(
            sortingFunction[sortBy.filter(({ selected }) => selected)[0]?.by]
          )
        );
      }
    }
  }, [sortBy]);

  React.useEffect(() => {
    if (showTypeOf?.type) {
      setOnlyShow(showTypeOf?.type);
      if (
        !Boolean(
          channelsArray.filter((x) => x?.Type === showTypeOf?.type)?.length
        )
      ) {
        setEmptyRespond(true);
      } else {
        setEmptyRespond(false);
      }
    } else {
      setOnlyShow(false);
      setEmptyRespond(false);
    }
  }, [showTypeOf, channelsArray]);

  return (
    <div className={`flex  w-full flex-wrap items-center gap-[10px]   `}>
      {emptyRespond ? (
        <div
          className={` m-auto  flex h-[250px] items-center justify-center gap-x-[15px]  `}
        >
          <CiWarning
            size={45}
            fill={`yellow`}
            className={`
        transition-[transform] duration-[250ms] 
        ${isFetchingChannels ? `scale-[.7]` : `scale-100`}`}
          />
          <p
            className={`font-[brandinkLight] text-[14px] text-gray-200 ${
              isFetchingChannels
                ? `animate-pulse opacity-50`
                : `animate-none opacity-100`
            }`}
          >
            no{" "}
            <b className={` text-yellow-300 `}>
              {showTypeOf?.type || "result"}
            </b>{" "}
            found for your search :{" "}
            <b className={` text-yellow-300 `}>{filters?.search_filter}</b>
            <br />
            {!!filter_thro?.length && (
              <b className={` text-yellow-300 `}>
                {" "}
                in {filter_thro.map((thro) => thro?.label)?.join(" , ")}{" "}
              </b>
            )}
          </p>
        </div>
      ) : (
        <>
          {[...channelsArray].map((channel, channelIndex) => (
            <div
              id={`channel_container`}
              key={v4()}
              className={`channel_box  relative  flex h-[350px] w-[30%] min-w-[290px] flex-grow  select-none  overflow-hidden rounded-[10px] md:w-[32%] lg:max-w-[32%] md:flex-grow  
                ${
                  onlyShow
                    ? onlyShow === channel?.Type
                      ? `flex`
                      : `hidden`
                    : `flex`
                }`}
            >
              <Channel_box
                data={channel}
                user={user}
                isLoading={isFetchingChannels}
                channel_index={channelIndex}
                categoryIndex={channelIndex}
                styling={styling}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const FilterSideBar = ({
  filters,
  styling,
  handleSetFilters,
  handleSetFilterThro,
  handleSetShowTypeOf,
  showTypeOf,
}) => {
  //VARIABLES

  const [isFiltering, setIsFiltering] = React.useState(true);
  const [FilterNavOptions, setFilterNavOptions] = React.useState([
    {
      Icon: CiSearch,
      title: "filter channels",
      onClick: () => {
        const FilterInputID = document.getElementById("FilterInputID");
        if (!FilterInputID) return;
        setIsFiltering((prev) => {
          FilterInputID.classList.toggle("h-[60px]", prev);
          FilterInputID.classList.toggle("h-[0px]", !prev);
          FilterInputID.classList.toggle("mb-[15px]", prev);
          FilterInputID.classList.toggle("mb-[0px]", !prev);
          return !prev;
        });
      },
    },
    {
      Icon: {
        IconAt: 0,
        channelTypes: [
          { type: "", CategoryIcon: MdOutlineGroups3 },
          { type: "Tribe", CategoryIcon: GiBarracksTent },
          { type: "Community", CategoryIcon: TbHeartHandshake },
        ],
      },
      title: "Tribes or Community",
      onClick: () => {},
    },
  ]);

  React.useEffect(() => {
    setFilterNavOptions((prev) => {
      const update = [...prev];
      if (!!Object.keys(filters)?.length) {
        if (update.some((x) => x.title === "clear filter")) return update;
        update.push({
          Icon: AiOutlineClear,
          title: "clear filter",
          onClick: () => {
            handleSetFilters();
            handleSetFilterThro();
            handleSetShowTypeOf();
          },
        });
      } else {
        update.splice(2, 1, null);
        return update.filter(Boolean);
      }
      return update;
    });
  }, [filters]);

  return (
    <div
      className={`m-auto flex h-[500px] w-full flex-col  items-center justify-start rounded-md p-[5px] ${styling?.border} ${styling?.bg}`}
    >
      {FilterNavOptions.map(({ Icon, title, onClick }, itemIndex) => (
        <div
          onClick={() => onClick()}
          key={v4()}
          className={`flex h-[55px] w-full items-center justify-center gap-x-[5px] rounded-md p-[5px] hover:bg-gray-500/20 `}
        >
          {typeof Icon != "object" ? (
            React.createElement(
              !itemIndex ? (!isFiltering ? CiSquareRemove : Icon) : Icon,
              {
                size: 23,
              }
            )
          ) : (
            <div
              className={`relative flex h-full w-full flex-col items-center justify-start overflow-hidden `}
            >
              <div
                style={{
                  transition: `transform 2500ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
                  translate: `0 -${
                    (100 / Icon.channelTypes?.length) *
                    (!showTypeOf ? 0 : Icon.IconAt)
                  }%`,
                }}
                className={` absolute flex h-[300%] w-full  flex-col`}
              >
                {Icon.channelTypes.map(
                  (Channel_type_icon, channelTypeIconIndex) => (
                    <div
                      title={Channel_type_icon.type}
                      key={v4()}
                      onClick={() => {
                        setFilterNavOptions((prev) =>
                          prev.map((x, i) => {
                            let updateIcon = { ...x };
                            if (i === 1) {
                              updateIcon = {
                                ...x,
                                Icon: {
                                  ...x.Icon,
                                  IconAt:
                                    x.Icon?.IconAt ===
                                    x.Icon?.channelTypes.length - 1
                                      ? 0
                                      : x.Icon.IconAt + 1,
                                },
                              };
                              handleSetShowTypeOf(
                                updateIcon.Icon.channelTypes[
                                  updateIcon.Icon.IconAt
                                ]
                              );
                            } else {
                              updateIcon = x;
                            }
                            return updateIcon;
                          })
                        );
                      }}
                      className={`flex h-1/3 w-full items-center justify-center rounded-md `}
                    >
                      <Channel_type_icon.CategoryIcon size={23} />
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const FilterButtonAndOptions = {
  FilterThro: ({ handleSetFilterThro, styling, filters, filter_thro }) => {
    const [filter_thro_items, setFilter_thro_items] = React.useState([
      { label: "Title", title: "Name", type: "reg", isSelected: false },
      {
        label: "Describtion",
        title: "Describtion",
        type: "in",
        isSelected: false,
      },
      { label: "Admin name", title: "Admin", type: "reg", isSelected: false },
      {
        label: "categories",
        title: "Categories",
        type: "in",
        isSelected: false,
      },
    ]);
    return (
      <>
        <div
          onClick={(e) => {
            const FilterThroDialog =
              document.getElementById("FilterThroDialog");
            if (!FilterThroDialog) return;
            FilterThroDialog.showPopover();
          }}
          className={`absolute h-full w-full rounded-md opacity-0 `}
        />
        <div
          style={{
            height: !filter_thro?.length
              ? 0
              : `${(100 / filter_thro_items.length) * filter_thro?.length}%`,
          }}
          className={`pointer-events-none absolute bottom-0 -z-10 w-full bg-gray-500/20`}
        />
        <AiOutlineRadiusSetting size={22} className={`text-gray-300`} />
        <div
          popover={"auto"}
          style={{
            transition: `opacity 250ms ease`,
          }}
          id={`FilterThroDialog`}
          className={` hideScroller z-10 m-auto h-[270px]  w-[250px] select-none rounded-md  backdrop:bg-black/50   `}
        >
          <div
            className={`absolute flex h-full w-full flex-col items-center justify-start gap-y-[15px] p-[8px]`}
          >
            <div
              className={`flex h-[20%] items-center justify-start font-[openSauce] text-[18px] text-black`}
            >
              Select Filtering Feilds
            </div>
            <div
              className={`flex h-[80%] w-full flex-col items-center justify-start gap-y-[5px]`}
            >
              {filter_thro_items.map((item, itemIndex) => (
                <div
                  onClick={() => {
                    setFilter_thro_items((c) =>
                      c.map((itemIn, index, itemsArray) =>
                        itemIn.title === item.title
                          ? {
                              ...itemIn,
                              isSelected: !itemIn.isSelected,
                            }
                          : itemIn
                      )
                    );
                  }}
                  key={v4()}
                  className={`flex h-[34px] w-full items-center justify-start gap-x-[8px] rounded-[5px] px-[8px] font-[openSauceReg] text-[13px] transition-[background] duration-[500ms]  ${
                    filter_thro?.some((x) => x?.title === item.title)
                      ? !item?.isSelected
                        ? `bg-green-200/50 `
                        : `bg-green-200/100 hover:bg-red-200/80`
                      : item?.isSelected
                      ? `bg-black text-white`
                      : `bg-transparent text-gray-900 hover:bg-gray-500/30`
                  }
                 `}
                >
                  {item.label}
                </div>
              ))}
            </div>
            {/* BUTTTON */}
            <button
              onClick={() => {
                const FilterThroDialog =
                  document.getElementById("FilterThroDialog");
                if (!FilterThroDialog) return;
                handleSetFilterThro(
                  filter_thro_items.filter((item) => item.isSelected)
                );
                FilterThroDialog.hidePopover();
              }}
              className={`flex h-[45px] w-full items-center justify-center rounded-md  border border-black bg-transparent font-[openSauceReg] text-[14px] text-gray-900 hover:bg-black hover:text-gray-50`}
            >
              confirm
            </button>
          </div>
        </div>
        <span
          className={`absolute bottom-0 right-[2px] m-[1px] h-max w-max font-[openSauceReg] text-[11px] text-gray-200/80`}
        >
          <small>{Boolean(filter_thro?.length) && filter_thro?.length}</small>
        </span>
      </>
    );
  },
  SortBy: ({ sortBy, handleSortBy }) => {
    return (
      <>
        <div
          onClick={() => {
            const sortChannelsPageButton = document.getElementById(
              "sortChannelsPageButton"
            );
            if (!sortChannelsPageButton) return;
            sortChannelsPageButton.showPopover();
          }}
          className={`absolute h-full w-full`}
        />
        <BsSortAlphaDown size={22} />

        <div
          id={`sortChannelsPageButton`}
          popover={`auto`}
          className={`hideScroller m-auto h-[200px] w-[250px] rounded-md `}
        >
          <div
            className={`absolute flex h-full w-full flex-col items-center justify-center gap-y-[8px] p-[10px]`}
          >
            <h2 className={`h-[15%] w-full  font-[openSauce] text-[20px]`}>
              sort by
            </h2>
            <div
              className={`flex h-[70%] w-full flex-col items-center justify-center gap-y-[4px]  `}
            >
              {["date", "likes", "alphabetically"].map((sort) => (
                <div
                  key={v4()}
                  onClick={() => {
                    handleSortBy(sort);
                  }}
                  className={`flex h-[30%] w-full items-center justify-start gap-x-[10px] rounded-md px-[5px] font-[openSauceReg] text-[14px]  hover:bg-gray-200/50`}
                >
                  <BsCheckCircle
                    size={15}
                    className={`${
                      sortBy.filter(({ selected }) => selected)[0]?.by === sort
                        ? `opacity-100`
                        : `opacity-0`
                    }`}
                  />

                  <p>{sort}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  },
};

export default function HomePageChannels() {
  const navigate = useNavigate();
  //VARIABLES
  const user = localStorage?.user && JSON.parse(localStorage?.user);
  const styling = {
    bg: `bg-gradient-to-tl from-[#141414c2] to-[#1b1b1bc0]`,
    border: `border-[0.5px] border-gray-700`,
  };

  //COMPONENTS
  const [filters, setFilters] = React.useState({});
  const [filter_thro, setFilter_thro] = React.useState([]);
  const [showTypeOf, setShowTypeOf] = React.useState(0);
  const [sortBy, setSortBy] = React.useState([
    {
      by: "date",
      selected: false,
    },
    {
      by: "likes",
      selected: false,
    },
    {
      by: "alphabetically",
      selected: false,
    },
  ]);

  const handleSetFilters = (filterArg) => {
    if (filterArg) {
      setFilters((c) => ({ ...c, ...filterArg }));
    } else {
      setFilters((c) => (c = {}));
    }
  };
  const handleSetFilterThro = (filterThro) => {
    setFilter_thro((c) => filterThro || []);
  };
  const handleSortBy = (by) => {
    setSortBy((prev) =>
      prev.map((byObj) =>
        byObj.by === by
          ? { ...byObj, selected: true }
          : { ...byObj, selected: false }
      )
    );
  };
  const handleSetShowTypeOf = (type) => {
    setShowTypeOf(type);
  };

  const data_to_pass = {
    filters,
    styling,
    user,
    filter_thro,
    sortBy,
    showTypeOf,
    handleSetFilterThro,
    handleSortBy,
    handleSetShowTypeOf,
    handleSetFilters,
  };

  return (
    <div
      className={`relative  flex  w-full  items-start justify-around gap-0 border p-[10px] md:gap-[10px]`}
    >
      <div className={` top-0 w-[10%] min-w-[50px] md:w-[5%] `}>
        <FilterSideBar {...data_to_pass} />
      </div>

      <div
        className={`relative flex w-[90%] flex-col items-center justify-center px-[15px] md:w-[93%] md:px-0 `}
      >
        <div
          id={"FilterInputID"}
          style={{
            transition: `height 150ms ease`,
          }}
          className={`relative flex h-0 w-full items-center justify-start gap-x-[10px]  overflow-hidden `}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSetFilters({
                search_filter: DOMPurify.sanitize(
                  e.target.search_filter_input.value
                ),
              });
            }}
            className={`justfiy-center relative top-0 flex h-full  min-h-[55px] w-1/2 max-w-[74%] flex-grow items-center rounded-md md:flex-none  ${styling?.bg} ${styling?.border} `}
          >
            <input
              name={`search_filter_input`}
              placeholder={`search channels`}
              className={`absolute h-full w-full bg-transparent pl-[15px] font-[openSauceReg] text-gray-200 outline-none placeholder:text-gray-600`}
            />

            {/* SEARCH ICON  */}
            <div
              onClick={() => {
                const search_filter_input = document.querySelector(
                  '[name="search_filter_input"]'
                );
                const { value } = search_filter_input;
                if (!search_filter_input) return;
                handleSetFilters({
                  search_filter: value,
                });
              }}
              className={`group absolute right-0 flex aspect-square h-[58px] cursor-pointer items-center  justify-center rounded-r-md border border-gray-700/20 bg-gray-800/50 transition-[background] hover:bg-gray-900/80`}
            >
              <CiSearch size={18} />
            </div>
          </form>
          <span
            className={`relative flex  h-full w-[25%] max-w-[130px]  items-center justify-between `}
          >
            {Object.values(FilterButtonAndOptions).map(
              (Button, ButtonIndex) => (
                <div
                  style={{
                    transition: `transform 250ms ease`,
                  }}
                  key={v4()}
                  className={` group  flex h-full w-[48%]  cursor-pointer items-center justify-center rounded-md  
                   
                  ${styling?.border} ${styling?.bg} 
                  ${
                    Object.keys(filters)?.length
                      ? `flex opacity-100`
                      : !ButtonIndex
                      ? ` pointer-events-none translate-x-[-100%] opacity-0`
                      : " translate-x-[-100%] opacity-100"
                  }`}
                >
                  <Button {...data_to_pass} />
                </div>
              )
            )}
          </span>
        </div>
        <Channel_Container {...data_to_pass} />
      </div>
    </div>
  );
}

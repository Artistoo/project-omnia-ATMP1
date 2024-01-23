import React from "react";

import Gender from "../../../assets/icons/gender.jsx";

//icons
import { HiArrowSmDown, HiOutlineFilter } from "react-icons/hi";
import { GiFemale, GiMale, GiPlanetConquest } from "react-icons/gi";
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";
import { GoEyeClosed } from "react-icons/go";

//API
import { useListOfCountriesQuery } from "../../../redux/API";
import { GrTarget } from "react-icons/gr";

export default function SearchFilter({ searchParam, FilterData }) {
  const { setFilterQuery, FilterQuery } = FilterData;
  const FilterWGRef = React.useRef();
  const countriesDialog = React.useRef();

  const {
    data: countriesList,
    isLoading: isFetchingCountries,
    error: countriesApiError,
  } = useListOfCountriesQuery();
  const CountriesMemo = React.useMemo(() => countriesList, [countriesList]);

  const [searchFilter, setSearchFilter] = React.useState([
    [
      {
        param: "gender",
        content: [
          { opt: "male", icon: GiMale, hoverColor: "blue" },
          { opt: "female", icon: GiFemale, hoverColor: "pink" },
        ],
        type: "enum",
        title: `choose gender`,
        value: false,
      },
      {
        param: "location",
        content: () => CountriesMemo,
        type: "select",
        title: `choose location`,
        value: false,
      },
    ],
    [],
  ]);
  const [autoComplet, setAutoComplet] = React.useState("");

  //Functions
  const handleOpenCountriesListFilter = (sm) => {
    if (countriesDialog.current) {
      countriesDialog.current.open
        ? countriesDialog.current.close()
        : sm
        ? countriesDialog.current.showModal()
        : countriesDialog.current.show();
    }
  };

  //USEEFFECT
  React.useEffect(() => {
    setFilterQuery((c) => {
      const update = { ...c };
      searchFilter[0].forEach((selectedOption) => {
        if (selectedOption.value) {
          update.Filter[selectedOption.param] = selectedOption.value;
        } else {
          delete update.Filter[selectedOption.param];
        }
      });
      return update;
    });
  }, [searchFilter]);
  /* CLOSING THE DIALOG ON WINDOW RESIZE  */
  React.useEffect(() => {
    const closeDialog = () => {
      FilterWGRef.current &&
        window.innerWidth >= 768 &&
        FilterWGRef.current.close();
    };
    window.addEventListener("resize", closeDialog);
    return () => window.removeEventListener("resize", closeDialog);
  }, [window.innerWidth]);

  const FilterComponents = React.memo(({ display, onClick }) => {
    const sm = display === "sm";
    return (
      <div
        className={` absolute  flex h-full w-full flex-col rounded-md backdrop-blur-[12px] md:bg-gradient-to-tl md:from-[#202020] md:to-[#252525] `}
      >
        {/* Search Filter Header  */}
        <div
          className={`w-fill relative flex h-[17%]  flex-col items-center justify-center bg-[#2525252] px-[10px]  font-[garet] `}
        >
          {/* THE FILTER HEADER CONTAINER  */}
          <div
            className={`flex w-[93%] items-center justify-between px-[5px] `}
          >
            <h2 className={`text-[14px] `}>filter your search</h2>
            <div
              className={`group flex h-full w-auto  items-center justify-center gap-x-[25px]`}
            >
              <HiOutlineFilter
                onClick={() => {
                  setSearchFilter((c) => {
                    const update = [...c];
                    update[0].forEach((p) => {
                      p.value = false;
                    });
                    return update;
                  });
                }}
                style={{
                  transition: `transform 250ms `,
                }}
                className={` scale-100 cursor-auto text-gray-500 ${
                  Boolean(searchFilter[0].some((p) => p.value)) &&
                  `cursor-pointer  `
                }`}
              />
              {sm && (
                <GoEyeClosed
                  onClick={() => {
                    if (FilterWGRef.current) {
                      FilterWGRef.current.close();
                    }
                  }}
                  title={"hide filter"}
                  className={`cursor-pointer hover:text-orange-600`}
                />
              )}
              <div
                style={{
                  transition: `transform 250ms ease`,
                }}
                className={`pointer-events-none absolute h-[1.8px] w-[17px] origin-bottom translate-y-[-2px] rotate-[50deg] scale-x-0  bg-gray-50 ${
                  Boolean(searchFilter[0].some((p) => p.value)) &&
                  `  group-hover:scale-x-100`
                }`}
              />
            </div>
          </div>
          {/* The line Between the Header and the filter content */}
          <span
            className={`absolute bottom-0 h-[2.5px] w-full bg-gradient-to-l from-blue-700 via-purple-300 to-teal-400 opacity-50 `}
          />
        </div>

        {/* Search Parameter  */}
        <div
          className={`hideScroller flex h-[83%] w-full flex-col  items-start  justify-start gap-y-[15px]  px-[10px] pt-[15px] font-[openSauceReg] `}
        >
          {searchFilter.map((filter, categoryIndex) => {
            /* COMMUNITIES _____ USERS */
            return (
              <div
                key={`filterCategory${categoryIndex}`}
                className={`h-[150px] min-h-max w-full rounded-md  `}
              >
                {/* EACH PARAMETER WITHIN EACH CATEGORY */}
                {filter?.map((param, paramIndex) => (
                  <div
                    key={param.title}
                    className={` relative flex h-max w-full items-center  justify-center py-[8px]`}
                  >
                    {(() => {
                      switch (param.type) {
                        /* INPUT TYPE INPUTS */
                        case "enum":
                          return (
                            <div
                              className={`group mb-[5px] flex h-max w-full items-center justify-around py-[3px]`}
                            >
                              <div
                                style={{
                                  transition: `transform 150ms  ease-in , opacity  150ms ease `,
                                }}
                                className={`flex w-[40%] items-center justify-start `}
                              >
                                <small>{param?.title}</small>
                              </div>
                              <div
                                className={`flex w-[60%] items-center justify-around`}
                              >
                                {param.content?.map((option, optionIndex) => (
                                  <div
                                    key={option.opt}
                                    onClick={() => {
                                      setSearchFilter((c) => {
                                        const update = [...c];
                                        const currentParam =
                                          update[categoryIndex][paramIndex];
                                        if (currentParam.type === "enum") {
                                          const isSelected =
                                            currentParam.value === option.opt;
                                          currentParam.value = isSelected
                                            ? false
                                            : option.opt;
                                        }
                                        return update;
                                      });
                                    }}
                                    className={`group/optionContainer relative cursor-pointer  hover:outline-${
                                      option?.borderColor
                                    }-500 flex w-[45%] scale-[0.90] items-center justify-center overflow-hidden rounded-full px-[5px] py-[3px] outline  outline-[0.4px] ${
                                      option.opt === param.value
                                        ? "border-green-400 bg-green-400"
                                        : ``
                                    }`}
                                  >
                                    {option?.icon && (
                                      <div
                                        className={`absolute flex h-full w-full items-center justify-start overflow-hidden opacity-0 transition-opacity duration-[300ms] hover:delay-[300ms] group-hover/optionContainer:opacity-100 `}
                                      >
                                        <option.icon
                                          style={{
                                            transition: `transform 250ms 300ms ease   `,
                                          }}
                                          className={`absolute left-[10px] translate-x-[-20px]  border-none group-hover/optionContainer:translate-x-[-3px] group-hover/optionContainer:scale-[1.2]`}
                                        />
                                      </div>
                                    )}
                                    <small
                                      style={{
                                        transition: `transform 250ms ease   `,
                                      }}
                                      className={`group-hover/optionContainer:translate-x-[8px] group-hover/optionContainer:scale-[0.8]`}
                                    >
                                      {option.opt}
                                    </small>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );

                        /* SELECT TYPE INPUTS */
                        case "select":
                          return (
                            <div
                              className={` relative  flex h-[33px] w-full cursor-pointer  items-center justify-start rounded-sm border-[0.5px]   text-sm ${
                                sm ? `border-black` : `border-white`
                              } `}
                            >
                              {/* COUNTRIES LIST DIALOG */}
                              {sm ? (
                                <div
                                  className={`relative flex h-full w-full items-center justify-start px-[6px] text-[13px]`}
                                >
                                  <button
                                    popovertarget={"countriesWGPopover"}
                                    className={`absolute h-full w-full opacity-0`}
                                  />
                                  <p>{param.value || `select a country`}</p>
                                  <div
                                    id={`countriesWGPopover`}
                                    popover={`auto`}
                                    className={` hideScroller m-auto h-[320px] w-[300px] translate-y-1/2  overflow-y-scroll rounded-md backdrop:bg-black/60`}
                                  >
                                    {[
                                      {
                                        name: { common: `select a country` },
                                      },
                                      ...(countriesList || []),
                                    ]?.map((country, countryIndex) => (
                                      <span
                                        key={country?.name?.common}
                                        onClick={() => {
                                          setSearchFilter((current) => {
                                            const update = [...current];
                                            update[categoryIndex][paramIndex] =
                                              {
                                                ...update[categoryIndex][
                                                  paramIndex
                                                ],
                                                value:
                                                  country?.name?.common.includes(
                                                    `select`
                                                  )
                                                    ? false
                                                    : country?.name?.common,
                                              };
                                            return update;
                                          });
                                        }}
                                        className={`my-[3px] flex w-full items-center justify-start px-[10px] text-[13px] `}
                                      >
                                        <p
                                          className={`rounded-sm px-[8px] py-[3px] ${
                                            !countryIndex &&
                                            `bg-black text-white`
                                          }`}
                                        >
                                          {country?.name?.common}
                                        </p>
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <div
                                  onClick={() =>
                                    handleOpenCountriesListFilter(sm)
                                  }
                                  className={`absolute flex h-full w-full flex-col  items-start justify-center px-[5px] pl-[15px] `}
                                >
                                  {(() => {
                                    const index = (
                                      countriesList || []
                                    ).findIndex(
                                      (x) => x?.name?.common === param?.value
                                    );

                                    const selectedCountry =
                                      index >= 1 && countriesList[index];
                                    return (
                                      <>
                                        <AiOutlineArrowDown
                                          className={`absolute right-[15px] `}
                                        />
                                        <h2
                                          className={` w-[80%] truncate ${
                                            param.value
                                              ? `translate-x-[15px]`
                                              : `translate-x-[0px]`
                                          }`}
                                        >
                                          {param.value
                                            ? selectedCountry?.name?.common
                                            : `select a country`}
                                        </h2>
                                        {param?.value && (
                                          <img
                                            src={selectedCountry?.flags?.png}
                                            className={`absolute left-[11px] aspect-square w-[12px] rounded-md`}
                                          />
                                        )}
                                      </>
                                    );
                                  })()}
                                  <dialog
                                    ref={countriesDialog}
                                    className={`   m-auto h-[270px] w-full translate-y-[60%] rounded-md bg-transparent p-0 `}
                                  >
                                    {" "}
                                    <div
                                      style={{
                                        scrollbarGutter: "stable",
                                      }}
                                      className={`hideScroller absolute m-auto flex  h-full w-full flex-col items-center justify-start overflow-y-scroll rounded-md bg-white px-[8px] py-[8px] `}
                                    >
                                      {countriesList?.map((country) => (
                                        <div
                                          key={country?.name?.common}
                                          onClick={() => {
                                            setSearchFilter((c) => {
                                              let update = [...c];
                                              if (param.param === "location") {
                                                update[0][1] = {
                                                  ...update[0][1],
                                                  value: country?.name?.common,
                                                };
                                              }
                                              return update;
                                            });
                                            if (countriesDialog.current) {
                                              countriesDialog.current.close();
                                            }
                                          }}
                                          className={`group my-[2px] flex h-[20px] w-full cursor-pointer items-center justify-start text-black`}
                                        >
                                          <h3
                                            style={{
                                              transition: `transform 200ms cubic-bezier(0.64, 0, 0.36, 1)`,
                                            }}
                                            className={`group-hover:translate-x-[20px]`}
                                          >
                                            {country?.name?.common}
                                          </h3>
                                          <img
                                            style={{
                                              transition: `transform 200ms cubic-bezier(0.64, 0, 0.36, 1)`,
                                            }}
                                            src={country?.flags?.png}
                                            className={`object-fit absolute h-[15px] w-[15px] translate-x-[-200%] rounded-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 `}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </dialog>
                                </div>
                              )}
                            </div>
                          );

                        default:
                          return;
                      }
                    })()}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <>
      {/* THE LITTLE SMALL STICKY WEDGET IN THE BOTTOM OF THE SCREEN */}
      <div
        onClick={() => {
          FilterWGRef.current && FilterWGRef.current.open
            ? FilterWGRef.current.close()
            : FilterWGRef.current.showModal();
        }}
        className={`fixed left-full top-full flex aspect-square w-[55px] -translate-x-[120%] -translate-y-[120%] cursor-pointer items-center justify-center rounded-full bg-purple-500/50 text-gray-50 mix-blend-lighten backdrop-blur-sm   hover:bg-gray-700/30  md:hidden `}
      >
        <HiOutlineFilter size={22} />
      </div>

      <dialog
        ref={FilterWGRef}
        className={`m-auto h-[350px]  w-[320px] overflow-visible bg-transparent p-0 `}
      >
        <div
          className={`relative flex h-full w-full  flex-col items-center justify-center overflow-visible rounded-md bg-white `}
        >
          <FilterComponents display={`sm`} />
        </div>
      </dialog>

      {/* THE FILTER CONTENT CONTAINER */}
      <div className={`hidden text-gray-50 md:flex `}>
        <FilterComponents
          display={"lg"}
          onClick={() => {
            if (countriesDialog.current) {
              if (countriesDialog.current.open) {
                countriesDialog.current.close();
              } else {
                countriesDialog.current.show();
              }
            }
          }}
        />
      </div>
    </>
  );
}

import React from "react";
import { useRouter } from "next/router";
import { json2query } from "../util";
import { RiArrowDropDownFill, RiArrowDropRightFill } from "react-icons/ri";
import { useState } from "react";

export const Filters = (props) => {
  const [showFilters, setShowFilters] = useState({});
  const router = useRouter();
  let { traits = "" } = router.query;
  const { allTraits } = props;
  const filters = Object.keys(allTraits);

  const handleChange = (filter, trait) => {
    props.setShowMenu(false);
    traits = traits ? traits : "";
    traits = traits.split(",").filter((val) => val);
    traits.push(`${filter}:${trait}`);
    router.push(`?${json2query({ ...router.query, traits, page_id: 0 })}`);
  };

  return (
    <div className="max-w-sm w-full text-xs mt-4">
      {filters.map((filter, index) => {
        return (
          <>
            {/* if there is one common attribute, no need to filter based on that */}
            {Object.keys(allTraits[filter]["attributes"]).length > 1 && (
              <div className="w-full flex flex-col px-2 mt-4">
                <h2
                  className="text-gray-700 flex uppercase items-center text-xs font-bold mb-2 cursor-pointer"
                  onClick={() => {
                    let tmpShowFilter = { ...showFilters };
                    tmpShowFilter[filter] = !tmpShowFilter[filter];
                    setShowFilters(tmpShowFilter);
                  }}
                >
                  <span className="text-xl">
                    {showFilters[filter] ? (
                      <RiArrowDropRightFill />
                    ) : (
                      <RiArrowDropDownFill />
                    )}
                  </span>{" "}
                  {filter}
                </h2>
                {!showFilters[filter] &&
                  Object.keys(allTraits[filter]["attributes"])
                    .sort((filter1, filter2) => {
                      return (
                        allTraits[filter]["attributes"][filter1].count -
                        allTraits[filter]["attributes"][filter2].count
                      );
                    })
                    .map((val) => (
                      <a
                        className={`bg-white cursor-pointer hover:bg-gray-300 hover:text-gray-900 rounded-md text-gray-700 py-2 px-2 ml-2 flex`}
                        onClick={() => handleChange(filter, val)}
                      >
                        {val} ({allTraits[filter]["attributes"][val].count})
                      </a>
                    ))}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

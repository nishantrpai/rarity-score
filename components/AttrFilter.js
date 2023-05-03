import React, { useState } from "react";
import { useRouter } from "next/router";
import { RiArrowDropDownFill, RiArrowDropRightFill } from "react-icons/ri";
import { json2query } from "../util";

export const AttrFilter = (props) => {
  const [showFilters, setShowFilters] = useState({});
  const router = useRouter();
  let { attr_count = "" } = router.query;
  const { attrCount } = props;
  const filters = Object.keys(attrCount);

  const handleChange = (attr_count) => {
    props.setShowMenu(false);
    router.push(`?${json2query({ ...router.query, attr_count })}`);
  };

  return (
    <>
      {filters.length > 1 && (
        <div className="text-xs mt-4" onChange={handleChange}>
          <h3
            className="font-bold px-2 text-gray-700 flex items-center uppercase mb-2"
            onClick={() => {
              setShowFilters(!showFilters);
            }}
          >
            <span className="text-xl">
              {!showFilters ? (
                <RiArrowDropRightFill />
              ) : (
                <RiArrowDropDownFill />
              )}
            </span>
            Attributes
          </h3>
          {showFilters && (
            <div className="px-2">
              {filters.map((filter) => (
                <a
                  className={`bg-white hover:bg-gray-300 rounded-md cursor-pointer text-gray-800 py-2 px-1 ml-2 w-full flex`}
                  onClick={() => handleChange(filter)}
                >
                  {filter} ({attrCount[filter]})
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

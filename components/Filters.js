import React from "react";
import { useRouter } from "next/router";
import { json2query } from "../util";

export const Filters = (props) => {
  const router = useRouter();
  let { traits = "" } = router.query;
  const { allTraits } = props;
  const filters = Object.keys(allTraits);

  const handleChange = (trait) => {
    props.setShowMenu(false);
    traits = traits ? traits : "";
    traits = traits.split(",").filter((val) => val);
    traits.push(trait);
    router.push(`?${json2query({ ...router.query, traits, page_id: 0 })}`);
  };

  return (
    <div className="max-w-sm w-full text-xs mt-4" onChange={handleChange}>
      {filters.map((filter, index) => {
        return (
          <>
            {/* if there is one common attribute, no need to filter based on that */}
            {Object.keys(allTraits[filter]).length > 1 && (
              <div className="w-full flex flex-col px-2 mt-4">
                <h2 className="text-gray-700 uppercase font-bold mb-2">
                  {filter}
                </h2>
                {Object.keys(allTraits[filter]).map((val) => (
                  <a
                    className={`bg-white cursor-pointer hover:bg-gray-300 hover:text-gray-900 rounded-md text-gray-700 py-2 px-1 flex`}
                    onClick={() => handleChange(val)}
                  >
                    {val} ({allTraits[filter][val]})
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

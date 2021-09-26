import React from "react";
import { useRouter } from "next/router";
import { ImSortNumbericDesc, ImSortNumericAsc } from "react-icons/im";
import { json2query } from "../util";

export const Tools = (props) => {
  const router = useRouter();
  const { sort_by = "rarity_score", order = "desc" } = router.query;
  const handleChange = (option) => {
    props.setShowMenu(false);
    if (option.toLowerCase().includes("rarity")) {
      if (option.includes("desc")) {
        router.push(
          `?${json2query({
            ...router.query,
            sort_by: "rarity_score",
            order: "desc",
            page_id: 0,
          })}`
        );
      }
      if (option.includes("asc")) {
        router.push(
          `?${json2query({
            ...router.query,
            sort_by: "rarity_score",
            order: "asc",
            page_id: 0,
          })}`
        );
      }
    }

    if (option.toLowerCase().includes("id")) {
      if (option.includes("desc")) {
        router.push(
          `?${json2query({
            ...router.query,
            sort_by: "id",
            order: "desc",
            page_id: 0,
          })}`
        );
      }
      if (option.includes("asc")) {
        router.push(
          `?${json2query({
            ...router.query,
            sort_by: "id",
            order: "asc",
            page_id: 0,
          })}`
        );
      }
    }
  };

  return (
    <div onChange={handleChange} className="px-2 mt-4">
      <h3 className="text-xs text-gray-700 uppercase mb-2 font-bold">
        Sort By
      </h3>
      {!(sort_by == "rarity_score" && order == "desc") && (
        <a
          className="hover:bg-gray-300 hover:text-gray-900  cursor-pointer text-xs text-gray-700 py-2 px-2 rounded-md w-full flex items-center"
          onClick={() => {
            handleChange("rarity desc");
          }}
        >
          <span c lassName="text-xs">
            <ImSortNumbericDesc />
          </span>
          <span className="text-xs">&nbsp;&nbsp;Rarity</span>
        </a>
      )}
      {!(sort_by == "rarity_score" && order == "asc") && (
        <a
          className="hover:bg-gray-300 hover:text-gray-900 cursor-pointer text-gray-700 py-2 px-2 rounded-md w-full flex items-center"
          onClick={() => {
            handleChange("rarity asc");
          }}
        >
          <span className="text-xs">
            <ImSortNumericAsc />
          </span>
          <span className="text-xs">&nbsp;&nbsp;Rarity</span>
        </a>
      )}
      {!(sort_by == "id" && order == "desc") && (
        <a
          className="hover:bg-gray-300 hover:text-gray-900 cursor-pointer text-gray-700 py-2 px-2 rounded-md w-full flex items-center"
          onClick={() => {
            handleChange("id desc");
          }}
        >
          <span className="text-xs">
            <ImSortNumbericDesc />
          </span>
          <span className="text-xs">&nbsp;&nbsp;Token ID</span>
        </a>
      )}
      {!(sort_by == "id" && order == "asc") && (
        <a
          className="hover:bg-gray-300 hover:text-gray-900 cursor-pointer text-gray-700 py-2 px-2 rounded-md w-full flex items-center"
          onClick={() => {
            handleChange("id asc");
          }}
        >
          <span className="text-xs">
            <ImSortNumericAsc />
          </span>
          <span className="text-xs">&nbsp;&nbsp;Token ID</span>
        </a>
      )}
    </div>
  );
};

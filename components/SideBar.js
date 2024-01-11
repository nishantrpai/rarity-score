import React from "react";
import { useRouter } from "next/router";
import { Tools } from "./Tools";
import { Filters } from "./Filters";
import { AttrFilter } from "./AttrFilter";
import { Search } from "./Search";

export const SideBar = (props) => {
  const router = useRouter();
  const { all_traits, attr_count, showMenu, setShowMenu } = props;

  return (
    <div
      className={`absolute sm:relative ${
        !showMenu ? "hidden" : "block"
      } sm:block border-r-2 border-gray-200	 h-50 max-h-screen overflow-auto max-w-full sm:max-w-xs w-full bg-white`}
    >
      <Search {...router.query} setShowMenu={setShowMenu} />
      <Tools {...router.query} setShowMenu={setShowMenu} />
      <Filters allTraits={all_traits} setShowMenu={setShowMenu} />
      <AttrFilter attrCount={attr_count} setShowMenu={setShowMenu} />
    </div>
  );
};

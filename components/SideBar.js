import React from 'react';
import { useRouter } from 'next/router';
import { Tools } from './Tools';
import { Filters } from './Filters';
import { AttrFilter } from './AttrFilter';


export const SideBar = (props) => {
  const router = useRouter();
  const { all_traits, attr_count } = props;

  return (
    <div className="hidden sm:block border h-50 max-h-screen overflow-auto max-w-xs w-full bg-white">
      <Tools {...router.query} />
      <Filters allTraits={all_traits} />
      <AttrFilter attrCount={attr_count} />
    </div>
  )
}
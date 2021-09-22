import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { json2query } from '../util';

export const AttrFilter = (props) => {
  const router = useRouter();
  let { attr_count = '' } = router.query;
  const { attrCount } = props;
  const filters = Object.keys(attrCount);

  const handleChange = (attr_count) => {
    router.push(`?${json2query({ ...router.query, attr_count })}`);
  }

  return (
    <div className="text-xs" onChange={handleChange}>
      <h3 className="font-bold px-2">Attributes</h3>
      {filters.map(filter =>
        <option
          className={`bg-gray-100 hover:bg-gray-300 cursor-pointer text-gray-800 py-2 px-4 w-full`}
          onClick={() => handleChange(filter)}
        >
          {filter} ({attrCount[filter]})
        </option>
      )}
    </div>
  )
}


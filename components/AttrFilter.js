import React from 'react';
import { useRouter } from 'next/router';
import { json2query  } from '../util';

export const AttrFilter = (props) => {
  const router = useRouter();
  let { attr_count = '' } = router.query;
  const { attrCount } = props;
  const filters = Object.keys(attrCount);
  const handleChange = (e) => {
    attr_count = e.target.value;
    router.push(`?${json2query({ ...router.query, attr_count })}`);
  }

  return (
    <select onChange={handleChange}>
      {filters.map(filter =>
        <option
          className={`bg-blue-100 hover:bg-blue-300 text-gray-800 py-2 px-4 w-full`}
        >
          {filter}
        </option>
      )}
    </select>
  )
}


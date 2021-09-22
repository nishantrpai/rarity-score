import React from 'react';
import { useRouter } from 'next/router';
import { json2query } from '../util';


export const Filters = (props) => {
  const router = useRouter();
  let { traits = '' } = router.query;
  const { allTraits } = props;
  const filters = Object.keys(allTraits);

  const handleChange = (trait) => {
    traits = traits.split(',').filter(val => val);
    traits.push(trait);
    router.push(`?${json2query({ ...router.query, traits })}`);
  }

  return (
    <div className="max-w-sm w-full text-xs" onChange={handleChange}>
      {filters.map((filter, index) =>
        <div className="w-full">
          <h2 className="font-bold px-2">{filter}</h2>
          {Object.keys(allTraits[filter]).map(val =>
            <option
              className={`bg-gray-100 cursor-pointer hover:bg-gray-300 text-gray-800 py-2 px-4`}
              onClick={() => handleChange(val)}
            >
              {val} ({allTraits[filter][val]})
            </option>
          )}
        </div>
      )}
    </div>
  )
}


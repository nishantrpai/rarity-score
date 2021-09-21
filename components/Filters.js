import React from 'react';
import { useRouter } from 'next/router';
import { json2query } from '../util';

export const Filters = (props) => {
    const router = useRouter();
    let { traits = '' } = router.query;
    const { allTraits } = props;
    const filters = Object.keys(allTraits);
  
    const handleChange = (e) => {
      traits = traits.split(',').filter(val => val);
      traits.push(e.target.value);
      router.push(`?${json2query({ ...router.query, traits })}`);
    }
  
    return (
      <select className="max-w-sm w-full" onChange={handleChange}>
        {filters.map((filter, index) =>
          <optgroup label={filter}>
            {Object.keys(allTraits[filter]).map(val =>
              <option
                className={`bg-blue-100 hover:bg-blue-300 text-gray-800 py-2 px-4`}
              >
                {val}
              </option>
            )}
          </optgroup>
        )}
      </select>
    )
  }
  
  
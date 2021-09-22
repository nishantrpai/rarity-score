import { useRouter } from 'next/router';
import React from 'react';
import { json2query } from '../util';

export const TraitFilters = () => {
  const router = useRouter();
  let { traits } = router.query;
  traits = traits.split(',');
  traits = traits.filter(val => val);
  const handleChange = (val) => {
    traits = traits.filter(trait => trait != val);
    router.push(`?${json2query({ ...router.query, traits })}`);
  }

  return (
    <div className="inline-flex">
      {traits.map(trait =>
        <div className="bg-gray-100 flex border px-2 mr-2">
          <span className="mr-4 px-4">{trait}</span>
          <span className="text-sm cursor-pointer" onClick={() => { handleChange(trait) }}>X</span>
        </div>
      )}
    </div>
  )

}
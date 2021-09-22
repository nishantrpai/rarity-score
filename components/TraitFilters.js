import { useRouter } from 'next/router';
import React from 'react';
import { json2query } from '../util';

export const TraitFilters = () => {
  const router = useRouter();
  let { traits = '', attr_count = '' } = router.query;
  traits = traits.split(',');
  traits = traits.filter(val => val);
  const handleChange = (val, type) => {
    if (type == 'trait') {
      traits = traits.filter(trait => trait != val);
      router.push(`?${json2query({ ...router.query, traits })}`);
    } else {
      attr_count = '';
      router.push(`?${json2query({ ...router.query, attr_count })}`);
    }
  }

  return (
    <div className="inline-flex py-2">
      {traits.map(trait =>
        <div className="bg-gray-100 flex border px-2 mr-2">
          <span className="mr-4 px-4">{trait}</span>
          <span className="text-sm cursor-pointer" onClick={() => { handleChange(trait, 'trait') }}>X</span>
        </div>
      )}
      {attr_count && <div className="bg-gray-100 flex border px-2 mr-2">
        <span className="mr-4 px-4">Attr Count:{attr_count}</span>
        <span className="text-sm cursor-pointer" onClick={() => { handleChange(attr_count, 'attr') }}>X</span>
      </div>}

    </div>
  )

}
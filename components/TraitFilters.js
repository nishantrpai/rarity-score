import { useRouter } from 'next/router';
import React from 'react';
import { IoIosClose } from 'react-icons/io';
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
    <div className="flex flex-wrap mt-4 mb-4">
      {traits.length > 0 &&
        <div className="max-w-max	flex justify-center items-center m-1 font-medium py-1 pr-2 bg-white text-gray-500">
          <span className="text-xs">Filters:</span>
        </div>
      }
      {traits.map(trait =>
        <div className="max-w-max	flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-indigo-700 bg-indigo-200">
          <span className="text-xs">{trait}</span>
          <span className="cursor-pointer" onClick={() => { handleChange(trait, 'trait') }}>
            <IoIosClose />
          </span>
        </div>
      )}
      {attr_count &&
        <div className="max-w-max	flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-indigo-100 bg-indigo-700 border border-indigo-700">
          <span className="text-xs">Attr Count: {attr_count}</span>
          <span className="cursor-pointer hover:text-indigo-200" onClick={() => { handleChange(attr_count, 'attr') }}>
            <IoIosClose />
          </span>
        </div>}

    </div>
  )

}
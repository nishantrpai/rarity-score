import React from 'react';
import { useRouter } from 'next/router';
import { json2query } from '../util';

export const Tools = (props) => {
  const router = useRouter();
  const handleChange = (option) => {
    if (option.toLowerCase().includes('rarity')) {
      if (option.includes('desc')) {
        router.push(`?${json2query({ ...router.query, sort_by: 'rarity_score', order: 'desc' })}`);
      }
      if (option.includes('asc')) {
        router.push(`?${json2query({ ...router.query, sort_by: 'rarity_score', order: 'asc' })}`);
      }
    }

    if (option.toLowerCase().includes('id')) {
      if (option.includes('desc')) {
        router.push(`?${json2query({ ...router.query, sort_by: 'id', order: 'desc' })}`);
      }
      if (option.includes('asc')) {
        router.push(`?${json2query({ ...router.query, sort_by: 'id', order: 'asc' })}`);
      }

    }
  }

  return (
    <div onChange={handleChange} className="px-2 mt-4 text-xs">
      <h3 className="px-2 font-bold">Sort By</h3>
      <option className="hover:bg-gray-300 cursor-pointer text-gray-800 py-2 px-4 rounded-md w-full" onClick={() => { handleChange('rarity desc') }}>
        🔹 Rarity desc
      </option>
      <option className="hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md w-full" onClick={() => { handleChange('rarity asc') }}>
        🔹 Rarity asc
      </option>

      <option className="hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md w-full" onClick={() => { handleChange('id desc') }}>
        🏷️ ID desc
      </option>
      <option className="hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md w-full" onClick={() => { handleChange('id asc') }}>
        🏷️ ID asc
      </option>

    </div>
  )
}

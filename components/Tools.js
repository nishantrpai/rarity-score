import React from 'react';
import { useRouter } from 'next/router';
import { json2query } from '../util';

export const Tools = (props) => {
    const router = useRouter();
    const handleChange = (e) => {
      let option = e.target.value;
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
      <select onChange={handleChange} className="mb-4">
        <option className="hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full">
          🔹 Rarity desc
        </option>
        <option className="hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full">
          🔹 Rarity asc
        </option>
  
        <option className="hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full">
          🏷️ ID desc
        </option>
        <option className="hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full">
          🏷️ ID asc
        </option>
  
      </select>
    )
  }
  
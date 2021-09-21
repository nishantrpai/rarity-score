import React from 'react';
import { useRouter } from 'next/router';
import { json2query } from '../util';

export const PageNumbers = (props) => {
  const router = useRouter();
  const { page_id = 0 } = router.query
  return (
    <div className="inline-flex mt-8 cursor-pointer">
      {props.currentpage !== 0 &&
        <a className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => router.push(`?${json2query({ ...router.query, page_id: parseInt(page_id) - 1 })}`)}>
          Prev
        </a>
      }

      <a className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={() => router.push(`?${json2query({ ...router.query, page_id: parseInt(page_id) + 1 })}`)}>
        Next
      </a>

    </div>
  );
}


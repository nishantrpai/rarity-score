import Head from 'next/head'
import React, { createRef } from 'react';
import useSWR from 'swr'
import { useRouter } from 'next/router';
import { NFT } from '../components/NFT';
import { fetcher, json2query } from '../util';

const Tools = (props) => {
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

const Filters = (props) => {
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
    <select onChange={handleChange}>
      {filters.map((filter, index) =>
        <optgroup label={filter}>
          {Object.keys(allTraits[filter]).map(val =>
            <option
              className={`bg-blue-100 hover:bg-blue-300 text-gray-800 py-2 px-4 w-full`}
            >
              {val}
            </option>
          )}
        </optgroup>
      )}
    </select>
  )
}

const AttrFilter = (props) => {
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

const PageNumbers = (props) => {
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

export default function Home() {
  const router = useRouter();
  const ref = createRef(null)
  const { data, error } = useSWR(`/api/nfts?${json2query(router.query)}`, fetcher)
  const { data: filters, error: filter_error } = useSWR(`/api/filters`, fetcher)

  if (error) return <></>;
  if (!data) return <></>;
  if (!filters) return <></>

  const { nfts = [], collection_name } = data;
  const { all_traits, attr_count } = filters;


  return (
    <div className="flex flex-col items-center justify-center 
    min-h-screen py-2 bg-gradient-to-r from-rose-50 to-rose-100" ref={ref}>
      <Head>
        <title>{collection_name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center 
      w-full flex-1 px-5 text-center mb-8">
        <Tools {...router.query} />
        <Filters allTraits={all_traits} />
        <AttrFilter attrCount={attr_count} />
        <div className="flex flex-wrap items-center justify-evenly 
        max-w-4xl mt-6 sm:w-full">
          {nfts.map((nft, idx) => <NFT {...nft} index={idx} />)}
        </div>
        <PageNumbers {...router.query} />
      </main>
    </div>
  )
}

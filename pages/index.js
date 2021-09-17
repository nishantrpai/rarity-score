import Head from 'next/head'
import React, { createRef, useState } from 'react';
import useSWR from 'swr'
import { useScreenshot } from 'use-react-screenshot';
import { useRouter } from 'next/router';
import { NFT } from '../components/NFT';
import { fetcher, json2query } from '../util';
import { useEffect } from 'react';

const Tools = (props) => {
  const router = useRouter();
  const { page_id = '0', sort_by = 'rarity_score', order = 'desc' } = props;
  const handleChange = (e) => {
    let option = e.target.value;
    if (option.toLowerCase().includes('rarity')) {
      router.push(`?${json2query({ page_id, sort_by: 'rarity_score', order })}`);
    }

    if (option.toLowerCase().includes('price')) {
      router.push(`?${json2query({ page_id, sort_by: 'rarity_score', order })}`);

    }

    if (option.toLowerCase().includes('recent')) {
      router.push(`?${json2query({ page_id, sort_by: 'rarity_score', order })}`);

    }

    if (option.toLowerCase().includes('id')) {
      router.push(`?${json2query({ page_id, sort_by: 'id', order })}`);
    }
  }

  return (
    <select onChange={handleChange} className="mb-4">
      <option class="hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full">
        🔹 Rarity
      </option>
      <option class="hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full">
        🤑 Price
      </option>
      <option class="hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full">
        ⏱️ Recent
      </option>

      <option class="hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full">
        🏷️ ID
      </option>
    </select>
  )
}

const Filters = (props) => {
  const { traits } = props;
  return (
    <select>
      {traits.map((filter, index) =>
        <option
          class={`bg-blue-100 hover:bg-blue-300 text-gray-800 
          font-bold py-2 px-4 w-full 
          ${index == 0 && 'rounded-l'}
          ${index == (traits.length - 1) && 'rounded-r'}`}
        >
          {filter}
        </option>
      )}
    </select>
  )

}

const PageNumbers = (props) => {
  const { page_id = '0', sort_by = 'rarity_score', order = 'desc' } = props;
  const router = useRouter();
  return (
    <div class="inline-flex mt-8 cursor-pointer">
      {props.currentpage !== 0 &&
        <a class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => router.push(`?${json2query({ page_id: parseInt(page_id) - 1, sort_by, order })}`)}>
          Prev
        </a>
      }

      <a class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={() => router.push(`?${json2query({ page_id: parseInt(page_id) + 1, sort_by, order })}`)}>
        Next
      </a>

    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot();
  const { page_id = '0', sort_by = 'rarity_score', order = 'desc' } = router.query;
  const { data: nfts = [], error } = useSWR(`/api/nfts?page_id=${page_id}&sort_by=${sort_by}&order=${order}`, fetcher)

  useEffect(() => {
    takeScreenshot(ref.current);
  },[]);

  return (
    <div className="flex flex-col items-center justify-center 
    min-h-screen py-2 bg-gradient-to-r from-rose-50 to-rose-100" ref={ref}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={`/api/image?data=${image}`} />
        <meta property="og:image" content={`/api/image?data=${image}`} />
      </Head>

      <main className="flex flex-col items-center justify-center 
      w-full flex-1 px-5 text-center mb-8">
        <img src={image} alt='screenshot' />
        <Tools {...router.query} />
        <Filters traits={['type', 'eyes', 'neck']} />
        <div className="flex flex-wrap items-center justify-evenly 
        max-w-4xl mt-6 sm:w-full">
          {nfts.map((nft, idx) => <NFT {...nft} index={idx} />)}
        </div>

        <PageNumbers {...router.query} />
      </main>
    </div>
  )
}

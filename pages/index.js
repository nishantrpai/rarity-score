import Head from 'next/head'
import useSWR from 'swr'
import { useRouter } from 'next/router';
import { NFT } from '../components/NFT';
import { fetcher, json2query } from '../util';
import { route } from 'next/dist/server/router';

const Tools = (props) => {
  const { page_id = '0', sort_by = 'rarity_score', order = 'desc' } = props;
  return (
    <div class="inline-flex w-full px-10">
      <a class="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full" href={`?${json2query({ page_id, sort_by: 'rarity_score', order })}`}>
        🔹 Rarity
      </a>
      <a class="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full" href={`?${json2query({ page_id, sort_by: 'rarity_score', order })}`}>
        🤑 Price
      </a>
      <a class="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full" href={`?${json2query({ page_id, sort_by: 'rarity_score', order })}`}>
        ⏱️ Recent
      </a>

      <a class="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full" href={`?${json2query({ page_id, sort_by: 'id', order })}`}>
        🏷️ ID
      </a>
    </div>
  )
}

const Filters = (props) => {
  const { traits } = props;
  return (
    <div class="inline-flex w-full px-10 mt-4">
      {traits.map((filter, index) =>
        <button
          class={`bg-blue-100 hover:bg-blue-300 text-gray-800 
          font-bold py-2 px-4 w-full 
          ${index == 0 && 'rounded-l'}
          ${index == (traits.length - 1) && 'rounded-r'}`}
        >
          {filter}
        </button>
      )}
    </div>
  )

}

const PageNumbers = (props) => {
  const { page_id = '0', sort_by = 'rarity_score', order = 'desc' } = props;

  return (
    <div class="inline-flex mt-8 cursor-pointer">
      {props.currentpage !== 0 &&
        <a class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" href={`?${json2query({ page_id: parseInt(page_id) - 1, sort_by, order })}`}>
          Prev
        </a>
      }

      <a class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" href={`?${json2query({ page_id: parseInt(page_id) + 1, sort_by, order })}`}>
        Next
      </a>

    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const { page_id = '0', sort_by = 'rarity_score', order = 'desc' } = router.query;

  const { data: nfts = [], error } = useSWR(`/api/nfts?page_id=${page_id}&sort_by=${sort_by}&order=${order}`, fetcher)
  return (
    <div className="flex flex-col items-center justify-center 
    min-h-screen py-2 bg-gradient-to-r from-rose-50 to-rose-100">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center 
      w-full flex-1 px-5 text-center mb-8">
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

import Head from 'next/head'
import useSWR from 'swr'
import { NFT } from '../components/NFT';

const fetcher = url => fetch(url).then(r => r.json())

const Tools = () => {
  return (
    <div class="inline-flex w-full px-10">
      <button class="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full">
        🔹 Rarity
      </button>
      <button class="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 w-full">
        🤑 Price
      </button>
      <button class="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 w-full">
        ⏱️ Recent
      </button>

      <button class="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-r w-full">
        🏷️ ID
      </button>
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
  return (
    <div class="inline-flex mt-8">
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
        Prev
      </button>
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
        Next
      </button>
    </div>
  );
}

export default function Home() {
  const { data: nfts = [], error } = useSWR('/api/nfts', fetcher)
  return (
    <div className="flex flex-col items-center justify-center 
    min-h-screen py-2 bg-gradient-to-r from-rose-50 to-rose-100">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center 
      w-full flex-1 px-5 text-center mb-8">
        <Tools />
        <Filters traits={['type', 'eyes', 'neck']} />
        <div className="flex flex-wrap items-center justify-evenly 
        max-w-4xl mt-6 sm:w-full">
          {nfts.map((nft, idx) => <NFT {...nft} index={idx} />)}
        </div>

        <PageNumbers pages={10} />
      </main>
   </div>
  )
}

import Head from 'next/head'
import React from 'react';
import useSWR from 'swr'
import { ipfs2http } from '../util';

const fetcher = url => fetch(url).then(r => r.json())

const Tools = () => {
  return (
    <div class="inline-flex">
      <button class="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-l">
      🔹 Rarity
      </button>
      <button class="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4">
      🤑 Price
      </button>
      <button class="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4">
      ⏱️ Recent
      </button>

      <button class="bg-blue-200 hover:bg-blue-300 text-gray-800 font-bold py-2 px-4 rounded-r">
      🏷️ ID
      </button>
    </div>
  )
}

const NFT = (nft) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <a
        className="mt-6 text-left w-48 cursor-pointer rounded rounded-md
      focus:text-blue-600 hover:shadow-xl"
        onClick={() => setShowModal(true)}
      >
        <img
          src={`https://ipfs.io/ipfs/${ipfs2http(nft.image)}`}
          className="rounded-t-md px-4 bg-red-200" />
        <div className="px-3 py-3 rounded-b-md text-red-500 
      bg-red-100">
          {/* <span className="flex text-xs mb-4 text-gray-500">#{nft.id}</span> */}
          <span className="flex max-w-max p-1 mb-1 text-xs 
        rounded rounded-sm text-red-500">
            {nft.rarity_score.toFixed(2)}
          </span>
          <h3 className="text-xs font-bold">{nft.name}</h3>
        </div>
      </a>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto 
            fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto mx-auto sm:max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {nft.name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <img
                    src={`https://ipfs.io/ipfs/${ipfs2http(nft.image)}`}
                    className="rounded-md px-4 bg-red-200 max-w-sm"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-end justify-end p-6 border-t 
                border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent 
                    font-bold uppercase 
                    px-6 py-2 text-sm outline-none focus:outline-none 
                    mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

const TraitFilters = (props) => {
  return (
    props.filters.map((filter) => <span>{filter}</span>)
  )
}

const PageNumbers = (props) => {
  return (
    <div>
      {[...Array(props.pages).keys()].map((page) => <span>{page + 1}</span>)}
    </div>
  );
}

// Tools
// Each 

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
        <TraitFilters filters={['type', 'eyes', 'neck']} />
        <div className="flex flex-wrap items-center justify-evenly 
        max-w-4xl mt-6 sm:w-full">
          {nfts.map((nft, idx) => <NFT {...nft} index={idx} />)}
        </div>

        <PageNumbers pages={10} />
      </main>

      {/* <footer className="flex items-center justify-center w-full 
      h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer> */}
    </div>
  )
}

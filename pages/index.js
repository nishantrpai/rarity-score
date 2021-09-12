import Head from 'next/head'
import useSWR from 'swr'
import { ipfs2http } from '../util';

const fetcher = url => fetch(url).then(r => r.json())

const NFT = (nft) => {
  return (
    <a
      className="p-6 mt-6 text-left w-48 
      text-red-600 focus:text-blue-600 bg-gray-900"
    >
      <span className="flex mb-4">#{nft.id}</span>
      <span className="flex max-w-max pl-2 pr-2 mb-4 text-xs rounded rounded-sm bg-gray-700">{nft.rarity_score.toFixed(2)}</span>
      <img
        src={`https://ipfs.io/ipfs/${ipfs2http(nft.image)}`}
        width={200}
        height={200}
        className="rounded-full pt-2 bg-black mb-4" />
      <h3 className="text-md font-bold">{nft.name}</h3>
    </a>
  );
}

export default function Home() {
  const { data: nfts = [], error } = useSWR('/api/nfts', fetcher)
  return (
    <div className="flex flex-col items-center justify-center 
    min-h-screen py-2 bg-black">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center 
      w-full flex-1 px-5 text-center mb-8">
        {/* <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by editing{' '}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            pages/index.js
          </code>
        </p> */}
        <div className="flex flex-wrap items-center justify-evenly 
        max-w-4xl mt-6 sm:w-full">
          {nfts.map((nft, idx) => <NFT {...nft} index={idx} />)}
        </div>
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

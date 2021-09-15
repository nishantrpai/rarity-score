import Head from 'next/head';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher, ipfs2http } from '../util';
import { FiArrowLeft } from "react-icons/fi";


const Trait = (attribute) => {
  return (
    <div className="flex">
      <span>{attribute.trait_type} | </span>
      <span>{attribute.value} | </span>
      <span>{attribute.percentile} | </span>
      <span>{attribute.count} | </span>
      <span>{attribute.rarity_score.toFixed(2)}</span>
    </div>
  )
}


export default function NFT() {
  const router = useRouter();
  const { id } = router.query;
  const { data: nft = {}, error } = useSWR(`/api/nft?id=${id}`, fetcher)

  return (
    <>
      <div className="flex flex-col items-center justify-center 
      min-h-screen py-2 bg-gradient-to-r from-rose-50 to-rose-100">
        <Head>
          <title>{nft?.name}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center 
        w-full flex-1 px-5 text-center mb-8 max-w-xl">
          <div className="flex mb-4 items-start w-full cursor-pointer">
            <a className="text-2xl py-4 px-4 rounded-md bg-red-100 text-red-500" href={'/'}>
              <FiArrowLeft />
            </a>
          </div>
          <div
            className="justify-center"
          >
            <h3 className="text-3xl font-semibold mb-4">
              {nft?.name}
            </h3>
            <img
              src={`https://ipfs.io/ipfs/${ipfs2http(nft?.image)}`}
              className="rounded-md px-4 bg-black w-full"
            />
            <div className="py-4 px-2 w-full border border-4 mt-4">
              {nft.rarity_score}
            </div>
            <div className="py-4">
              {nft?.attributes?.map((attribute) => <Trait {...attribute} />)}
              {nft?.missing_traits?.map((attribute) => <Trait {...attribute} />)}
            </div>
          </div>
        </main>
      </div>
    </>

  )
}

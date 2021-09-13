import Head from 'next/head';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher, ipfs2http } from '../util';

const Trait = (attribute) => {
  return(
    <div className="flex">
      <span>{attribute.trait_type}</span>
      <span>{attribute.value}</span>
      <span>{attribute.trait_count}</span>
    </div>
  )
}


export default function NFT() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const { data: nft = {}, error } = useSWR(`/api/nft?id=${id}`, fetcher)

  return (
    <>
      <div className="flex flex-col items-center justify-center 
      min-h-screen py-2 bg-gradient-to-r from-rose-50 to-rose-100">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center 
        w-full flex-1 px-5 text-center mb-8">
          <div
            className="justify-center"
          >
            <h3 className="text-3xl font-semibold mb-4">
              {nft?.name}
            </h3>
            <img
              src={`https://ipfs.io/ipfs/${ipfs2http(nft?.image)}`}
              className="rounded-md px-4 bg-black max-w-sm"
            />
            <div className="py-4 px-2 w-full border border-4 mt-4">
              {nft.rarity_score}
            </div>
            <div className="py-4">
              {nft?.attributes?.map((attribute) => <Trait {...attribute} />)}
            </div>
          </div>
        </main>
      </div>
    </>

  )
}

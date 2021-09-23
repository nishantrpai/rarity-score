import { formatPrice, getDesc, ipfs2http } from '../util';
import { FiArrowLeft } from "react-icons/fi";
import { NextSeo } from 'next-seo';
import { getNFT, getNFTInfo } from '../util/requests';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

const Trait = (attribute) => {
  return (
    <div className="flex">
      <span>{attribute.trait_type} | </span>
      <span>{attribute.value} | </span>
      <span>{attribute.percentile} | </span>
      <span>{attribute.count} | </span>
      <span>{attribute.rarity_score?.toFixed(2)}</span>
    </div>
  )
}


function NFT({ nft }) {

  const router = useRouter();

  const img_url = `https://ipfs.io/ipfs/${ipfs2http(nft.image)}`;

  return (
    <>
      <div className="flex flex-col items-center justify-center 
      min-h-screen bg-gray-200">
        <NextSeo
          title={nft?.name}
          openGraph={{
            images: [
              {
                url: img_url
              }
            ],
          }}
          twitter={{
            cardType: 'summary_large_image'
          }}
          description={getDesc(nft)}
        />
        <Navbar />
        <div className="flex mb-4 items-start w-full cursor-pointer">
          <a className="text-2xl py-4 px-4 rounded-md bg-gray-200 text-gray-400 hover:text-gray-500 m-4" onClick={() => router.back()}>
            <FiArrowLeft />
          </a>
        </div>

        <main className="flex flex-col items-center justify-center 
        w-full flex-1 p-2 rounded-lg text-center mb-8 max-w-xl">
          <div
            className="justify-center border p-4 shadow-xl rounded-md bg-white"
          >
            <h3 className="text-3xl font-semibold mb-4">
              {nft?.name}
            </h3>
            <div className="relative rounded-md px-4 bg-black w-full">
              <img
                src={img_url}
              />
              <span className="absolute top-5 right-5
              text-white px-4 py-2 font-bold text-lg rounded-md bg-yellow-100 text-yellow-700">
                {nft.rarity_rank + 1}
              </span>
            </div>
            <div className="py-4 px-2 w-full border border-4 mt-4">
              {nft.rarity_score.toFixed(2)}
            </div>
            <a className="py-4 px-2 flex w-full border border-4 mt-4" href={nft?.opensea_link}>
              Opensea Link
            </a>
            <div className="py-4 flex flex-col">
              {nft.current_price !== '-' && <span>{`Ξ${formatPrice(nft?.current_price)}`}</span>}
              {nft?.attributes?.map((attribute, idx) => <Trait key={idx} {...attribute} />)}
              {nft?.missing_traits?.map((attribute, idx) => <Trait key={idx * 100} {...attribute} />)}
            </div>
          </div>
        </main>
      </div>
    </>

  )
}

NFT.getInitialProps = async ({ query }) => {
  let nft = await getNFT(query.id);
  let opensea_info = await getNFTInfo(query.id);
  nft['opensea_link'] = opensea_info['assets'][0]['permalink'];
  nft['current_price'] = '-'
  if (opensea_info['assets'][0]['sell_orders'])
    nft['current_price'] = opensea_info['assets'][0]['sell_orders'][0]['current_price']; //last price
  if (nft)
    return { nft };
  else
    return { nft: {} }
}

export default NFT;
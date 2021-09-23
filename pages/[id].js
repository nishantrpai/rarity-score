import { formatPrice, getDesc, ipfs2http } from '../util';
import { FiArrowLeft } from "react-icons/fi";
import { NextSeo } from 'next-seo';
import { getNFT, getNFTInfo } from '../util/requests';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

const Trait = (attribute) => {
  return (
    <div className="flex flex-col justify-start">
      <span className="text-xs">{attribute.trait_type.toUpperCase()} </span>
      <div>
        <span>{attribute.value} | </span>
        {/* <span>{attribute.percentile} | </span> */}
        <span>{attribute.count} | </span>
        <span>{attribute.rarity_score?.toFixed(2)}</span>
      </div>
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
          <a className="text-2xl py-4 px-4 rounded-md bg-gray-200 text-gray-700 hover:text-gray-900 m-4" onClick={() => router.back()}>
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
              text-white px-4 py-2 font-medium text-lg rounded-md bg-yellow-100 text-yellow-600">
                #{nft.rarity_rank + 1}
              </span>
            </div>
            <div className="py-4 px-2 w-full rounded-md text-lg mt-4 bg-red-100 text-red-500">
              ♦️ {nft.rarity_score.toFixed(2)}
            </div>
            {nft.current_price !== '-' &&
              <div className="py-4 px-2 w-full rounded-md text-lg mt-4 bg-green-100 text-green-500">
                <span>{`Ξ ${formatPrice(nft?.current_price)}`}</span>
              </div>
            }

            <a className="py-4 px-2 flex text-center w-full items-center justify-center mt-4 bg-blue-100 text-blue-500" href={nft?.opensea_link} target='_blank'>
              🛒 Opensea Link
            </a>
            <div className="py-4 flex flex-col items-start justify-start">
              {nft?.attributes?.map((attribute, idx) => <Trait key={idx} {...attribute} />)}
              <span>Missing Traits</span>
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
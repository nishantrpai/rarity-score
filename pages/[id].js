import { formatPrice, getDesc, ipfs2http } from '../util';
import { FiArrowLeft } from "react-icons/fi";
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import { getNFT, getNFTInfo } from '../util/requests';


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

  const img_url = `https://ipfs.io/ipfs/${ipfs2http(nft.image)}`;

  return (
    <>
      <div className="flex flex-col items-center justify-center 
      min-h-screen py-2 bg-gradient-to-r from-rose-50 to-rose-100">
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
              src={img_url}
              className="rounded-md px-4 bg-black w-full"
            />
            <div className="py-4 px-2 w-full border border-4 mt-4">
              {nft.rarity_score.toFixed(2)}
            </div>
            <a className="py-4 px-2 w-full border border-4 mt-4" href={nft?.opensea_link}>
              Opensea Link
            </a>
            <div className="py-4">
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
import { formatIpfsUrl, formatPrice, getDesc } from "../../util";
import { FiArrowLeft } from "react-icons/fi";
import { NextSeo } from "next-seo";
import { getNFT, getNFTInfo } from "../../util/requests";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { config } from "../../config";
import { Footer } from "../../components/Footer";

const Trait = (attribute) => {
  return (
    <div className="flex flex-col justify-start w-full mb-4 p-1">
      <div className="flex justify-between items-center w-full text-xs mb-2 px-1">
        <span className="text-gray-400">
          {attribute?.trait_type.toUpperCase()}{" "}
        </span>
      </div>
      <div className="relative flex justify-between items-center w-full text-xs text-gray-600 mt-1 py-2">
        <span className="bg-gray-50 rounded-md absolute z-0 h-8 w-full"></span>
        <span
          className="bg-gray-100 rounded-l-lg absolute z-10 h-8"
          style={{ width: `${(attribute.percentile * 100).toFixed(1)}%` }}
        ></span>
        <div className="z-50 flex justify-between w-full px-2">
          <span>{attribute.value ? attribute.value : "None"} </span>
          {/* <span>{attribute.percentile} | </span> */}
          <span className="font-bold z-50">
            {(attribute.percentile * 100).toFixed(1)}%
            {/* +{attribute.rarity_score?.toFixed(2)} */}
          </span>
        </div>
      </div>
    </div>
  );
};

function NFT({ nft, title }) {
  const router = useRouter();
  const img_url = formatIpfsUrl(nft.image);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center 
      min-h-screen bg-gray-100"
      >
        <NextSeo
          title={nft?.name}
          openGraph={{
            images: [
              {
                url: img_url,
              },
            ],
          }}
          twitter={{
            cardType: "summary_large_image",
          }}
          description={getDesc(nft)}
        />
        <Navbar title={title} />
        <div className="flex mb-4 items-start w-full cursor-pointer">
          <a
            className="text-2xl py-4 px-4 rounded-md bg-gray-200 text-gray-700 hover:text-gray-900 m-4"
            onClick={() => router.back()}
          >
            <FiArrowLeft />
          </a>
        </div>

        <main
          className="flex flex-col items-center justify-center 
        w-full flex-1 p-2 rounded-lg text-center mb-8 max-w-xl"
        >
          <div className="justify-center p-4 shadow-xl rounded-md bg-white w-full">
            <h3 className="text-3xl font-semibold mb-4">{nft?.name}</h3>
            <div className="relative rounded-md bg-black w-full">
              <img className="rounded-md" src={img_url} />
              <span
                className="absolute top-5 right-5
              text-white px-2 py-2 font-medium text-xs rounded-md bg-yellow-100 text-yellow-600"
              >
                #{nft.rarity_rank + 1}
              </span>
            </div>
            <div className="py-4 px-2 w-full rounded-md text-lg mt-4 bg-red-100 text-red-500">
              ♦️ {nft.rarity_score.toFixed(2)}
            </div>

            {nft?.opensea_url && (
              <a
                className="py-4 px-2 flex text-center w-full items-center justify-center mt-4 bg-blue-100 text-blue-500"
                href={nft?.opensea_url}
                target="_blank"
              >
                🛒 Opensea
              </a>
            )}
            <div className="py-4 flex flex-col items-start justify-start">
              {/* <h2 className="px-2 text-xl mb-2 font-bold text-gray-800">Traits</h2> */}
              {nft?.attributes?.map((attribute, idx) => (
                <Trait key={idx} {...attribute} />
              ))}
              {/* <h2 className="px-2 text-xl mb-2 font-bold text-gray-800">Missing Traits</h2> */}
              {nft?.missing_traits?.map((attribute, idx) => (
                <Trait key={idx * 100} {...attribute} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

NFT.getInitialProps = async ({ query }) => {
  let id = query.id;
  let nft = await getNFT(id);
  if (Object.keys(config.CONTRACT).length > 0)
    nft["opensea_url"] =
      config.CONTRACT.CHAIN !== "solana"
        ? `https://opensea.io/assets/${config.CONTRACT.CHAIN}/${config.CONTRACT.ADDRESS}/${id}`
        : "";
  if (nft) return { nft, title: config.COLLECTION_TITLE };
  else return { nft: {}, title: config.COLLECTION_TITLE };
};

export default NFT;

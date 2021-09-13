import React from 'react';
import { ipfs2http } from '../util';

export const NFT = (nft) => {
  return (
    <>
      <a
        className="mt-6 text-left w-48 cursor-pointer rounded rounded-md
        focus:text-blue-600 hover:shadow-xl"
        href={`/${nft.id}`}
      >
        <img
          src={`https://ipfs.io/ipfs/${ipfs2http(nft.image)}`}
          className="rounded-t-md px-4 bg-black" />
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
    </>
  );
}

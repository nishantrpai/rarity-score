import React from 'react';
import { ipfs2http } from '../util';

export const NFT = (nft) => {
  console.log(nft.image, `https://ipfs.io/ipfs/${ipfs2http(nft.image)}`);
  return (
    <>
      <a
        className="mt-6 text-left w-48 cursor-pointer rounded rounded-md
        focus:text-blue-600 hover:shadow-xl"
        href={`/${nft.id}`}
      >
        <img
          src={`https://ipfs.io/ipfs/${ipfs2http(nft.image)}`}
          className="rounded-md px-4 bg-black" />
        <div className="rounded-b-md mt-2">
          <h3 className="text-xs font-bold">{nft.name}</h3>
        </div>
      </a>
    </>
  );
}

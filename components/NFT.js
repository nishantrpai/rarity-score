import React from 'react';
import { ipfs2http } from '../util';

export const NFT = (nft) => {
  return (
    <>
      <a
        className="mb-4 text-left w-52
        cursor-pointer rounded rounded-md
        border py-2 px-2 bg-white mr-4"
        href={`/${nft.id}`}
      >
        <img
          src={`https://ipfs.io/ipfs/${ipfs2http(nft.image)}`}
          className="rounded-lg px-4 bg-black" />
        <div className="rounded-b-md mt-2 px-2 py-2">
          <h3 className="text-md font-bold text-black">{nft.name}</h3>
        </div>
      </a>
    </>
  );
}

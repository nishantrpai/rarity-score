import React from 'react';
import { ipfs2http } from '../util';

export const NFT = (nft) => {
  return (
    <>
      <a
        className="mb-6 text-left w-60
        cursor-pointer rounded rounded-md
        border py-2 px-2 bg-white mr-4 hover:underline"
        href={`/${nft.id}`}
      >
        <img
          src={`https://ipfs.io/ipfs/${ipfs2http(nft.image)}`}
          className="rounded-lg px-4 bg-black" />
        <div className="rounded-b-md mt-2 px-2 py-2">
          <h3 className="text-xs text-black">{nft.name}</h3>
        </div>
      </a>
    </>
  );
}

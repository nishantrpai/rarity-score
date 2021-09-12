import React from 'react';
import { ipfs2http } from '../util';

export const NFT = (nft) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <a
        className="mt-6 text-left w-48 cursor-pointer rounded rounded-md
        focus:text-blue-600 hover:shadow-xl"
        onClick={() => setShowModal(true)}
      >
        <img
          src={`https://ipfs.io/ipfs/${ipfs2http(nft.image)}`}
          className="rounded-t-md px-4 bg-red-200" />
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
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto 
              fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto mx-auto sm:max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {nft.name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <img
                    src={`https://ipfs.io/ipfs/${ipfs2http(nft.image)}`}
                    className="rounded-md px-4 bg-red-200 max-w-sm"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-end justify-end p-6 border-t 
                  border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent 
                      font-bold uppercase 
                      px-6 py-2 text-sm outline-none focus:outline-none 
                      mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

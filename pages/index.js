import Head from 'next/head'
import React, { createRef } from 'react';
import useSWR from 'swr'
import { useRouter } from 'next/router';
import { NFT } from '../components/NFT';
import { SideBar } from '../components/SideBar';
import { fetcher, json2query } from '../util';
import { PageNumbers } from '../components/PageNumbers';

export default function Home() {
  const router = useRouter();
  const ref = createRef(null)
  const { data, error } = useSWR(`/api/nfts?${json2query(router.query)}`, fetcher)
  const { data: filters, error: filter_error } = useSWR(`/api/filters?${json2query(router.query)}`, fetcher)

  if (error) return <></>;
  if (!data) return <></>;
  if (!filters) return <></>

  const { nfts = [], collection_name } = data;
  const { all_traits, attr_count } = filters;


  return (
    <div className="flex items-center justify-center 
    min-h-screen py-2 bg-gradient-to-r from-rose-50 to-rose-100 h-full" ref={ref}>
      <Head>
        <title>{collection_name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center w-full max-w-7xl	 flex-1 px-5 mb-8 border h-screen">
        <SideBar all_traits={all_traits}  attr_count={attr_count} />
        <div className="flex flex-col border w-full w-5xl">
          <div className="flex flex-wrap justify-between w-full">
            {nfts.map((nft, idx) => <NFT {...nft} index={idx} />)}
          </div>
          <PageNumbers {...router.query} />
        </div>
      </main>
    </div>
  )
}

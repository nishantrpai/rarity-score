import Head from 'next/head'
import React, { createRef } from 'react';
import useSWR from 'swr'
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { NFT } from '../components/NFT';
import { SideBar } from '../components/SideBar';
import { fetcher, json2query } from '../util';
import { PageNumbers } from '../components/PageNumbers';
import Navbar from '../components/Navbar';
import { TraitFilters } from '../components/TraitFilters';

function Home({ title, img, description }) {
  const router = useRouter();
  const ref = createRef(null)
  const { data, error } = useSWR(`/api/nfts?${json2query(router.query)}`, fetcher)
  const { data: filters, error: filter_error } = useSWR(`/api/filters?${json2query(router.query)}`, fetcher)

  if (error) return <></>;
  if (!data) return <></>;
  if (!filters) return <></>

  const { nfts = [], pages } = data;
  const { all_traits, attr_count } = filters;


  return (
    <div className="flex flex-col items-center justify-center 
    min-h-screen bg-gradient-to-r from-rose-50 to-rose-100 h-full" ref={ref}>
      <Head>
        <title>{process.env.COLLECTION_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo
        title={title}
        openGraph={{
          images: [
            {
              url: img
            }
          ],
        }}
        twitter={{
          cardType: 'summary_large_image'
        }}
        description={description}
      />
      <Navbar title={title} />
      <main className="flex justify-center w-full flex-1 h-screen">
        <SideBar all_traits={all_traits} attr_count={attr_count} />
        <div className="flex flex-col w-full w-5xl">
          <TraitFilters />
          <div className="flex flex-wrap justify-start w-full">
            {nfts.map((nft, idx) => <NFT {...nft} index={idx} />)}
          </div>
          <PageNumbers pages={pages} />
        </div>
      </main>
    </div>
  )
}

Home.getInitialProps = () => {
  return { title: process.env.COLLECTION_TITLE, img: process.env.COLLECTION_IMG_LINK, description: process.env.COLLECTION_DESCRIPTION };
}

export default Home;
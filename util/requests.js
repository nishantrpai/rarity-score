import { json2query } from ".";
import { config } from "../config";

export const getNFT = async (id) => {
  const res = await fetch(`https://${config.API_URL}/api/nft?id=${id}`);
  const data = await res.json();
  return data;
};

export const getNFTs = async (query) => {
  const res = await fetch(
    `https://${config.API_URL}/api/nfts?${json2query(query)}`
  );
  const data = await res.json();
  return data;
};

export const getFilters = async (query) => {
  const res = await fetch(
    `https://${config.API_URL}/api/filters?${json2query(query)}`
  );
  const data = await res.json();
  return data;
};

export const getNFTInfo = async (id) => {
  const res = await fetch(
    `https://api.opensea.io/api/v1/assets?collection=${config.COLLECTION_NAME.toLowerCase()}&token_ids=${id}&format=json`
  );
  const data = await res.json();
  return data;
};

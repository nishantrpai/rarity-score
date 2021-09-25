import { config } from "../config";

export const getNFT = async (id) => {
  const res = await fetch(`http://${config.API_URL}/api/nft?id=${id}`);
  const data = await res.json();
  return data;
}

export const getNFTInfo = async (id) => {
  const res = await fetch(`https://api.opensea.io/api/v1/assets?collection=${config.COLLECTION_NAME.toLowerCase()}&token_ids=${id}&format=json`);
  const data = await res.json();
  return data;
}
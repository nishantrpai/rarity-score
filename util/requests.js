export const getNFT = async (id) => {
  const res = await fetch(`http://${process.env.API_URL}/api/nft?id=${id}`);
  const data = await res.json();
  return data;
}

export const getNFTInfo = async (id) => {
  const res = await fetch(`https://api.opensea.io/api/v1/assets?collection=${process.env.COLLECTION_NAME.toLowerCase()}&token_ids=${id}&format=json`);
  const data = await res.json();
  return data;
}
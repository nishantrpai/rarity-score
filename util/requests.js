export const getNFT = async (id) => {
  const res = await fetch(`http://${process.env.API_URL}/api/nft?id=${id}`);
  const data = await res.json();
  return data;
}

export const getNFTInfo = async (id) => {
  console.log(`https://api.opensea.io/api/v1/assets?collection=${process.env.COLLECTION_NAME}&token_ids=${id}&format=json`);
  const res = await fetch(`https://api.opensea.io/api/v1/assets?collection=${process.env.COLLECTION_NAME}&token_ids=${id}&format=json`);
  const data = await res.json();
  return data;
}
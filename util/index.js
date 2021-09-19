export const getDesc = (nft) => {
  let desc;
  desc = `🔷 ID: ${nft.id}<br/><br/>🔷 Rarity score: ${nft.rarity_score}<br/><br/>🔷 Rarity rank: 1`
  return desc;
}
export const ipfs2http = (ipfs_url) => {
  if (ipfs_url) {
    let url = new URL(ipfs_url);
    return url.host;
  } else {
    return '';
  }
}

export const fetcher = url => fetch(url).then(r => r.json())

export const json2query = (json) => {
  return Object.keys(json).map(key => key + '=' + json[key]).join('&');
}
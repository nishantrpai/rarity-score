export const getDesc = (nft) => {
  let desc;
  desc = `
  🔷 <b>ID</b>: ${nft.id}
  🔷 <b>Rarity score</b>: ${nft.rarity_score.toFixed(2)}
  🔷 <b>Rarity rank</b>: ${nft.rarity_rank + 1}
  🔷 <b>Price</b>: Ξ${formatPrice(nft.current_price)}
  `
  return desc;
}
export const ipfs2http = (ipfs_url) => {
  if (ipfs_url) {
    let url = new URL(ipfs_url);
    return (url.host || url.pathname.substr(2));
  } else {
    return '';
  }
}

export const fetcher = url => fetch(url).then(r => r.json())

export const json2query = (json) => {
  return Object.keys(json).map(key => key + '=' + json[key]).join('&');
}


export const formatPrice = (price) => {
  // wei = 10^18
  if (price !== '-')
    return (price / (10 ** 18)).toFixed(2);
  else
    return '-'
}
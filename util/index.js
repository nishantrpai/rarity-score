import { config } from "../config";

let basePath =
  config.env == "local"
    ? `http://${config.LOCAL_API_URL}`
    : `https://${config.API_URL}`;

export const getDesc = (nft) => {
  let desc;
  desc = `
  🔷ID: ${config.STARTING_INDEX == 1 ? nft.id + 1 : nft.id}
  
  🔷Rarity score: ${nft.rarity_score.toFixed(2)}
  
  🔷Rarity rank: ${nft.rarity_rank + 1}
  `;
  return desc;
};

export const ipfs2http = (ipfs_url) => {
  if (ipfs_url) {
    return ipfs_url.replace("ipfs://", "");
  } else {
    return "";
  }
};

export const formatIpfsUrl = (image_url) => {
  if (image_url) {
    let img_url = new URL(
      image_url.includes("http") || image_url.includes("ipfs")
        ? image_url
        : `${basePath}${image_url}`
    );
    if (img_url.protocol.includes("ipfs")) {
      img_url = `https://ipfs.io/ipfs/${ipfs2http(image_url)}`;
    }
    return img_url;
  }
};

export const fetcher = (url) => fetch(url).then((r) => r.json());

export const json2query = (json) => {
  return Object.keys(json)
    .map((key) => key + "=" + json[key])
    .join("&");
};

export const formatPrice = (price) => {
  // wei = 10^18
  if (price !== "-") return (price / 10 ** 18).toFixed(2);
  else return "-";
};

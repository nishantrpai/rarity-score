export const config = {
  env: "prod",
  LOCAL_API_URL: "localhost:3000",
  API_URL: "gnome-rarity-score.vercel.app",
  COLLECTION_NAME: "Sui Gnomes",
  COLLECTION_TITLE: "Sui Gnomes",
  COLLECTION_DESCRIPTION: "Just your typical Gnome NFT collection",
  COLLECTION_IMG_LINK: "https://gnome-rarity-score.vercel.app/og.png",
  CONTRACT: {},
  // if you're not sure, set CONTRACT: {}, will remove opensea link
  // CHAIN: "ethereum", //possible values of ethereum, matic (polygin), klatyn, solana
  // ADDRESS: "0x5537d90a4a2dc9d9b37bab49b490cf67d4c54e91", //note: for solana these values change, so currently not supported
  // },
  WEIGHTS: {
    "Crystal sparkle": 15000,
    "King's cloak": 3000,
    "King's crown": 3000,
    Princess: 1000,
    "Princess' tiara": 1000,
  },
};

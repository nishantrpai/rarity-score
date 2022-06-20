export const config = {
  env: "prod",
  LOCAL_API_URL: "localhost:3000",
  API_URL: "odp-rarity.vercel.app",
  COLLECTION_NAME: "OneDayPunks",
  COLLECTION_TITLE: "One Day Punks",
  COLLECTION_DESCRIPTION: '10k "One Day I\'ll Be A Punk"-punks.',
  COLLECTION_IMG_LINK: "https://punkscape.xyz/og.png",
  CONTRACT: {
    // if you're not sure, set CONTRACT: {}, will remove opensea link
    CHAIN: "ethereum", //possible values of ethereum, matic (polygin), klatyn, solana
    ADDRESS: "0x5537d90a4a2dc9d9b37bab49b490cf67d4c54e91", //note: for solana these values change, so currently not supported
  },
  WEIGHTS: {},
};

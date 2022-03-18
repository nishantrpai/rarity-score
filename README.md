# Rarity Score Template

Implement your own rarity tools using this template.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fnishantrpai%2Frarity-score&project-name=rarity-score&repo-name=rarity-score)

References:

- https://raritytools.medium.com/ranking-rarity-understanding-rarity-calculation-methods-86ceaeb9b98c
- https://github.com/punkscape/01-rarity-analyser-hackathon

# Needs

Who is this project for and what are their needs?

**Creator**: Person who is making the NFT collection

- Save fees
- Sell collection
- Build community
- Generate hype
- Easily deploy

**Buyer**: People who have bought the nft

- Trade nft
- Buy low
- Sell high
- Collect drops

**Developers**: People who maintain this project

- Clear documentation
- Easily iterate

# Features

- List NFTs from JSON (`data/collection.json`).
- Filter NFTs based on traits, attributes.
- Share NFT for `token_id`: Display rarity score, rarity rank and price (useful for buyers)
- If you deploy using Vercel, changes are deployed automatically.

PS: All webpages are responsive

# How to use

Once you have deployed, you need to change the following for your use:

Using locally:

1. Install packages
```
yarn install
```

2. Change the JSON in `data/collection.json` to your collection.json. If there is an error, raise it as an issue. JSON follows [opensea standards](https://docs.opensea.io/docs/metadata-standards)

3. Change `config/index.js`:
  - `env` : If you're using locally set it to `local`, while deploying set it to `prod`.
  - `LOCAL_API_URL`: Port at which app is running locally. Default value of `http://localhost:3000`
  - `API_URL`: Your vercel URL (when you deploy)
  - `COLLECTION_NAME`: Opensea collection name "OneDayPunks" is an example
  - `COLLECTION_TITLE`: This is for the website title (for SEO)
  - `COLLECTION_DESCRIPTION`: og:description (for SEO)
  - `COLLECTION_IMG_LINK`: og:image for website (for SEO)

[Reference for SEO](https://www.heymeta.com/url/odp-rarity.vercel.app)

4. Running it locally

```
yarn run dev
```

# 😫 Don't feel like it?

Reach out to me on [Twitter](https://twitter.com/PaiNishant) or [Discord](https://discordapp.com/users/nishu#4633), will deploy it for you.

PS: This is a paid service.

## 🧾 Have I done it before?

Yes, deployed it for:
- [Larp Island](https://larpisland.vercel.app): Took me 1 day, there were issues in metadata/codebase. Fixed all of them. [Transaction Proof](https://etherscan.io/tx/0xe40e628eca5997f5194b371369a64c7e40a12786cb54d9037e853560bfa5a2e5)

*will add testimonial*

## ▶️ How does it work?

0. Exchange greetings, finish payments.

1. I'll request you for project related details, github creds.

2. Fix the json (if any errors), ensure everything is working and update you along 

3. Tell me any issues you have, can add custom fixes.

4. You get the rarity score for your project, you are extremely happy and leave a tweet that tells everyone how great this service was 🍻

# Stack

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)

# Donate

- Solana: 9dPN7gdN9cyGhjiQn5gBU9DQDBxUJafvS873BcW3mpFT

- Ethereum: 0x5A8064F8249D079f02bfb688f4AA86B6b2C65359 

- ENS for donating: nishantpai.eth

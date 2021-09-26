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

```
yarn install
```

- Change the JSON in `data/collection.json` to your collection.json. If there is an error, raise it as an issue. JSON follows [opensea standards](https://docs.opensea.io/docs/metadata-standards)

- Change `config/index.js`:
  - `API_URL`: Your vercel URL (when you deploy) or `localhost:3000` if you want to use it locally
  - `COLLECTION_NAME`: Opensea collection name "OneDayPunks" is an example
  - `COLLECTION_TITLE`: This is for the website title (for SEO)
  - `COLLECTION_DESCRIPTION`: og:description (for SEO)
  - `COLLECTION_IMG_LINK`: og:image for website (for SEO)

[Reference for SEO](https://www.heymeta.com/url/odp-rarity.vercel.app)

# Stack

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)

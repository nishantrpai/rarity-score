import { getNFT } from "../../util/nfts"

export default function nftAPI(req, res) {
  const { id } = req.query
  const nft = getNFT(id);
  res.status(200).json(nft)
}

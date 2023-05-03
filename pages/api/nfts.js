// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getNFTs } from "../../util/nfts";

export default function nftsAPI(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  let {
    page_id = 0,
    sort_by = "rarity_score",
    order = "desc",
    traits = "",
    attr_count = "",
    query,
  } = req.query;
  let { nfts, pages } = getNFTs(
    page_id,
    sort_by,
    order,
    traits.split(",").filter((val) => val),
    attr_count,
    query
  );
  res.status(200).json({ nfts, pages });
}

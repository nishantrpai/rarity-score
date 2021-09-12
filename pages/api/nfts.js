// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getNFTs } from "../../util/nfts";

export default function nftsAPI(req, res) {
    let { page_id, sort_by, order } = req.query;
    page_id = page_id ? page_id : 0;
    let nfts = getNFTs(page_id, sort_by, order);
    res.status(200).json(nfts);
}

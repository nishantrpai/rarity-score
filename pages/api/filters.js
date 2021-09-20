// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getFilters } from "../../util/nfts";

export default function filtersAPI(req, res) {
    let filters = getFilters();
    res.status(200).json(filters);
}

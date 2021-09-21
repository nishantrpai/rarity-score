// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getFilters } from "../../util/nfts";

export default function filtersAPI(req, res) {
    let { traits = '', attr_count = '' } = req.query;
    let filters = getFilters(traits.split(',').filter(val => val), attr_count);
    res.status(200).json(filters);
}

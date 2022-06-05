// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getFilters } from "../../util/nfts";

export default function filtersAPI(req, res) {
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
  let { traits = "", attr_count = "" } = req.query;
  let filters = getFilters(
    traits.split(",").filter((val) => val),
    attr_count
  );
  res.status(200).json(filters);
}

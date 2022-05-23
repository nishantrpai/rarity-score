// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let nfts = require("../data/collection.json");
import { config } from "../config";
const weights = config.WEIGHTS ?? {};

/**
 * Main file where rarity score is calculated
 */

/**
 * Get trait weight from config
 * Added for desirability
 * @param {*} trait_value : value of trait
 * @returns weight of trait value
 */
const get_weight = (trait_value) => {
  if (weights[trait_value]) return weights[trait_value];
  return 1;
};

/**
 * Get all traits in the collection and attribute count array
 * @param {*} nft_arr : nft collection from collection.json
 * @returns all traits in the collection and attribute array
 */
const get_all_traits = (nft_arr) => {
  let all_traits = {};
  let attr_count = {}; //track attribute count of each nft
  for (let i = 0; i < nft_arr.length; i++) {
    let nft = nft_arr[i];
    if (nft) {
      let { attributes } = nft;
      attributes = attributes.filter(
        (attribute) =>
          attribute["trait_type"] &&
          attribute["value"] &&
          attribute["value"] != "None"
      );
      if (attr_count[attributes.length]) {
        attr_count[attributes.length] = attr_count[attributes.length] + 1;
      } else {
        attr_count[attributes.length] = 1;
      }
      for (let j = 0; j < attributes.length; j++) {
        let attribute = attributes[j];
        let { trait_type, value } = attribute;
        if (trait_type && value && value !== "None") {
          if (all_traits[trait_type]) {
            // trait exists
            all_traits[trait_type].sum++;
            if (all_traits[trait_type]["attributes"][value]) {
              // trait exists, value exists
              all_traits[trait_type]["attributes"][value].count++;
            } else {
              // trait exists, value doesn't
              all_traits[trait_type]["attributes"][value] = { count: 1 };
            }
          } else {
            // trait or value don't exist
            all_traits[trait_type] = {
              attributes: { [value]: { count: 1 } },
              sum: 1,
            };
          }
        }
      }
    }
  }
  return { all_traits, attr_count };
};

/**
 * Return trait sum for trait type
 * @param {*} trait_type : trait type (category not value)
 * @param {*} all_traits : all traits in the collection
 * @returns
 */
const get_trait_rarity_score = (trait_type, all_traits) => {
  return all_traits[trait_type].sum;
};

/**
 * Set missing traits for each nft token
 * @param {*} nft : token with attributes
 * @param {*} missing_traits : traits that are not present
 * @param {*} all_traits : all traits in the collection
 */
const set_missing_traits = (nft, missing_traits, all_traits) => {
  // How many traits don't have say Eyes, Mouth
  let totaltraits = nfts.length;
  nft["missing_traits"] = [];
  for (let i = 0; i < missing_traits.length; i++) {
    let missing_trait = missing_traits[i];
    let rarity_count = get_trait_rarity_score(missing_trait, all_traits);
    let missing_count = totaltraits - rarity_count;
    let percentile = missing_count / totaltraits;
    let rarity_score = 1 / percentile;

    nft["missing_traits"].push({
      trait_type: missing_trait,
      rarity_score,
      count: missing_count,
      percentile,
    });
  }
};

/**
 * Set rarity of each trait in attributes
 * @param {*} nft : nft json
 * @param {*} all_traits : all traits in the collection
 */
const set_trait_rarity = (nft, all_traits) => {
  if (nft) {
    let { attributes } = nft;
    attributes = attributes.filter(
      (attribute) =>
        attribute["trait_type"] &&
        attribute["value"] &&
        attribute["value"] != "None"
    );
    let missing_traits = Object.keys(all_traits);
    for (let i = 0; i < attributes.length; i++) {
      let attribute = attributes[i];
      if (attribute) {
        let { trait_type, value } = attribute;
        if (trait_type && value && value !== "None") {
          attribute["count"] =
            all_traits[trait_type]["attributes"][value].count;
          // remove traits that are present
          missing_traits = missing_traits.filter(
            (trait) => trait !== trait_type
          );
        }
      }
    }
    set_missing_traits(nft, missing_traits, all_traits);
  }
};

/**
 * Set rarity of NFT of present traits
 * @param {*} nft
 */
const set_nft_rarity = (nft, all_traits) => {
  let sumoftraits = nfts.length; //All types humans, aliens
  if (nft) {
    let { attributes } = nft;
    attributes = attributes.filter(
      (attribute) =>
        attribute["trait_type"] &&
        attribute["value"] &&
        attribute["value"] != "None"
    );
    for (let i = 0; i < attributes.length; i++) {
      let attribute = attributes[i];
      let { trait_type, value } = attribute;
      attribute["percentile"] = attribute["count"] / sumoftraits;
      attribute["rarity_score"] = 1 / attribute["percentile"];
      attribute["rarity_score"] *= get_weight(attribute["value"]);
      attribute["rarity_score_normalized"] =
        all_traits[trait_type]["attributes"][value].rarity_score_normalized;
    }
  }
};

/**
 * Calculate rarity of attribute count
 * @param {*} nft
 */
const calculate_attribute_rarity = (nft) => {
  let { attributes } = nft;
  attributes = attributes.filter(
    (attribute) =>
      attribute["trait_type"] &&
      attribute["value"] &&
      attribute["value"] != "None"
  );
  let sumoftraits = nfts.length;
  nft["trait_count"] = {
    count: attributes.length,
    percentile: attr_count[attributes.length] / sumoftraits,
    rarity_score: 1 / (attr_count[attributes.length] / sumoftraits),
  };
};

/**
 * Calculate rarity of NFT
 * Stored at "rarity_score"
 * @param {*} nft : NFT after all attributes (rarity_score etc.,) have been added
 *
 */
const calculate_nft_rarity = (nft) => {
  let { attributes, missing_traits } = nft;
  attributes = attributes.filter(
    (attribute) =>
      attribute["trait_type"] &&
      attribute["value"] &&
      attribute["value"] != "None"
  );
  nft["rarity_score"] = 0;
  nft["rarity_score_normalized"] = 0;
  for (let i = 0; i < attributes.length; i++) {
    nft["rarity_score"] += attributes[i]["rarity_score"];
    nft["rarity_score_normalized"] += attributes[i]["rarity_score_normalized"];
  }

  for (let i = 0; i < missing_traits.length; i++) {
    nft["rarity_score"] += missing_traits[i]["rarity_score"];
  }
  nft["rarity_score"] += nft["trait_count"]["rarity_score"];
};

/**
 * Function is responsible for filtering tokens that are not present
 * and updating the 'attributes' param
 * @param {*} nft : nft json
 */
const filter_nft_attributes = (nft) => {
  nft["attributes"] = nft["attributes"].filter(
    (attribute) =>
      attribute["trait_type"] &&
      attribute["value"] &&
      attribute["value"] != "None"
  );
};

/**
 * Set rarity rank based on rarity score
 * @param {*} nft
 * @param {*} rank
 * @returns nft token with rarity rank
 */
const set_nft_rank = (nft, rank) => {
  if (nft) {
    nft["rarity_rank"] = rank;
    return { ...nft };
  }
};

/**
 * INIT function for setting a rarity score for all tokens
 */
const set_nfts_rank = () => {
  nfts = nfts
    .map((nft) => getNFT(nft.id))
    .sort((x, y) => y["rarity_score"] - x["rarity_score"])
    .map((nft, index) => set_nft_rank(nft, index))
    .sort((x, y) => x["id"] - y["id"]);
};

/**
 *
 * @param {*} nft
 * @param {*} traits
 * @returns
 */
const filter_nft = (nft, traits) => {
  if (traits.length > 0 && nft) {
    let { attributes } = nft;
    let traits_count = traits.length;
    attributes = attributes.filter(
      (attribute) =>
        attribute["trait_type"] &&
        attribute["value"] &&
        attribute["value"] != "None"
    );
    for (let i = 0; i < attributes.length; i++) {
      let { trait_type, value } = attributes[i];
      for (let j = 0; j < traits.length; j++) {
        let [queryTraitType, queryTraitValue] = traits[j].split(":");
        if (trait_type == queryTraitType && value == queryTraitValue)
          traits_count--;
      }
    }

    if (traits_count == 0) return true;
    else return false;
  }
  return true;
};

/**
 * Used for filtering nft by attribute count
 * @param {*} nft : nft token whose attribute count is to be checked
 * @param {*} attr_count : attribute count user has selected
 * @returns if the nft has attributes = attr_count
 */
const filter_attr_count = (nft, attr_count) => {
  if (attr_count !== "") {
    if (nft.trait_count.count == attr_count) return true;
    else return false;
  }
  return true;
};

/**
 * Used by search bar (sidebar)
 * Filters ONLY on the basis of name
 * @param {*} nft : NFT token is passed to the
 * @param {*} query : query is the input the user adds in the search bar
 * @returns true/false if name is present or not
 */
const filter_nft_query = (nft, query) => {
  if (query) {
    if (nft.name.toString().includes(query)) {
      return true;
    }
    return false;
  }
  return true;
};

/**
 * set stats for traits min,max,mean and std
 * @param {*} all_traits
 */
const get_stats = (all_traits) => {
  let collection_stats = {
    min: Number.MAX_VALUE,
    max: 0,
    mean: 0,
  };
  let collection_arr = [];

  Object.keys(all_traits).forEach((trait_type) => {
    let stats = {
      min: Number.MAX_VALUE,
      max: 0,
      mean:
        all_traits[trait_type].sum /
        Object.keys(all_traits[trait_type]["attributes"]).length,
      std: 0,
      numvalues: Object.keys(all_traits[trait_type]["attributes"]).length,
    };

    let variance = 0;

    Object.keys(all_traits[trait_type]["attributes"]).map((trait_value) => {
      let val = all_traits[trait_type]["attributes"][trait_value].count;

      if (val < stats["min"]) stats["min"] = val;
      if (val > stats["max"]) stats["max"] = val;

      if (val < collection_stats["min"]) collection_stats["min"] = val;
      if (val > collection_stats["max"]) collection_stats["max"] = val;

      variance += (val - stats["mean"]) ** 2;

      collection_arr.push(val);
    });

    variance =
      variance / Object.keys(all_traits[trait_type]["attributes"]).length;
    stats["std"] = Math.sqrt(variance);
    all_traits[trait_type]["stats"] = stats;
  });

  let collection_sum = collection_arr.reduce((prev, curr) => prev + curr, 0);
  collection_stats["mean"] = collection_sum / collection_arr.length;
  return { all_traits, collection_stats };
};

/**
 * add normalized rarity score in all_traits that nft tokens can later reference
 * @param {*} all_traits
 * @param {*} collection_stats
 */
const add_normalized_rarities = (all_traits, collection_stats) => {
  // https://github.com/mikko-o/rarity-analyser/blob/c78ee9d5b577b7e7a05c3fe4087808235cf6be05/src/analysis.ts#L460
  // for reference
  let collection_mean = collection_stats.mean;
  let attr_sum = 0;

  Object.keys(all_traits).map((trait_type) => {
    attr_sum += all_traits[trait_type]["stats"].numvalues;
  });
  let attr_mean = attr_sum / Object.keys(all_traits).length;

  Object.keys(all_traits).map((trait_type) => {
    let { stats, attributes } = all_traits[trait_type];
    let a, b;
    if (stats.mean >= collection_mean)
      a = (stats.mean - collection_mean) / stats.mean;
    else a = (collection_mean - stats.mean) / collection_mean;

    if (stats.numvalues >= attr_mean)
      b = (stats.numvalues - attr_mean) / stats.numvalues;
    else b = (attr_mean - stats.numvalues) / attr_mean;

    const c = stats.numvalues >= attr_mean ? 1 - b : 1 + b;

    Object.keys(attributes).map((attribute) => {
      // rarity score
      let r = 1 / (attributes[attribute].count / nfts.length);
      let rarity_score_normalized;
      if (
        a >= b &&
        ((stats.mean > collection_mean && stats.numvalues > attr_mean) ||
          (stats.mean < collection_mean && stats.numvalues < attr_mean))
      )
        rarity_score_normalized = (r - (a - b) * r) * c + (a - b) * r;
      else rarity_score_normalized = (r - a * r) * c + a * r;

      all_traits[trait_type]["attributes"][attribute][
        "rarity_score_normalized"
      ] = rarity_score_normalized;
    });
  });
};

/**
 * Retrieve NFT for specific id
 * Function is responsible for all computation of rarity score for token
 * @param {*} id : token "id" from collection.json
 * @returns nft token after all calculations
 */
export const getNFT = (id) => {
  // Retrieve nft for id
  // Precompute the frequency for each trait
  nfts = nfts.sort((x, y) => x["id"] - y["id"]);
  let nft = nfts[id];
  if (nft) {
    filter_nft_attributes(nft);
    set_trait_rarity(nft, all_traits);
    set_nft_rarity(nft, all_traits);
    calculate_attribute_rarity(nft);
    calculate_nft_rarity(nft);
    return { ...nft };
  }
};

/**
 * Sends all attribute type and value as array (sidebar)
 * @param {*} traits : traits user has selected
 * @param {*} atr : attributes user has selected
 * @returns all traits and attributes after filtering
 */
export const getFilters = (traits, atr) => {
  let nftcollection = nfts
    .filter((nft) => filter_nft(nft, traits))
    .filter((nft) => filter_attr_count(nft, atr));

  let { all_traits, attr_count } = get_all_traits(nftcollection);
  let { all_traits: all_traits_stats, collection_stats } =
    get_stats(all_traits);
  add_normalized_rarities(all_traits_stats, collection_stats);
  return { all_traits: all_traits_stats, attr_count, collection_stats };
};

/**
 * Filters NFT by which page, order, attr count (app)
 * @param {*} page_id : used to page buttons at the bottom
 * @param {*} sort_by : used by order filters in the order for which field e.g., rarity/token id
 * @param {*} order : used by order filters in the sidebar for asc/desc
 * @param {*} traits : used by trait filters on the sidebar for e.g., Hair
 * @param {*} attr_count : used by trait filters
 * @param {*} query : used by search function
 * @returns nft collection after all filters are run
 */
export const getNFTs = (page_id, sort_by, order, traits, attr_count, query) => {
  let nftcollection = nfts
    .filter((nft) => filter_nft_query(nft, query))
    .sort((x, y) =>
      order == "asc" ? x[sort_by] - y[sort_by] : y[sort_by] - x[sort_by]
    )
    .filter((nft) => filter_nft(nft, traits))
    .filter((nft) => filter_attr_count(nft, attr_count));
  let nftdata = nftcollection.slice(page_id * 54, page_id * 54 + 54);
  let pages = Math.ceil(nftcollection.length / 54);

  return { nfts: nftdata, pages };
};

let { all_traits, attr_count } = get_all_traits(nfts);
let { all_traits: all_traits_stats, collection_stats } = get_stats(all_traits);
add_normalized_rarities(all_traits_stats, collection_stats);
all_traits = all_traits_stats;
set_nfts_rank();

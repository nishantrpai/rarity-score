// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let nfts = require("../data/collection.json");

const get_all_traits = (nft_arr) => {
  let all_traits = {};
  let attr_count = {}; //track attribute count of each nft
  console.log(nft_arr.length);
  for (let i = 0; i < nft_arr.length; i++) {
    let nft = nft_arr[i];
    if (nft) {
      let { attributes } = nft;
      attributes = attributes.filter(
        (attribute) => attribute["trait_type"] && attribute["value"]
      );
      if (attr_count[attributes.length]) {
        attr_count[attributes.length] = attr_count[attributes.length] + 1;
      } else {
        attr_count[attributes.length] = 1;
      }
      for (let j = 0; j < attributes.length; j++) {
        let attribute = attributes[j];
        let { trait_type, value } = attribute;
        if (trait_type && value) {
          if (all_traits[trait_type]) {
            // trait exists
            all_traits[trait_type].sum++;
            if (all_traits[trait_type][value]) {
              // trait exists, value exists
              all_traits[trait_type][value]++;
            } else {
              // trait exists, value doesn't
              all_traits[trait_type][value] = 1;
            }
          } else {
            // trait or value don't exist
            all_traits[trait_type] = { [value]: 1, sum: 1 };
          }
        }
      }
    }
  }
  return { all_traits, attr_count };
};

let { all_traits, attr_count } = get_all_traits(nfts);

const get_trait_rarity_score = (trait_type, all_traits) => {
  return all_traits[trait_type].sum;
};

const set_missing_traits = (nft, missing_traits, all_traits) => {
  // How many traits don't have say Eyes, Mouth
  let totaltraits = all_traits["type"].sum;
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

const set_trait_rarity = (nft, all_traits) => {
  if (nft) {
    let { attributes } = nft;
    attributes = attributes.filter(
      (attribute) => attribute["trait_type"] && attribute["value"]
    );
    let missing_traits = Object.keys(all_traits);
    for (let i = 0; i < attributes.length; i++) {
      let attribute = attributes[i];
      if (attribute) {
        let { trait_type, value } = attribute;
        if (trait_type && value) {
          attribute["count"] = all_traits[trait_type][value];
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

const set_nft_rarity = (nft, all_traits) => {
  let sumoftraits = all_traits["type"].sum; //All types humans, aliens
  if (nft) {
    let { attributes } = nft;
    attributes = attributes.filter(
      (attribute) => attribute["trait_type"] && attribute["value"]
    );
    for (let i = 0; i < attributes.length; i++) {
      let attribute = attributes[i];
      attribute["percentile"] = attribute["count"] / sumoftraits;
      attribute["rarity_score"] = 1 / (attribute["count"] / sumoftraits);
    }
  }
};

const calculate_attribute_rarity = (nft) => {
  let { attributes } = nft;
  attributes = attributes.filter(
    (attribute) => attribute["trait_type"] && attribute["value"]
  );
  let sumoftraits = all_traits["type"].sum;
  nft["trait_count"] = {
    count: attributes.length,
    percentile: attr_count[attributes.length] / sumoftraits,
    rarity_score: 1 / (attr_count[attributes.length] / sumoftraits),
  };
};

const calculate_nft_rarity = (nft) => {
  let { attributes, missing_traits } = nft;
  attributes = attributes.filter(
    (attribute) => attribute["trait_type"] && attribute["value"]
  );
  nft["rarity_score"] = 0;
  for (let i = 0; i < attributes.length; i++) {
    nft["rarity_score"] += attributes[i]["rarity_score"];
  }

  for (let i = 0; i < missing_traits.length; i++) {
    nft["rarity_score"] += missing_traits[i]["rarity_score"];
  }
  nft["rarity_score"] += nft["trait_count"]["rarity_score"];
};

const filter_nft_attributes = (nft) => {
  nft["attributes"] = nft["attributes"].filter(
    (attribute) => attribute["trait_type"] && attribute["value"]
  );
};

export const getNFT = (id) => {
  // Retrieve nft for id
  // Precompute the frequency of each trait
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

export const set_nft_rank = (nft, rank) => {
  nft["rarity_rank"] = rank;
  return { ...nft };
};

const set_nfts_rank = () => {
  console.log("set nfts rank");
  nfts = nfts
    .map((nft) => getNFT(nft.id))
    .sort((x, y) => y["rarity_score"] - x["rarity_score"])
    .map((nft, index) => set_nft_rank(nft, index))
    .sort((x, y) => x["id"] - y["id"]);
};

set_nfts_rank();

const filterNFT = (nft, traits) => {
  if (traits.length > 0) {
    let { attributes } = nft;
    let traits_count = traits.length;
    attributes = attributes.filter(
      (attribute) => attribute["trait_type"] && attribute["value"]
    );
    for (let i = 0; i < attributes.length; i++) {
      let { trait_type, value } = attributes[i];
      for (let j = 0; j < traits.length; j++) {
        if (trait_type == traits[j] || value == traits[j]) traits_count--;
      }
    }

    if (traits_count == 0) return true;
    else return false;
  }
  return true;
};

const filterAttrCount = (nft, attr_count) => {
  if (attr_count !== "") {
    if (nft.trait_count.count == attr_count) return true;
    else return false;
  }
  return true;
};

export const getFilters = (traits, atr) => {
  let nftcollection = nfts
    .filter((nft) => filterNFT(nft, traits))
    .filter((nft) => filterAttrCount(nft, atr));

  let { all_traits: traits_tmp, attr_count: atr_tmp } =
    get_all_traits(nftcollection);
  for (let i = 0; i < Object.keys(traits_tmp).length; i++) {
    let key = Object.keys(traits_tmp)[i];
    delete traits_tmp[key]["sum"];
  }
  return { all_traits: traits_tmp, attr_count: atr_tmp };
};

export const filterNFTQuery = (nft, query) => {
  if (query) {
    if (nft.id.toString().includes(query)) return true;
    return false;
  }
  return true;
};

export const getNFTs = (page_id, sort_by, order, traits, attr_count, query) => {
  let nftcollection = nfts
    .filter((nft) => filterNFTQuery(nft, query))
    .sort((x, y) =>
      order == "asc" ? x[sort_by] - y[sort_by] : y[sort_by] - x[sort_by]
    )
    .filter((nft) => filterNFT(nft, traits))
    .filter((nft) => filterAttrCount(nft, attr_count));
  let nftdata = nftcollection.slice(page_id * 54, page_id * 54 + 54);
  let pages = nftcollection.length / 54;

  return { nfts: nftdata, pages };
};

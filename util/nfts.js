// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nfts from '../data/collection.json';

const get_all_traits = () => {
  let all_traits = {};
  for (let i = 0; i < nfts.length; i++) {
    let nft = nfts[i];
    if (nft) {
      let { attributes } = nft;
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
            all_traits[trait_type] = { [value]: 1, sum: 1 }
          }
        }
      }
    }
  }
  return all_traits;
}

let all_traits = get_all_traits();


const get_trait_rarity_score = (trait_type, all_traits) => {
  return all_traits[trait_type].sum;
}

const set_missing_traits = (nft, missing_traits, all_traits) => {
  // How many traits don't have say Eyes, Mouth
  let totaltraits = all_traits['type'].sum;
  nft['missing_traits'] = [];
  for (let i = 0; i < missing_traits.length; i++) {
    let missing_trait = missing_traits[i];
    let rarity_count = get_trait_rarity_score(missing_trait, all_traits);
    let missing_count = totaltraits - rarity_count; 
    let rarity_score = (1 / (missing_count / totaltraits));
    nft['missing_traits'].push({ trait_type: missing_trait, rarity_score, missing_count });
    nft['rarity_score'] += rarity_score;
  }
}

const set_trait_rarity = (nft, all_traits) => {
  if (nft) {
    let { attributes } = nft;
    let missing_traits = Object.keys(all_traits);
    for (let i = 0; i < attributes.length; i++) {
      let attribute = attributes[i];
      if (attribute) {
        let { trait_type, value } = attribute;
        attribute['trait_count'] = all_traits[trait_type][value];
        // remove traits that are present
        missing_traits = missing_traits.filter(trait => trait !== trait_type);
      }
    }
    set_missing_traits(nft, missing_traits, all_traits);
  }
}

const set_nft_rarity = (nft, all_traits) => {
  let sumoftraits = all_traits['type'].sum; //All types humans, aliens 
  if (nft) {
    let { attributes } = nft;
    let rarity_score = 0;
    for (let i = 0; i < attributes.length; i++) {
      let attribute = attributes[i];
      attribute['rarity_score'] = 1 / (attribute['trait_count'] / sumoftraits);
      rarity_score += attribute['rarity_score'];
    }
    nft['rarity_score'] = rarity_score;
  }
}

export const getNFT = (id) => {
  // Retrieve nft for id
  // Precompute the frequency of each trait
  let nft = nfts[id];
  set_trait_rarity(nft, all_traits);
  set_nft_rarity(nft, all_traits);
  return { ...nft };
}


export const getNFTs = (page_id, sort_by, order) => {
  let nftcollection = nfts
    .map(nft => getNFT(nft.id))
    .sort((x, y) =>
      order == 'asc' ?
        (x[sort_by] - y[sort_by]) :
        (y[sort_by] - x[sort_by]))
    .slice(page_id * 12, ((page_id * 12) + 12))

  return nftcollection;
}
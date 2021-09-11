// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import punks from '../../data/collection.json';

const get_all_traits = () => {
  let all_traits = {};
  for (let i = 0; i < punks.length; i++) {
    let punk = punks[i];
    let { attributes } = punk;
    for (let j = 0; j < attributes.length; j++) {
      let attribute = attributes[j];
      let { trait_type, value } = attribute;
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
  return all_traits;
}

const get_trait_rarity_score = (trait_type, all_traits) => {
  return all_traits[trait_type].sum;
}

const set_missing_traits = (punk, missing_traits, all_traits) => {
  // calculate rarity score for missing traits
  punk['missing_traits'] = {};
  for (let i = 0; i < missing_traits.length; i++) {
    let missing_trait = missing_traits[i];
    let rarity_score = get_trait_rarity_score(missing_trait, all_traits);
    punk['missing_traits'][missing_trait] = rarity_score
  }
}

const set_trait_rarity = (punk, all_traits) => {
  let { attributes } = punk;
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
  set_missing_traits(punk, missing_traits, all_traits);
}

const set_punk_rarity = (punk, all_traits) => {
  let sumoftraits = all_traits['type'].sum; //All types humans, aliens 
  let { attributes } = punk;
  let rarity_score = 0;
  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i];
    attribute['rarity_score'] = 1 / (attribute['trait_count'] / sumoftraits);
    rarity_score += attribute['rarity_score'];
  }
  punk['rarity_score'] = rarity_score;
}

const getPunk = (id) => {
  // Retrieve punk for id
  // Precompute the frequency of each trait
  let all_traits = get_all_traits();
  let punk = punks[id];
  set_trait_rarity(punk, all_traits);
  set_punk_rarity(punk, all_traits);
  return { ...punk };
}

export default function punkAPI(req, res) {
  const { id } = req.query
  const punk = getPunk(id)
  res.status(200).json({ punk })
}

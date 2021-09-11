// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import punks from '../../data/collection.json';

const get_all_traits = () => {
  let all_traits = {};
  for (let i = 0; i < punks.length; i++) {
    let punk = punks[i];
    let { attributes } = punk;
    for (let j = 0; j < attributes.length; j++) {
      let attribute = attributes[j]['value']
      if (attribute in all_traits) {
        all_traits[attribute]++;
      } else {
        all_traits[attribute] = 1;
      }
    }
  }
  return all_traits;
}

const set_trait_rarity = (all_traits, attributes) => {
  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i];
    attribute['trait_count'] = all_traits[attribute.value];
  }
}

const set_punk_rarity = (all_traits, punk) => {
  let sumoftraits = 10000; //assuming
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
  let { attributes } = punk;
  set_trait_rarity(all_traits, attributes);
  set_punk_rarity(all_traits, punk);
  return { ...punk };
}

export default function punkAPI(req, res) {
  const { id } = req.query
  const punk = getPunk(id)
  res.status(200).json({ punk })
}

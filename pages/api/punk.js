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

const get_trait_rarity = (all_traits, traits) => {
  // Calculate rarity for given trait
  
  return all_traits;
}

const getPunk = (id) => {
  // Retrieve punk for id

  // Precompute the frequency of each trait
  let all_traits = get_all_traits();
  let punk = punks[id];
  let { attributes } = punk;

  let metadata = get_trait_rarity(all_traits, attributes);
  return { ...punk, metadata };
}

export default function punkAPI(req, res) {

  const { id } = req.query
  const punk = getPunk(id)
  res.status(200).json({ punk })
}

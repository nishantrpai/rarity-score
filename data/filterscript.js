const collection = require("./collection.json");
/**
 * script for running any filters on collection
 */

for (let i = 0; i < collection.length; i++) {
  for (let j = 0; j < collection[i]["attributes"].length; j++) {
    let attribute = collection[i]["attributes"][j];
    console.log(attribute);
  }
}

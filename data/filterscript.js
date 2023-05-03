const collection = require("./collection.json");
const fs = require("fs");
/**
 * script for running any filters on collection
 */

for (let i = 0; i < collection.length; i++) {
  collection[i]["image"] = `/images/${i + 1}.png`;
  // for (let j = 0; j < collection[i]["attributes"].length; j++) {
  //   let attribute = collection[i]["attributes"][j];
  //   console.log(attribute);
  // }
}

fs.writeFile("./collection.json", JSON.stringify(collection), function (err) {
  if (err) return console.log(err);
  console.log("collection.json updated");
});

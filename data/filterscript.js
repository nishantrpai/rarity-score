const collection = require("./collection.json");
const fs = require("fs");
/**
 * script for running any filters on collection
 */

collection.map((val, i) => (collection[i]["id"] = i + 1));

console.log(collection[0]);

fs.writeFile("collection.json", JSON.stringify(collection), () => {
  console.log("done");
});

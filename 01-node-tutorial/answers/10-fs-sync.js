const { writeFileSync, readFileSync } = require("fs");
const path = require("path");

const filePath = path.join(".", "temporary", "fileA.txt");

writeFileSync(filePath, "First line\n");

writeFileSync(filePath, "Second line\n", { flag: "a"});
writeFileSync(filePath, "Third line\n", { flag: "a"});

const fileContents = readFileSync(filePath, "utf8");
console.log(fileContents);
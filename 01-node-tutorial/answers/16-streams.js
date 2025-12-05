const fs = require("fs");

const stream = fs.createReadStream("../content/big.txt", {
  encoding: "utf8",
  highWaterMark: 200,
});

let counter = 0;

stream.on("data", (chunk) => {
  counter++;
  console.log(chunk);
});

stream.on("end", () => {
  console.log(`Number of chunks received: ${counter}`);
});

stream.on("error", (error) => {
  console.error("An error occurred:", error);
});

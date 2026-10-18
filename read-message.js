const fs = require("node:fs");

const message = fs.readFileSync("message.txt", "utf8");

console.log(message);
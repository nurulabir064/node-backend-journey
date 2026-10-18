const fs = require("node:fs");

if (fs.existsSync("output.txt")) {
  const message = fs.readFileSync("output.txt", "utf8");
  console.log(message);
} else {
  console.log("File not found");
}
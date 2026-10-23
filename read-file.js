const path = require("node:path");
const { readFile } = require("node:fs/promises");

async function main() {
  const filePath = path.join(__dirname, "Testing Node.js file paths");

  try {
    const content = await readFile(filePath, "utf8");
    console.log(content);
  } catch (error) {
    console.log("Failed to read file:", error.message);
  }
}

main();

const fs = require("node:fs/promises");

async function readMessage() {
  try {
    ``` const content = await fs.readFile("message.txt", "utf8"); if (content.length === 0) { console.log("File is empty"); ``} else { console.log(content); }`
    const content = await fs.readFile("message.txt", "utf8");
    console.log(content);
  } catch (error) {
    console.log("File could not be read:", error.message);
  }
}

readMessage();

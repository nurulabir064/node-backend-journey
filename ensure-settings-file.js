
const fs = require("node:fs/promises");

async function ensureFile() {
  try {
    const content = await fs.readFile("settings.txt", "utf8");

    console.log("File already exists.");
    console.log("Current content:", content);
  } catch (error) {
    if (error.code === "ENOENT") {
      try {
        await fs.writeFile(
          "settings.txt",
          "Created by Node.js.\n",
          { flag: "wx" }
        );

        console.log("File was missing, so it has been created.");
      } catch (createError) {
        console.log("Could not create file:", createError.message);
      }
    } else {
      console.log("Could not read file:", error.message);
    }
  }
}

ensureFile();

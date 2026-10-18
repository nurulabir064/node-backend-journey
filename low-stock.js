const fs = require("node:fs/promises");
const path = require("node:path");

const sourceDir = path.join(__dirname, "organizer-test");

const categories = {
  Images: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
  Documents: [".pdf", ".doc", ".docx", ".txt", ".ppt", ".pptx", ".xls", ".xlsx"],
  Videos: [".mp4", ".mkv", ".mov"],
  Audio: [".mp3", ".wav", ".m4a"]
};

function getCategory(extension) {
  const normalizedExtension = extension.toLowerCase();

  for (const categoryName of Object.keys(categories)) {
    if (categories[categoryName].includes(normalizedExtension)) {
      return categoryName;
    }
  }

  return "Others";
}

async function organizeFiles() {
  try {
    const entries = await fs.readdir(sourceDir, {
      withFileTypes: true
    });

    let movedCount = 0;

    for (const entry of entries) {
      if (!entry.isFile()) {
        continue;
      }

      const sourcePath = path.join(sourceDir, entry.name);
      const extension = path.extname(entry.name);
      const categoryName = getCategory(extension);
      const destinationDir = path.join(sourceDir, categoryName);

      await fs.mkdir(destinationDir, {
        recursive: true
      });

      const destinationPath = path.join(destinationDir, entry.name);

      await fs.rename(sourcePath, destinationPath);

      console.log("Moved: " + entry.name + " -> " + categoryName);
      movedCount++;
    }

    console.log("Organization complete.");
    console.log("Total files moved: " + movedCount);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("Organizer test folder was not found.");
    } else {
      console.log("Could not organize files:", error.message);
    }
  }
}

organizeFiles();
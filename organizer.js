
const path = require("node:path");

const files = ["photo.jpg", "note.txt", "app.js", "music.mp3"];

for (const item of files) {
  const extension = path.extname(item);

  let folderName = "Others";

  if (extension === ".jpg") {
    folderName = "Images";
  } else if (extension === ".txt") {
    folderName = "Documents";
  } else if (extension === ".js") {
    folderName = "Code";
  }

  console.log(item, "->", folderName);
}

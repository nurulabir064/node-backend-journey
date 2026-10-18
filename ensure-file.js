
const fs = require("node:fs/promises");

async function readUserData() {
  try {
    const content = await fs.readFile("user.json", "utf8");
    const user = JSON.parse(content);

    console.log("Name:", user.name);
    console.log("Role:", user.role);
    console.log("Skills:", user.skills);
    console.log("Learning:", user.isLearning);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("User file was not found.");
    } else if (error instanceof SyntaxError) {
      console.log("The JSON data is invalid.");
    } else {
      console.log("Could not read user data:", error.message);
    }
  }
}

readUserData();

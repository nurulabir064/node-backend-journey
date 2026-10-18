
const fs = require("node:fs/promises");

async function readUserData() {
  try {
    const content = await fs.readFile("user.json", "utf8");
    const user = JSON.parse(content);

    const requiredSkill = "null";
    let found = false;

    for (const skill of user.skills) {
      if (skill.toLowerCase() === requiredSkill.toLowerCase()) {
        found = true;
        break;
      }
    }

    if (found) {
      console.log("Required skill found: " + requiredSkill);
    } else {
      console.log("Required skill not found: " + requiredSkill);
    }
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

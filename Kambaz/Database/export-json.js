import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import users from "./users.js";
import courses from "./courses.js";
import modules from "./modules.js";
import assignments from "./assignments.js";
import enrollments from "./enrollments.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Write users.json
fs.writeFileSync(
  path.join(__dirname, "users.json"),
  JSON.stringify(users, null, 2)
);
console.log("✓ Successfully created users.json");

// Write courses.json
fs.writeFileSync(
  path.join(__dirname, "courses.json"),
  JSON.stringify(courses, null, 2)
);
console.log("✓ Successfully created courses.json");

// Write modules.json
fs.writeFileSync(
  path.join(__dirname, "modules.json"),
  JSON.stringify(modules, null, 2)
);
console.log("✓ Successfully created modules.json");

// Write assignments.json
fs.writeFileSync(
  path.join(__dirname, "assignments.json"),
  JSON.stringify(assignments, null, 2)
);
console.log("✓ Successfully created assignments.json");

// Write enrollments.json
fs.writeFileSync(
  path.join(__dirname, "enrollments.json"),
  JSON.stringify(enrollments, null, 2)
);
console.log("✓ Successfully created enrollments.json");

console.log("\nAll JSON files have been exported successfully!");


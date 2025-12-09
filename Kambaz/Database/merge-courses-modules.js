import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import courses from "./courses.js";
import modules from "./modules.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a copy of courses to modify
const coursesWithModules = courses.map(course => ({
  ...course,
  modules: []
}));

// For each course, find matching modules and embed them
coursesWithModules.forEach(course => {
  const matchingModules = modules.filter(module => module.course === course._id);
  
  // Remove the "course" field from each module before embedding
  const modulesToEmbed = matchingModules.map(({ course, ...module }) => module);
  
  // Add modules to the course
  course.modules = modulesToEmbed;
  
  // Log how many modules were added
  console.log(`Course ${course._id} (${course.name}): Added ${modulesToEmbed.length} module(s)`);
});

// Write the updated courses to JSON file
fs.writeFileSync(
  path.join(__dirname, "courses-with-modules.json"),
  JSON.stringify(coursesWithModules, null, 2)
);

console.log(`\n✓ Successfully created courses-with-modules.json with ${coursesWithModules.length} course(s)`);


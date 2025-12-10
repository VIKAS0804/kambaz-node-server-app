import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import CourseModel from "./Kambaz/Courses/model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";

async function seedCourses() {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(CONNECTION_STRING);
    console.log("Connected to MongoDB");

    // Delete all null/invalid documents from courses collection
    console.log("Cleaning up null/invalid documents...");
    const deleteResult = await CourseModel.deleteMany({
      $or: [
        { _id: null },
        { name: null },
        { name: { $exists: false } }
      ]
    });
    console.log(`Deleted ${deleteResult.deletedCount} null/invalid document(s)`);

    // Read courses from JSON file
    console.log("Reading courses from JSON file...");
    const coursesPath = path.join(__dirname, "Kambaz/Database/courses-with-modules.json");
    const coursesData = JSON.parse(fs.readFileSync(coursesPath, "utf8"));
    console.log(`Found ${coursesData.length} course(s) to insert`);

    // Delete all existing courses (optional - uncomment if you want to start fresh)
    // await CourseModel.deleteMany({});
    // console.log("Deleted all existing courses");

    // Insert courses into MongoDB
    console.log("Inserting courses into MongoDB...");
    for (const course of coursesData) {
      try {
        // Use upsert to update if exists, insert if not
        await CourseModel.findOneAndUpdate(
          { _id: course._id },
          course,
          { upsert: true, new: true }
        );
        console.log(`✓ Inserted/Updated course: ${course._id} - ${course.name}`);
      } catch (error) {
        console.error(`✗ Error inserting course ${course._id}:`, error.message);
      }
    }

    console.log("\n✓ Seed completed successfully!");
    
    // Close connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding courses:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedCourses();


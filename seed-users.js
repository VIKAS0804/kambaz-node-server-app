import "dotenv/config";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import UserModel from "./Kambaz/Users/model.js";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";

const testUsers = [
  {
    _id: uuidv4(),
    username: "faculty_test",
    password: "faculty123",
    role: "FACULTY",
    firstName: "Faculty",
    lastName: "Test",
    email: "faculty@test.com"
  },
  {
    _id: uuidv4(),
    username: "student_test",
    password: "student123",
    role: "STUDENT",
    firstName: "Student",
    lastName: "Test",
    email: "student@test.com"
  },
  {
    _id: uuidv4(),
    username: "admin_test",
    password: "admin123",
    role: "ADMIN",
    firstName: "Admin",
    lastName: "Test",
    email: "admin@test.com"
  }
];

async function seedUsers() {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(CONNECTION_STRING);
    console.log("Connected to MongoDB");

    // Create test users
    console.log("\nCreating test users...");
    for (const userData of testUsers) {
      try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ username: userData.username });
        
        if (existingUser) {
          console.log(`✓ User "${userData.username}" already exists, skipping...`);
        } else {
          // Create new user
          const user = await UserModel.create(userData);
          console.log(`✓ Created user: ${user.username} (${user.role}) - ID: ${user._id}`);
        }
      } catch (error) {
        console.error(`✗ Error creating user "${userData.username}":`, error.message);
      }
    }

    console.log("\n✓ User seeding completed successfully!");
    
    // Close connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedUsers();


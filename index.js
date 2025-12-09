import "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import Database from "./Kambaz/Database/index.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import Lab5 from "./Lab5/index.js";
import Hello from "./Hello.js";

const app = express();

// CORS configuration - MUST come before session
const allowedOrigins = [
  "http://localhost:3000",
  "https://kambaz-next-js1-git-a5-vikas0804s-projects.vercel.app",
  "https://kambaz-next-js1-2cfzq8ro1-vikas0804s-projects.vercel.app"
];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Session configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

// Routes
Hello(app);
Lab5(app);
UserRoutes(app, Database);
CourseRoutes(app, Database);
ModuleRoutes(app, Database);
AssignmentRoutes(app);
EnrollmentRoutes(app, Database);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port 4000");
});
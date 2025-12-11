import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enrollUserInCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const { courseId } = req.params;
      const userId = currentUser._id;
      const enrollment = await dao.enrollUserInCourse(userId, courseId);
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ message: "Error enrolling in course", error: error.message });
    }
  };

  const unenrollUserFromCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const { courseId } = req.params;
      const userId = currentUser._id;
      await dao.unenrollUserFromCourse(userId, courseId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Error unenrolling from course", error: error.message });
    }
  };

  const findUsersForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const users = await dao.findUsersForCourse(courseId);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error finding users for course", error: error.message });
    }
  };

  app.post("/api/enrollments/current/:courseId", enrollUserInCourse);
  app.delete("/api/enrollments/current/:courseId", unenrollUserFromCourse);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
}
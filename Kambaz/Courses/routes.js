import CoursesDao from "./dao.js";

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);

  const findAllCourses = async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.send(courses);
    } catch (error) {
      res.status(500).json({ message: "Error finding courses", error: error.message });
    }
  };

  const findCourseById = async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await dao.findCourseById(courseId);
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Error finding course", error: error.message });
    }
  };

  const createCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      if (currentUser.role !== "FACULTY") {
        return res.status(403).json({ message: "Only faculty can perform this action" });
      }
      
      const newCourse = await dao.createCourse(req.body);
      res.json(newCourse);
    } catch (error) {
      res.status(500).json({ message: "Error creating course", error: error.message });
    }
  };

  const deleteCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      if (currentUser.role !== "FACULTY") {
        return res.status(403).json({ message: "Only faculty can perform this action" });
      }
      
      const { courseId } = req.params;
      const result = await dao.deleteCourse(courseId);
      
      if (!result) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Error deleting course", error: error.message });
    }
  };

  const updateCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      if (currentUser.role !== "FACULTY") {
        return res.status(403).json({ message: "Only faculty can perform this action" });
      }
      
      const { courseId } = req.params;
      const courseUpdates = req.body;
      await dao.updateCourse(courseId, courseUpdates);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Error updating course", error: error.message });
    }
  };

  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:courseId", findCourseById);
  app.post("/api/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
}

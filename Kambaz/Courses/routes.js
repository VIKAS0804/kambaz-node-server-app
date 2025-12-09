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

  const deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      await dao.deleteCourse(courseId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Error deleting course", error: error.message });
    }
  };

  const updateCourse = async (req, res) => {
    try {
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
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
}

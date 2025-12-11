import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  // GET /api/courses/:courseId/assignments - find assignments for a course
  const findAssignmentsForCourse = async (req, res) => {
    try {
      console.log("=== BACKEND: FIND ASSIGNMENTS ===");
      const { courseId } = req.params;
      console.log("Course ID:", courseId);
      const assignments = await dao.findAssignmentsForCourse(courseId);
      console.log("=== FOUND ASSIGNMENTS ===");
      console.log("Count:", assignments.length);
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: "Error finding assignments", error: error.message });
    }
  };

  // POST /api/courses/:courseId/assignments - create assignment (FACULTY only)
  const createAssignment = async (req, res) => {
    try {
      console.log("=== BACKEND: CREATE ASSIGNMENT ===");
      console.log("Request params (courseId):", req.params.courseId);
      console.log("Request body:", req.body);
      const currentUser = req.session["currentUser"];
      console.log("Current user:", currentUser);
      if (!currentUser) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      if (currentUser.role !== "FACULTY") {
        return res.status(403).json({ message: "Only faculty can perform this action" });
      }
      
      const { courseId } = req.params;
      const assignment = {
        ...req.body,
        course: courseId,
      };
      const newAssignment = await dao.createAssignment(assignment);
      console.log("=== ASSIGNMENT CREATED ===");
      console.log("Created assignment:", newAssignment);
      res.json(newAssignment);
    } catch (error) {
      res.status(500).json({ message: "Error creating assignment", error: error.message });
    }
  };

  // DELETE /api/assignments/:assignmentId - delete assignment (FACULTY only)
  const deleteAssignment = async (req, res) => {
    try {
      console.log("=== BACKEND: DELETE ASSIGNMENT ===");
      const { assignmentId } = req.params;
      console.log("Assignment ID:", assignmentId);
      const currentUser = req.session["currentUser"];
      console.log("Current user:", currentUser);
      if (!currentUser) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      if (currentUser.role !== "FACULTY") {
        return res.status(403).json({ message: "Only faculty can perform this action" });
      }
      
      const result = await dao.deleteAssignment(assignmentId);
      console.log("=== ASSIGNMENT DELETED ===");
      console.log("Delete result:", result);
      
      if (!result) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Error deleting assignment", error: error.message });
    }
  };

  // PUT /api/assignments/:assignmentId - update assignment (FACULTY only)
  const updateAssignment = async (req, res) => {
    try {
      console.log("=== BACKEND: UPDATE ASSIGNMENT ===");
      const { assignmentId } = req.params;
      console.log("Assignment ID:", assignmentId);
      console.log("Update data:", req.body);
      const currentUser = req.session["currentUser"];
      console.log("Current user:", currentUser);
      if (!currentUser) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      if (currentUser.role !== "FACULTY") {
        return res.status(403).json({ message: "Only faculty can perform this action" });
      }
      
      const assignmentUpdates = req.body;
      await dao.updateAssignment(assignmentId, assignmentUpdates);
      console.log("=== ASSIGNMENT UPDATED ===");
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Error updating assignment", error: error.message });
    }
  };

  // Register routes
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
}

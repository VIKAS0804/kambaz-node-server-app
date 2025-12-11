import { v4 as uuidv4 } from "uuid";
import AssignmentModel from "./model.js";

export default function AssignmentsDao(db) {
  const findAssignmentsForCourse = async (courseId) => {
    console.log("=== DAO: FIND ASSIGNMENTS ===");
    console.log("Course ID:", courseId);
    const assignments = await AssignmentModel.find({ course: courseId });
    console.log("=== DAO: FOUND ASSIGNMENTS ===");
    console.log("Count:", assignments.length);
    console.log("Assignments:", assignments);
    return assignments;
  };

  const createAssignment = async (assignment) => {
    console.log("=== DAO: CREATE ASSIGNMENT ===");
    console.log("Assignment data received:", assignment);
    const newAssignment = { ...assignment, _id: uuidv4() };
    console.log("Generated _id:", newAssignment._id);
    console.log("New assignment object:", newAssignment);
    const result = await AssignmentModel.create(newAssignment);
    console.log("=== DAO: ASSIGNMENT CREATED IN DB ===");
    console.log("Created assignment:", result);
    return result;
  };

  const deleteAssignment = async (assignmentId) => {
    console.log("=== DAO: DELETE ASSIGNMENT ===");
    console.log("Assignment ID to delete:", assignmentId);
    const result = await AssignmentModel.findByIdAndDelete(assignmentId);
    console.log("=== DAO: DELETE RESULT ===");
    console.log("Delete result:", result);
    return result;
  };

  const updateAssignment = async (assignmentId, assignmentUpdates) => {
    console.log("=== DAO: UPDATE ASSIGNMENT ===");
    console.log("Assignment ID:", assignmentId);
    console.log("Update data:", assignmentUpdates);
    const result = await AssignmentModel.updateOne(
      { _id: assignmentId },
      { $set: assignmentUpdates }
    );
    console.log("=== DAO: UPDATE RESULT ===");
    console.log("Update result:", result);
    return result;
  };

  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}

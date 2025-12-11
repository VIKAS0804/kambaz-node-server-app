import { v4 as uuidv4 } from "uuid";
import CourseModel from "./model.js";
import EnrollmentsDao from "../Enrollments/dao.js";
import EnrollmentModel from "../Enrollments/model.js";

export default function CoursesDao(db) {
  const enrollmentsDao = EnrollmentsDao(db);
  const findAllCourses = () => {
    return CourseModel.find({}, { name: 1, description: 1 });
  };

  const findCourseById = (courseId) => {
    return CourseModel.findById(courseId);
  };

  const findCoursesForEnrolledUser = async (userId) => {
    return await enrollmentsDao.findCoursesForUser(userId);
  };

  const createCourse = (course) => {
    const newCourse = { ...course, _id: uuidv4() };
    return CourseModel.create(newCourse);
  };

  const deleteCourse = async (courseId) => {
    // Delete all enrollments for this course first
    await EnrollmentModel.deleteMany({ course: courseId });
    
    // Delete the course from MongoDB
    const result = await CourseModel.findByIdAndDelete(courseId);
    
    return result;
  };

  const updateCourse = (courseId, courseUpdates) => {
    return CourseModel.updateOne({ _id: courseId }, { $set: courseUpdates });
  };

  return {
    findAllCourses,
    findCourseById,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}

import { v4 as uuidv4 } from "uuid";
import CourseModel from "./model.js";
import EnrollmentsDao from "../Enrollments/dao.js";

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

  const deleteCourse = (courseId) => {
    return CourseModel.deleteOne({ _id: courseId });
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

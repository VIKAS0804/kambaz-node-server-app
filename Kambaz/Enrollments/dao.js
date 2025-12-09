import EnrollmentModel from "./model.js";

export default function EnrollmentsDao(db) {
  const findCoursesForUser = async (userId) => {
    const enrollments = await EnrollmentModel.find({ user: userId }).populate("course");
    return enrollments.map(enrollment => enrollment.course);
  };

  const findUsersForCourse = async (courseId) => {
    const enrollments = await EnrollmentModel.find({ course: courseId }).populate("user");
    return enrollments.map(enrollment => enrollment.user);
  };

  const enrollUserInCourse = async (userId, courseId) => {
    const enrollment = await EnrollmentModel.create({
      _id: `${userId}-${courseId}`,
      user: userId,
      course: courseId,
      enrollmentDate: new Date(),
      status: "ENROLLED",
    });
    return enrollment;
  };

  const unenrollUserFromCourse = async (userId, courseId) => {
    const result = await EnrollmentModel.deleteOne({ user: userId, course: courseId });
    return result;
  };

  const unenrollAllUsersFromCourse = async (courseId) => {
    const result = await EnrollmentModel.deleteMany({ course: courseId });
    return result;
  };

  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}

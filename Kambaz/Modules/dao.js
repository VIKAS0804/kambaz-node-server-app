import { v4 as uuidv4 } from "uuid";
import CourseModel from "../Courses/model.js";

export default function ModulesDao(db) {
  const findModulesForCourse = async (courseId) => {
    const course = await CourseModel.findById(courseId);
    return course ? course.modules : [];
  };

  const createModule = async (courseId, module) => {
    const newModule = { ...module, _id: uuidv4() };
    await CourseModel.updateOne(
      { _id: courseId },
      { $push: { modules: newModule } }
    );
    return newModule;
  };

  const updateModule = async (courseId, moduleId, moduleUpdates) => {
    const course = await CourseModel.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    const module = course.modules.id(moduleId);
    if (!module) {
      throw new Error("Module not found");
    }
    Object.assign(module, moduleUpdates);
    await course.save();
    return module;
  };

  const deleteModule = async (courseId, moduleId) => {
    await CourseModel.updateOne(
      { _id: courseId },
      { $pull: { modules: { _id: moduleId } } }
    );
  };

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}

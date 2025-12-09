import ModulesDao from "./dao.js";

export default function ModuleRoutes(app, db) {
  const dao = ModulesDao(db);

  const findModulesForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = await dao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: "Error finding modules", error: error.message });
    }
  };

  const createModuleForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const newModule = await dao.createModule(courseId, req.body);
      res.json(newModule);
    } catch (error) {
      res.status(500).json({ message: "Error creating module", error: error.message });
    }
  };

  const updateModule = async (req, res) => {
    try {
      const { courseId, moduleId } = req.params;
      const moduleUpdates = req.body;
      const updatedModule = await dao.updateModule(courseId, moduleId, moduleUpdates);
      res.json(updatedModule);
    } catch (error) {
      res.status(500).json({ message: "Error updating module", error: error.message });
    }
  };

  const deleteModule = async (req, res) => {
    try {
      const { courseId, moduleId } = req.params;
      await dao.deleteModule(courseId, moduleId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Error deleting module", error: error.message });
    }
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.delete("/api/courses/:courseId/modules/:moduleId", deleteModule);
  app.put("/api/courses/:courseId/modules/:moduleId", updateModule);
}

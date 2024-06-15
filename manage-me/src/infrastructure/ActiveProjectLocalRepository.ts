import { ActiveProject } from "../domain/project/ActiveProject";
import ActiveProjectRepository from "../domain/project/ActiveProjectRepository";

class ActiveProjectLocalRepository implements ActiveProjectRepository {
  private STORAGE_KEY = "active_project";

  save(project: ActiveProject) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(project));
    return project;
  }

  get() {
    try {
      const projectsStorage = localStorage.getItem(this.STORAGE_KEY);
      const projects = JSON.parse(projectsStorage || "[]");
      return projects;
    } catch (error) {
      localStorage.setItem(this.STORAGE_KEY, "[]");
      throw new Error("Error parsing projects from local storage");
    }
  }
}

export default ActiveProjectLocalRepository;

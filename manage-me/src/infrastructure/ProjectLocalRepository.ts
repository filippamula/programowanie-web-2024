import { Project } from "../domain/project/Project";
import ProjectRepository from "../domain/project/ProjectRepository";

class ProjectLocalRepository implements ProjectRepository {
  private STORAGE_KEY = "projects";

  save(project: Project) {
    const projects = this.findAll();
    projects.push(project);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    return project;
  }

  findAll() {
    try {
      const projectsStorage = localStorage.getItem(this.STORAGE_KEY);
      const projects = JSON.parse(projectsStorage || "[]");
      return projects;
    } catch (error) {
      localStorage.setItem(this.STORAGE_KEY, "[]");
      throw new Error("Error parsing projects from local storage");
    }
  }

  delete(project: Project) {
    let projects = this.findAll();
    projects = projects.filter((p: Project) => p.id !== project.id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
  }

  edit(project: Project) {
    const projects = this.findAll();
    const projectIndex = projects.findIndex(
      (p: Project) => p.id === project.id
    );
    projects[projectIndex] = project;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
  }
}

export default ProjectLocalRepository;

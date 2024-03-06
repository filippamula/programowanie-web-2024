import { z } from "zod";
import { Project, projectSchema } from "../domain/project/Project";

class ProjectRepository {
  private STORAGE_KEY = "projects";
  private SCHEMA = z.array(projectSchema);

  save(project: Project) {
    const projects = this.findAll();
    projects.push(project);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));

    return project;
  }

  findAll() {
    try {
      const projectsStorage = localStorage.getItem(this.STORAGE_KEY);
      const projects = this.SCHEMA.parse(JSON.parse(projectsStorage || "[]"));
      return projects;
    } catch (error) {
      localStorage.setItem(this.STORAGE_KEY, "[]");
      return [];
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

export default ProjectRepository;

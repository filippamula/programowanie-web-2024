import { useState } from "react";
import { Project } from "../domain/project/Project";
import ProjectRepository from "../domain/project/ProjectRepository";
import ProjectsLocalRepository from "../infrastructure/ProjectLocalRepository";

const projectsRepository: ProjectRepository = new ProjectsLocalRepository();

export function useProjects() {
  const [projects, setProjects] = useState(fetchProjects());

  function fetchProjects(): Project[] {
    return projectsRepository.findAll();
  }

  function handleDeleteProject(project: Project) {
    projectsRepository.delete(project);
    setProjects((projects) => projects.filter((p) => p.id !== project.id));
  }

  function handleAddProject(project: Project) {
    projectsRepository.save(project);
    setProjects((projects) => [...projects, project]);
  }

  function handleEditProject(project: Project) {
    projectsRepository.edit(project);
    setProjects((projects) =>
      projects.map((p) => (p.id === project.id ? project : p))
    );
  }

  return { projects, handleDeleteProject, handleAddProject, handleEditProject };
}

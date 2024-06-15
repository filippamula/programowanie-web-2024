import { useState } from "react";
import ActiveProjectRepository from "../domain/project/ActiveProjectRepository";
import ActiveProjectLocalRepository from "../infrastructure/ActiveProjectLocalRepository";
import { ActiveProject } from "../domain/project/ActiveProject";

const activeProjectRepository: ActiveProjectRepository =
  new ActiveProjectLocalRepository();

export function useActiveProject() {
  const [activeProject, setProjects] = useState(getActiveProject());

  function getActiveProject(): ActiveProject {
    return activeProjectRepository.get();
  }

  function handleChangeActiveProject(project: ActiveProject) {
    activeProjectRepository.save(project);
    setProjects(project);
  }

  return { activeProject, getActiveProject, handleChangeActiveProject };
}

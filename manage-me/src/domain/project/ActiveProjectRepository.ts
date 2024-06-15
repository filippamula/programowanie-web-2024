import { ActiveProject } from "./ActiveProject";

export default interface ProjectRepository {
  save(project: ActiveProject): ActiveProject;
  get(): ActiveProject;
}

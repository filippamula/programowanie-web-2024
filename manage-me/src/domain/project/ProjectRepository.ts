import { Project } from "./Project";

export default interface ProjectRepository {
  save(project: Project): Project;
  findAll(): Project[];
  delete(project: Project): void;
  edit(project: Project): void;
}

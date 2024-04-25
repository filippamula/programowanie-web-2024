import "./style.css";
import { v4 as UUID } from "uuid";
import ProjectRepository from "./infrastructure/ProjectRepository";
import { Project } from "./domain/project/Project";

const projectRepository = new ProjectRepository();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div> 
      <h2>Add project</h2>
      <div class="flex flex-wrap">
        <div class="p-5"> 
          <div>Project name</div>
          <input type="text" id="project-name" />
        </div>
        <div class="p-5">
          <div>Project description</div>
          <input type="text" id="project-description" />
        </div>
        <div class="p-5">
          <button id="add-project">Add project</button>
        </div>
      </div>
    </div>

    <div>
      <h2>Projects</h2>
      <div id="projects"></div>
    </div>
  </div>
`;

document.querySelector<HTMLButtonElement>("#add-project")!.onclick = () => {
  const projectName =
    document.querySelector<HTMLInputElement>("#project-name")!.value;
  const projectDescription = document.querySelector<HTMLInputElement>(
    "#project-description"
  )!.value;

  const project: Project = {
    id: UUID(),
    name: projectName,
    description: projectDescription,
  };
  projectRepository.save(project);
  loadProjects();
};

document.addEventListener("DOMContentLoaded", loadProjects);

function loadProjects() {
  const projects = projectRepository.findAll();
  const projectsDiv = document.querySelector<HTMLDivElement>("#projects")!;
  projectsDiv.innerHTML = "";

  projects.forEach((project) => {
    const projectDiv = document.createElement("div");
    projectDiv.innerHTML = `
      <div class="p-5 flex">
        <div class="p-5">
          <div>Name</div> 
          <div>${project.name}</div>
        </div>
        <div class="p-5">
          <div>Description</div>  
          <div>${project.description}</div>
        </div>
        <div class="p-5">
          <button class="delete-project">Delete</button>
        </div>
        <div class="p-5">
          <button class="edit-project">Edit</button>
        </div>
      </div>
      <dialog class="absolute">
        <div>
          <h2>Edit project</h2>
          <div class="flex flex-wrap">
            <div class="p-5"> 
              <div>Project name</div>
              <input type="text" class="project-name" />
            </div>
            <div class="p-5">
              <div>Project description</div>
              <input type="text" class="project-description" />
            </div>
            <div class="p-5">
              <button class="edit-project">Save</button>
            </div>
          </div>
        </div>
      </dialog>
    `;

    projectDiv
      .querySelector<HTMLButtonElement>(".delete-project")!
      .addEventListener("click", () => {
        projectRepository.delete(project);
        loadProjects();
      });

    const dialog = projectDiv.querySelector<HTMLDialogElement>("dialog")!;
    projectDiv
      .querySelector<HTMLButtonElement>(".edit-project")!
      .addEventListener("click", () => handleOpenEditDialog(dialog, project));

    projectsDiv.append(projectDiv);
  });

  function handleOpenEditDialog(dialog: HTMLDialogElement, project: Project) {
    dialog.showModal();

    dialog.querySelector<HTMLInputElement>(".project-name")!.value =
      project.name;
    dialog.querySelector<HTMLInputElement>(".project-description")!.value =
      project.description;

    dialog.addEventListener("click", function (event) {
      var rect = dialog.getBoundingClientRect();
      var isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        dialog.close();
      }
    });

    dialog.querySelector<HTMLButtonElement>(".edit-project")!.onclick = () => {
      const projectName =
        dialog.querySelector<HTMLInputElement>(".project-name")!.value;
      const projectDescription = dialog.querySelector<HTMLInputElement>(
        ".project-description"
      )!.value;

      project.name = projectName;
      project.description = projectDescription;
      projectRepository.edit(project);
      loadProjects();
    };
  }
}

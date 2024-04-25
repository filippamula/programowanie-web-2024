import NavBar from "../components/NavBar";
import AddEditProjectDialog from "../components/projects/AddEditProjectDialog";
import DefaultButton from "../components/common/DefaultButton";
import { useProjects } from "../hooks/UseProjects";
import { useState } from "react";
import ProjectItem from "../components/projects/ProjectItem";

function Projects() {
  const { projects, handleDeleteProject, handleAddProject, handleEditProject } =
    useProjects();
  const [openAddDialog, setOpenAddDialog] = useState(false);

  return (
    <div>
      <NavBar />

      <header className="w-full bg-white shadow flex justify-between">
        <div className="w-fit max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Projects
          </h1>
        </div>
        <div className="w-fit max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <DefaultButton
            onClick={() => setOpenAddDialog(true)}
            content="Add project"
          />
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {projects.map((project) => {
            return (
              <ProjectItem
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            );
          })}
        </div>
      </main>

      <AddEditProjectDialog
        title="Add project"
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        onSave={handleAddProject}
      />
    </div>
  );
}

export default Projects;

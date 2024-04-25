import { useState } from "react";
import DefaultButton from "../common/DefaultButton";
import AddEditProjectDialog from "./AddEditProjectDialog";
import { Project } from "../../domain/project/Project";
import { on } from "events";

type Props = {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
};

export default function ProjectItem({ project, onEdit, onDelete }: Props) {
  const [openEditDialog, setOpenEditDialog] = useState(false);

  return (
    <div
      key={project.id}
      className="mb-4 bg-white border-solid border border-gray-200 shadow-lg overflow-hidden sm:rounded-lg"
    >
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">
            {project.name}
          </h3>
          <div>
            <DefaultButton
              content="Edit"
              className="mr-2 bg-white hover:bg-gray-200 text-black border border-gray-300"
              onClick={() => {
                setOpenEditDialog(true);
              }}
            />
            <DefaultButton
              content="Delete"
              onClick={() => {
                onDelete(project);
              }}
              className="mr-2 bg-red-600 hover:bg-red-500 text-white border border-gray-300"
            />
          </div>
        </div>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {project.description}
        </p>
      </div>

      <AddEditProjectDialog
        key={project.id}
        title="Edit project"
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        onSave={onEdit}
        project={project}
      />
    </div>
  );
}

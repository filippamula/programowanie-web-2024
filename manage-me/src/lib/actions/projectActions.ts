"use server";

import {
  addProject,
  deleteProject,
  editProject,
  getProjects,
  Project,
  updateProjectsAsInactive,
} from "../db";
import { v4 as uuid } from "uuid";
import { addProjectSchema } from "../formSchema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const findProjects = async () => {
  try {
    return getProjects();
  } catch {
    return {
      error: "Error during fetching projects",
    };
  }
};

export const saveProject = async (
  values: z.infer<typeof addProjectSchema>,
  id?: string | null
) => {
  if (!values.name) {
    return {
      error: "Name can't be empty",
    };
  }
  if (!values.description) {
    return {
      error: "Description can't be empty",
    };
  }

  const project: Project = {
    id: !id ? uuid() : id,
    name: values.name,
    description: values.description,
    active: values.active,
  };

  try {
    if (!id) {
      const projects = await findProjects();
      if (isErrorResponse(projects)) return { error: projects.error };
      if (projects.some((proj) => proj.name === project.name)) {
        return { error: "Project with this name already exists" };
      }

      await addProject(project);
    } else {
      await editProject(project);
    }
    revalidatePath("/");
  } catch {
    return {
      error: "Error during saving project",
    };
  }
};

export const removeProject = async (id: string) => {
  await deleteProject(id);
};

export const setActiveProject = async (project: Project) => {
  await setAllProjectsAsInactive();
  project.active = true;
  // console.log(project);
  await saveProject(project, project.id);
};

async function setAllProjectsAsInactive() {
  await updateProjectsAsInactive();
}

function isErrorResponse(response: any): response is { error: string } {
  return (response as { error: string }).error !== undefined;
}

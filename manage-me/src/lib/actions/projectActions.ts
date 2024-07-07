"use server";

import { addProject, getProjects, Project } from "../db";
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

export const saveProject = async (values: z.infer<typeof addProjectSchema>) => {
  if (!values.name) {
    return {
      error: "Username can't be empty",
    };
  }
  if (!values.description) {
    return {
      error: "Password can't be empty",
    };
  }

  const project: Project = {
    id: uuid(),
    name: values.name,
    description: values.description,
    active: false,
  };

  const projects = await findProjects();
  if (isErrorResponse(projects)) return { error: projects.error };
  if (projects.some((proj) => proj.name === project.name))
    return { error: "Project with this name already exists" };

  try {
    await addProject(project);
    revalidatePath("/");
  } catch {
    return {
      error: "Error during adding project",
    };
  }
};

function isErrorResponse(response: any): response is { error: string } {
  return (response as { error: string }).error !== undefined;
}

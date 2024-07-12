"use server";

import { z } from "zod";
import {
  addStory,
  editStory,
  getStories,
  getStoriesByProjectId,
  getStoryById,
  Project,
  Story,
} from "../db";
import { addStorySchema } from "../formSchema";
import { v4 as uuid } from "uuid";
import { getUserFromAuthToken } from "./userActions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const findStories = async () => {
  return await getStories();
};

export const findStoriesByProjectId = async (id: string) => {
  return await getStoriesByProjectId(id);
};

export const saveStory = async (
  values: z.infer<typeof addStorySchema>,
  project: Project,
  id?: string
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

  const loggedUser = await getUserFromAuthToken();
  if (!loggedUser || loggedUser === null) {
    redirect("/");
  }

  const story: Story = {
    id: !id ? uuid() : id,
    name: values.name,
    description: values.description,
    priority: values.priority,
    state: values.state,
    userId: loggedUser.id,
    ownerUsername: loggedUser.username,
    createDate: new Date().toISOString(),
    projectId: project.id,
  };

  try {
    if (!id) {
      await addStory(story);
    } else {
      await editStory(story);
    }
    revalidatePath("/stories");
  } catch {
    return {
      error: "Error during saving story",
    };
  }
};

export const findStoryById = async (id: string) => {
  return await getStoryById(id);
};

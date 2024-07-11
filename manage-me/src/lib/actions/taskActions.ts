"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  addTask,
  editTask,
  getTaskById,
  getTasksByStoryId,
  Story,
  Task,
} from "../db";
import { addTaskSchema } from "../formSchema";

export const findTasksByStoryId = async (storyId: string) => {
  return await getTasksByStoryId(storyId);
};

export const saveTask = async (
  values: z.infer<typeof addTaskSchema>,
  story: Story,
  id?: number | null
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

  const task: Task = {
    id: !id ? 0 : id,
    name: values.name,
    description: values.description,
    priority: values.priority,
    state: values.state,
    createTimestamp: new Date(),
    storyId: story.id,
    assignedUserId: null,
    expectedManHours: values.expectedManHours,
    endTimestamp: null,
    startTimestamp: null,
  };

  try {
    if (!id) {
      await addTask(task);
    } else {
      await editTask(task);
    }
    revalidatePath("/");
  } catch {
    return {
      error: "Error during saving task",
    };
  }
};

export const findTaskById = async (id: number) => {
  return await getTaskById(id);
};

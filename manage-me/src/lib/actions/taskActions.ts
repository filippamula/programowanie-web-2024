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
import { tasks } from "../db/schema";

export const findTasksByStoryId = async (storyId: string) => {
  return await getTasksByStoryId(storyId);
};

export const saveTask = async (
  values: z.infer<typeof addTaskSchema>,
  story: Story,
  id?: number
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

  try {
    if (id === undefined) {
      const task: Omit<Task, "id"> = {
        name: values.name,
        description: values.description,
        priority: values.priority,
        state: values.state,
        createTimestamp: new Date(),
        storyId: story.id,
        assignedUserId: values.assignedUserId,
        expectedManHours: values.expectedManHours,
        endTimestamp: values.state === "done" ? new Date() : null,
        startTimestamp: values.state === "doing" ? new Date() : null,
      };
      await addTask(task);
    } else {
      const oldTask = await getTaskById(id);
      if (!oldTask) {
        return { error: "Error during saving task" };
      }
      const task: Task = {
        id: id,
        name: values.name,
        description: values.description,
        priority: values.priority,
        state: values.state,
        createTimestamp: new Date(),
        storyId: story.id,
        assignedUserId: values.assignedUserId,
        expectedManHours: values.expectedManHours,
        endTimestamp: getEndDate(oldTask, values),
        startTimestamp: getStartDate(oldTask, values),
      };
      await editTask(task);
    }
    revalidatePath("/");
  } catch (e) {
    return {
      error: "Error during saving task",
    };
  }
};

export const findTaskById = async (id: number) => {
  return await getTaskById(id);
};

function getEndDate(
  oldTask: Task,
  values: z.infer<typeof addTaskSchema>
): Date | null {
  if (values.state === "done" && oldTask.endTimestamp === null) {
    return new Date();
  }

  if (values.state == "todo") return null;

  return oldTask.endTimestamp;
}

function getStartDate(
  oldTask: Task,
  values: z.infer<typeof addTaskSchema>
): Date | null {
  if (values.state === "doing" && oldTask.state === "todo") {
    return new Date();
  }

  if (values.state == "todo") return null;

  return oldTask.startTimestamp;
}

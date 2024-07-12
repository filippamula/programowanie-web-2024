import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(1, {
    message: "Enter username",
  }),
  password: z.string().min(1, {
    message: "Enter password",
  }),
});

export const addProjectSchema = z.object({
  name: z.string().min(1, {
    message: "Enter name",
  }),
  description: z.string().min(1, {
    message: "Enter description",
  }),
  active: z.boolean(),
});

export const addStorySchema = z.object({
  name: z.string().min(1, {
    message: "Enter name",
  }),
  description: z.string().min(1, {
    message: "Enter description",
  }),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  state: z.enum(["todo", "doing", "done"]).default("todo"),
});

export const addTaskSchema = z.object({
  name: z.string().min(1, {
    message: "Enter name",
  }),
  description: z.string().min(1, {
    message: "Enter description",
  }),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  state: z.enum(["todo", "doing", "done"]).default("todo"),
  expectedManHours: z.number().min(1).nullable(),
  assignedUserId: z.string().nullable(),
});

export const editTaskSchema = z.object({
  name: z.string().min(1, {
    message: "Enter name",
  }),
  description: z.string().min(1, {
    message: "Enter description",
  }),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  state: z.enum(["todo", "doing", "done"]).default("todo"),
  expectedManHours: z.number().min(1).nullable(),
  assignedUserId: z.string().nullable(),
});

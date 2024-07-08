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

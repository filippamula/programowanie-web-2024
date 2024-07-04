import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(1, {
    message: "Enter username",
  }),
  password: z.string().min(1, {
    message: "Enter password",
  }),
});

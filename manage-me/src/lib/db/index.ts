import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/lib/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";

const client = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(client, { schema });

export type Project = InferSelectModel<typeof schema.projects>;

export const findUserByUsername = async (username: string) => {
  return await db.query.users.findFirst({
    where: eq(schema.users.username, username),
  });
};

export const getProjects = async () => {
  return (await db.query.projects.findMany()) as Project[];
};

export const getProjectById = async (id: string) => {
  return await db.query.projects.findFirst({
    where: eq(schema.projects.id, id),
  });
};

export const addProject = async (project: Project) => {
  await db.insert(schema.projects).values(project);
};

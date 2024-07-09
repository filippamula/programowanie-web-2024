import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/lib/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";
import { TypeOf, z } from "zod";

const client = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(client, { schema });

export type Project = InferSelectModel<typeof schema.projects>;
export type Story = InferSelectModel<typeof schema.stories>;

export const findUserByUsername = async (username: string) => {
  return await db.query.users.findFirst({
    where: eq(schema.users.username, username),
  });
};

export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({
    where: eq(schema.users.id, id),
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

export const deleteProject = async (id: string) => {
  await db.delete(schema.projects).where(eq(schema.projects.id, id));
};

export const editProject = async (project: Project) => {
  await db
    .update(schema.projects)
    .set({
      name: project.name,
      description: project.description,
      active: project.active,
    })
    .where(eq(schema.projects.id, project.id));
};

export const updateProjectsAsInactive = async () => {
  await db.update(schema.projects).set({ active: false });
};

export const getActiveProject = async () => {
  return await db.query.projects.findFirst({
    where: eq(schema.projects.active, true),
  });
};

export const getStories = async () => {
  return await db.query.stories.findMany();
};

export const addStory = async (story: Story) => {
  await db.insert(schema.stories).values(story);
};

export const editStory = async (story: Story) => {
  await db
    .update(schema.stories)
    .set({
      name: story.name,
      description: story.description,
      priority: story.priority,
      state: story.state,
    })
    .where(eq(schema.projects.id, story.id));
};

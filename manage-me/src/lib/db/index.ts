import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/lib/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";

const client = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(client, { schema });

export type Project = InferSelectModel<typeof schema.projects>;
export type Story = InferSelectModel<typeof schema.stories>;
export type User = InferSelectModel<typeof schema.users>;
export type Task = InferSelectModel<typeof schema.tasks>;

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

export const getStoryById = async (id: string) => {
  return await db.query.stories.findFirst({
    where: eq(schema.stories.id, id),
  });
};

export const getTasksByStoryId = async (storyId: string) => {
  return await db.query.tasks.findMany({
    where: eq(schema.tasks.storyId, storyId),
  });
};

export const addTask = async (task: Omit<Task, "id">) => {
  await db.insert(schema.tasks).values(task);
};

export const editTask = async (task: Task) => {
  await db
    .update(schema.tasks)
    .set({
      name: task.name,
      description: task.description,
      priority: task.priority,
      state: task.state,
      assignedUserId: task.assignedUserId,
      expectedManHours: task.expectedManHours,
      endTimestamp: task.endTimestamp,
      startTimestamp: task.startTimestamp,
    })
    .where(eq(schema.tasks.id, task.id));
};

export const getTaskById = async (id: number) => {
  return await db.query.tasks.findFirst({
    where: eq(schema.tasks.id, id),
  });
};

export const getUsers = async () => {
  return await db.query.users.findMany();
};

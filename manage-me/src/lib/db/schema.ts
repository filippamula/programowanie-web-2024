import { varchar, pgTable, boolean, pgEnum, date } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  surname: varchar("surname", { length: 256 }).notNull(),
  username: varchar("username", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  description: varchar("description", { length: 1024 }).notNull(),
  active: boolean("active").notNull(),
});

export const stateEnum = pgEnum("state", ["todo", "doing", "done"]);
export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

export const stories = pgTable("stories", {
  id: varchar("id").primaryKey(),
  projectId: varchar("projectId").notNull(),
  userId: varchar("userId").notNull(),
  ownerUsername: varchar("ownerUsername", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  description: varchar("description", { length: 1024 }).notNull(),
  priority: priorityEnum("priority").notNull(),
  state: stateEnum("state").notNull(),
  createDate: date("date").notNull(),
});

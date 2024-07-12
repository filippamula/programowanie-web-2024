import {
  varchar,
  pgTable,
  boolean,
  pgEnum,
  date,
  serial,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "devops", "developer"]);

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  surname: varchar("surname", { length: 256 }).notNull(),
  username: varchar("username", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  role: roleEnum("role").notNull(),
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

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: varchar("description", { length: 1024 }).notNull(),
  priority: priorityEnum("priority").notNull(),
  storyId: varchar("storyId").notNull(),
  expectedManHours: integer("expectedManHours"),
  state: stateEnum("state").notNull(),
  createTimestamp: timestamp("creationTimestamp").notNull(),
  startTimestamp: timestamp("startTimestamp"),
  endTimestamp: timestamp("endTimestamp"),
  assignedUserId: varchar("assignedUserId"),
});

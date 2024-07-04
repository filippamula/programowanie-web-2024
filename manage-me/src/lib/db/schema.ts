import { serial, varchar, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  surname: varchar("surname", { length: 256 }).notNull(),
  username: varchar("username", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
});

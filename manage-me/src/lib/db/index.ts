import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const client = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(client, { schema });

export const findUserByUsername = async (username: string) => {
  return await db.query.users.findFirst({
    where: eq(schema.users.username, username),
  });
};

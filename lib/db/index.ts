import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL in environment");
}

// Fix SSL verification for local development
if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const sql = neon(process.env.DATABASE_URL!, {
  fetchOptions: {
    cache: "no-store",
  },
});

export const db = drizzle(sql, { schema });

export { sql };
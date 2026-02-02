import {drizzle} from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";

import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config({path: ".env.local"}); //optional only if needed here 

if(!process.env.DATABASE_URL){
    throw new Error("Missing DATABASE_URL in environment");
}

const sql = neon(process.env.DATABASE_URL!, {
  fetchOptions: {
    cache: "no-store",
  },
});
// const db = drizzle({ client: sql });

export const db= drizzle(sql, {schema});

export {sql}
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import dotenv from "dotenv";

dotenv.config()

// Configurar conexión a Turso
const client = createClient({
  url: process.env.TURSO_DB_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN as string,
})

export const db = drizzle(client);
import { pool } from "@/infrastructure/db.ts";

export default async function insertUser(userId: string, username: string, password: string) {
  try {
    await pool.query("INSERT INTO users (id, username, password_hash) VALUES ($1, $2, $3)", [
      userId,
      username,
      password,
    ]);

    return "DONE";
  } catch (e: any) {
    if (e.code === "23505") return "DUPLICATE";

    return "UNEXPECTED_ERROR";
  }
}

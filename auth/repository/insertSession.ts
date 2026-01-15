import { pool } from "../../db.ts";

export default async function insertSession(sessionId: string, userId: string) {
  try {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await pool.query("INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)", [
      sessionId,
      userId,
      expiresAt,
    ]);

    return "DONE";
  } catch (e: any) {
    return "UNEXPECTED_ERROR";
  }
}

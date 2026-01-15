import { pool } from "../../db.ts";

export default async function insertUserAndSession(
  userId: string,
  username: string,
  password: string,
  sessionId: string
) {
  const client = await pool.connect();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  try {
    await client.query("BEGIN");
    await client.query("INSERT INTO users (id, username, password_hash) VALUES ($1, $2, $3)", [
      userId,
      username,
      password,
    ]);

    await client.query("INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)", [
      sessionId,
      userId,
      expiresAt,
    ]);

    await client.query("COMMIT");

    return "DONE"

  } catch (e: any) {
    await client.query("ROLLBACK");

    if (e.code === "23505") return "DUPLICATE";

    return "UNEXPECTED_ERROR";
  } finally {
    client.release();
  }
}

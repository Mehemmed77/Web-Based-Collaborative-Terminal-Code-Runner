import { pool } from "@/infrastructure/db.ts";

export default async function refreshSession(sessionId: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  try {
    await pool.query("UPDATE sessions SET expires_at = $1 WHERE sessionId = $2", [expiresAt, sessionId]);
  }

  catch(e) {
      console.log(e);
  }
}

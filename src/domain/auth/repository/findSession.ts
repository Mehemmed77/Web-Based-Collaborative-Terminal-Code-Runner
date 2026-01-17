import { pool } from "@/infrastructure/db.ts";

export default async function findSession(sessionId: string) {
    try {
        const res = await pool.query("SELECT * FROM sessions WHERE id = $1", [sessionId]);
        return res
    }

    catch(e) {
        return null;
    }
}
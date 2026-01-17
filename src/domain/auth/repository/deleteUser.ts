import { pool } from "@/infrastructure/db.ts";

export default async function deleteUser(userId: string) {
    try {
        await pool.query("DELETE FROM users WHERE user_id = $1", [userId]);
        return "DONE";
    }

    catch(e) {
        return "UNEXPECTED_ERROR";
    }
}
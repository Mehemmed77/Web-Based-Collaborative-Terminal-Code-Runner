import { pool } from "../../db.ts";

export default async function findUser(username: string) {
    try {
        const res = await pool.query("SELECT username from users WHERE username = $1", [username]);

        return res.rowCount === 0 ? "USER_NOT_FOUND" : "USER_FOUND" 
    }

    catch(e: any) {
        return "UNEXPECTED_ERROR"
    }
}
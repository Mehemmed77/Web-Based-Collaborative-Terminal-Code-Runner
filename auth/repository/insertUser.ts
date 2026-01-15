import { pool } from "../../db.ts";

export default async function insertUser(username: string, password: string) {
    try {
        await pool.query("INSERT INTO users (username, password_hash) VALUES ($1, $2)", [username, password]);
        return "DONE";
    }

    catch(e) {
        return "UNEXPECTED_ERROR"
    }
}
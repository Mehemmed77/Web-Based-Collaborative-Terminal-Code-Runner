import { pool } from "../../db.ts";

export default async function roomExistsInDb(roomId: string) {
    try{
        const res = await pool.query("SELECT room_id FROM rooms WHERE room_id = $1 AND deleted_at IS NULL", [roomId]);
        return res.rowCount !== 0;
    }
    catch(e) {
        console.log("Error occurred while finding room: ", e)
        return false;
    }
}
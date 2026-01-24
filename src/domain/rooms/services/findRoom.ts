import { pool } from "@/infrastructure/db.ts";

export default async function findRoom(roomId: string) {
    try {
        const res = await pool.query("SELECT owner_user_id FROM rooms WHERE room_id = $1", [roomId]);

        if(res.rowCount === 0) return null;

        return res.rows[0].owner_user_id; 
    }

    catch(e: any) {
        return null;
    }
}
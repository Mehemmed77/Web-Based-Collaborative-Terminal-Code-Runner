import { pool } from "@/infrastructure/db.ts";

export default async function findRoom(roomId: string) {
    try {
        const res = await pool.query("SELECT room_id FROM rooms WHERE room_id = $1", [roomId]);

        if(res.rowCount === 0) return "NOT_FOUND";
        return "FOUND" 
    }

    catch(e: any) {
        return "ERROR";
    }
}
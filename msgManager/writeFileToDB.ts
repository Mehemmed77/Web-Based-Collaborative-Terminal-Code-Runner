import { pool } from "../db.ts";

export default async function writeFileToDB(
  room_id: string,
  relative_path: string,
  file_extension: string
) {
  try {
    await pool.query(
      "INSERT INTO files (room_id, relative_path, file_extension) VALUES ($1, $2, $3)",
      [room_id, relative_path, file_extension]
    );

    return true;
  } catch (e) {
    console.log("Error occurred: ", e);
    return false;
  }
}

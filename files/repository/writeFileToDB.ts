import { pool } from "../../db.ts";

export default async function writeFileToDB(
  room_id: string,
  relative_path: string,
  file_extension: string
) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const queryText = "INSERT INTO files (room_id, relative_path, file_extension) VALUES ($1, $2, $3)";

    await client.query(
      queryText,
      [room_id, relative_path, file_extension]
    );

    await client.query("COMMIT");

    return "INSERTED";

  } catch (e: any) {
    await client.query("ROLLBACK");

    if (e.code === "23505") return "DUPLICATE";

    return "FAILED_TO_INSERT";
  }

  finally {
    client.release();
  }
}

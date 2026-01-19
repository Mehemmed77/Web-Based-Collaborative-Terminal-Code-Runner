import { pool } from "@/infrastructure/db.ts";

export default async function findUser(username: string) {
  try {
    const result = await pool.query(
      "SELECT * from users WHERE username = $1",
      [username]
    );

    return result;

  } catch (e: any) {
    console.log(e);
  }
}

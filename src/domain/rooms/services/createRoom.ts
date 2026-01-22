import * as fsPromises from "fs/promises";
import * as path from "path";
import { nanoid } from "nanoid";
import { isCreateRoomPayload } from "../utils.ts";
import { pool } from "@/infrastructure/db.ts";
import { ClientSocket } from "@/shared/state/socket.ts";
import { activeRooms } from "@/shared/state/activeRoom.ts";

const projectRoot = process.cwd();

export default async function createRoom(payload: any) {
  if (!isCreateRoomPayload(payload)) {
    return;
  }

  try {
    const roomId = nanoid(10);

    const clients = new Map<string, ClientSocket>();

    await pool.query("INSERT INTO rooms (room_id, owner_user_id) VALUES($1, $2)", [roomId, payload.userId]);

    activeRooms.set(roomId, { roomId: roomId, clients: clients });

    console.log(roomId);

    const folderPath = path.join(projectRoot, "workspaces", roomId);
    await fsPromises.mkdir(folderPath, { recursive: true });

  } catch (e: any) {
    console.log("Some error occurred: " + e);
  }
}

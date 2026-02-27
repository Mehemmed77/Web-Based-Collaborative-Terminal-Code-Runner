import * as fsPromises from "fs/promises";
import * as path from "path";
import { nanoid } from "nanoid";
import { isCreateRoomPayload } from "../utils.ts";
import { pool } from "@/infrastructure/db.ts";
import { ClientSocket } from "@/shared/state/socket.ts";
import { activeRooms } from "@/shared/state/activeRoom.ts";

const projectRoot = process.cwd();

export default async function createRoom(payload: any) {
  console.log(payload);
  if (!isCreateRoomPayload(payload)) {
    return;
  }

  try {
    const roomId = nanoid(10);

    const clients = new Map<string, ClientSocket>();

    await pool.query("INSERT INTO rooms (room_id, owner_user_id, room_name) VALUES($1, $2, $3)", [
      roomId,
      payload.userId,
      payload.roomName
    ]);

    activeRooms.set(roomId, { roomId: roomId, clients: clients, ownerUserId: payload.userId });

    console.log(roomId);

    const folderPath = path.join(projectRoot, "workspaces", roomId);
    await fsPromises.mkdir(folderPath, { recursive: true });
  } catch (e: any) {
    console.log("Some error occurred: " + e);
  }
}

import * as fsPromises from "fs/promises";
import * as path from "path";
import { nanoid } from "nanoid";
import { isCreateRoomPayload } from "../utils.ts";
import { pool } from "@/infrastructure/db.ts";
import { activeSockets } from "@/shared/state/activeSockets.ts";
import { ClientSocket } from "@/shared/state/socket.ts";
import { Message } from "@/shared/protocol.ts";
import { activeRooms } from "@/shared/state/activeRoom.ts";

const projectRoot = process.cwd();

export default async function createRoom(msg: Message, ws: ClientSocket, userId: string) {
  if (msg.msgType !== "CREATE_ROOM" || !isCreateRoomPayload(msg.payload)) {
    ws.send("Invalid createRoom payload");
    return;
  }

  try {
    const roomId = nanoid(10);

    const clients = new Map<string, ClientSocket>();

    await pool.query("INSERT INTO rooms (room_id, owner_user_id) VALUES($1, $2)", [roomId, userId]);

    clients.set(ws.id, ws);

    activeSockets.set(ws.id, {
      hasJoinedRoom: true,
      roomId: roomId,
      userId: userId,
      authInProgress: false,
    });
    activeRooms.set(roomId, { roomId: roomId, clients: clients });

    console.log(roomId);

    const folderPath = path.join(projectRoot, "workspaces", roomId);
    await fsPromises.mkdir(folderPath, { recursive: true });
  } catch (e: any) {
    console.log("Some error occurred: " + e);
  }
}

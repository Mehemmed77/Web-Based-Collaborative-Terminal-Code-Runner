import * as fsPromises from "fs/promises";
import * as path from "path";
import { ClientSocket } from "../../ws/socket.ts";
import { nanoid } from "nanoid";
import { pool } from "../../db.ts";
import { activeSockets } from "../../state/activeSockets.ts";
import { activeRooms } from "../../state/activeRoom.ts";
import { Message } from "../../shared/protocol.ts";
import { isCreateRoomPayload } from "../utils.ts";

const projectRoot = process.cwd();

export default async function createRoom(msg: Message, ws: ClientSocket) {
  if (msg.msgType !== "CREATE_ROOM" || !isCreateRoomPayload(msg.payload)) {
    ws.send("Invalid createRoom payload")
    return;
  }

  try {
    const roomId = nanoid(10);

    const clients = new Map<string, ClientSocket>();

    await pool.query("INSERT INTO rooms (room_id, owner_user_id) VALUES($1, $2)", [
      roomId,
      msg.payload.ownerUserId,
    ]);

    clients.set(ws.id, ws);

    activeSockets.set(ws.id, { hasJoinedRoom: true, roomId: roomId });
    activeRooms.set(roomId, { roomId: roomId, clients: clients });

    console.log(roomId);

    const folderPath = path.join(projectRoot, "workspaces", roomId);
    await fsPromises.mkdir(folderPath, { recursive: true });
  } catch (e: any) {
    console.log("Some error occurred: " + e);
  }
}

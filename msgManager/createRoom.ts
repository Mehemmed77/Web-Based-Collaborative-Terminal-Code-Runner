import { nanoid } from "nanoid";
import { ClientSocket } from "../types/clientSocket.ts";
import { activeRooms, activeSockets } from "../server.ts";
import { pool } from "../db.ts";
import { Payload } from "../types/msgType.ts";
import * as fsPromises from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function createRoom(ws: ClientSocket, payload: Payload) {
  if (payload.sessionId === "") return;

  try {
    const roomId = nanoid(10);

    const clients = new Map<string, ClientSocket>();

    await pool.query("INSERT INTO rooms (room_id, owner_session_id) VALUES($1, $2)", [
      roomId,
      payload.sessionId,
    ]);

    clients.set(ws.id, ws);

    activeSockets.set(ws.id, { hasJoinedRoom: true, roomId: roomId });
    activeRooms.set(roomId, { roomId: roomId, clients: clients });

    console.log(roomId);

    const folderPath = path.join(__dirname, "workspaces", roomId);
    await fsPromises.mkdir(folderPath, { recursive: true });

  } catch (e: any) {
    console.log("Some error occurred: " + e);
  }
}

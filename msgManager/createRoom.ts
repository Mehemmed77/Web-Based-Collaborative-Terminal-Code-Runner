import { nanoid } from "nanoid";
import { ClientSocket } from "../types/clientSocket.ts";
import { activeRooms, activeSockets } from "../server.ts";

export default function createRoom(ws: ClientSocket) {
  const roomId = nanoid(10);

  const clients = new Map<string, ClientSocket>();
  clients.set(ws.id, ws);

  activeSockets.set(ws.id, { hasJoinedRoom: true, roomId: roomId });
  activeRooms.set(roomId, { roomId: roomId, clients: clients });

  console.log(roomId)
}

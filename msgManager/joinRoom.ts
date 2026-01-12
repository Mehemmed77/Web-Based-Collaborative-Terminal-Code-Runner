import { activeSockets, activeRooms } from "../server.ts";
import { ClientSocket } from "../types/clientSocket.ts";
import { Message } from "../types/msgType.ts";
import broadcast from "./broadcast.ts";
import ensureNotInAnotherRoom from "./ensureNotInAnotherRoom.ts";
import roomExistsInDb from "./findRoom.ts";

export default async function joinRoom(msg: Message, ws: ClientSocket) {
  if (!msg.payload.content) {
    ws.send("Room ID cannot be empty");
    return;
  }

  // Find the room first before everythin.
  // Because if the room doesn't exist, there is no point in advancing further.
  const roomExists = await roomExistsInDb(msg.payload.content);

  if (!roomExists) {
      ws.send("Couldn't find specified room");
      return;
  }

  const roomId = msg.payload.content;

  if (!ensureNotInAnotherRoom(ws.id, roomId)) {
    ws.send("You have already joined this room");
    return;
  }

  let room = activeRooms.get(roomId) ?? {roomId: roomId, clients: new Map<string, ClientSocket>()};

  room.clients.set(ws.id, ws);
  
  activeSockets.set(ws.id, { hasJoinedRoom: true, roomId: roomId });
  activeRooms.set(roomId, room);

  broadcast(roomId, "New user has joined");
}

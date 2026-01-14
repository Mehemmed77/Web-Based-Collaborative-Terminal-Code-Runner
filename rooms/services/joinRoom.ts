import { Message } from "../../shared/protocol.ts";
import { activeRooms } from "../../state/activeRoom.ts";
import { activeSockets } from "../../state/activeSockets.ts";
import broadcast from "../../state/broadcast.ts";
import { ClientSocket } from "../../ws/socket.ts";
import roomExistsInDb from "../repository/findRoom.ts";
import { isJoinRoomPayload } from "../utils.ts";
import ensureNotInAnotherRoom from "./ensureNotInAnotherRoom.ts";

export default async function joinRoom(msg: Message, ws: ClientSocket) {
  if (msg.msgType !== "JOIN_ROOM" || !isJoinRoomPayload(msg.payload)) {
    ws.send("Invalid Join Room Payload");
    return;
  }

  // Find the room first before everythin.
  // Because if the room doesn't exist, there is no point in advancing further.
  const roomId = msg.payload.roomId;
  const roomExists = await roomExistsInDb(roomId);

  if (!roomExists) {
    ws.send("Couldn't find specified room");
    return;
  }

  if (!ensureNotInAnotherRoom(ws.id, roomId)) {
    ws.send("You have already joined this room");
    return;
  }

  let room = activeRooms.get(roomId) ?? {
    roomId: roomId,
    clients: new Map<string, ClientSocket>(),
  };

  room.clients.set(ws.id, ws);

  activeSockets.set(ws.id, { hasJoinedRoom: true, roomId: roomId });
  activeRooms.set(roomId, room);

  broadcast(roomId, "New user has joined");
}

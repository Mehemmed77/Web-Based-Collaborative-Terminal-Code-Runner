import { ClientSocket } from "@/shared/state/socket.ts";
import roomExistsInDb from "../repository/findRoom.ts";
import { isJoinRoomPayload } from "../utils.ts";
import ensureNotInAnotherRoom from "./ensureNotInAnotherRoom.ts";
import { Message } from "@/shared/protocol.ts";
import { activeRooms } from "@/shared/state/activeRoom.ts";
import { activeSockets } from "@/shared/state/activeSockets.ts";
import broadcast from "@/shared/state/broadcast.ts";

export default async function joinRoom(msg: Message, ws: ClientSocket, userId: string) {
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

  if (!ensureNotInAnotherRoom(msg, ws)) {
    ws.send("You have already joined this room");
    return;
  }

  let room = activeRooms.get(roomId) ?? {
    roomId: roomId,
    clients: new Map<string, ClientSocket>(),
  };

  room.clients.set(ws.id, ws);

  activeSockets.set(ws.id, {
    hasJoinedRoom: true,
    roomId: roomId,
    userId: userId,
    authInProgress: false,
  });
  activeRooms.set(roomId, room);

  broadcast(roomId, "New user has joined");
}

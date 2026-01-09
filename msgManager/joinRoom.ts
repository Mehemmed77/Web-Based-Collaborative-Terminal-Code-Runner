import { activeSockets, activeRooms } from "../server.ts";
import { ClientSocket } from "../types/clientSocket.ts";
import { Message } from "../types/msgType.ts";
import broadcast from "./broadcast.ts";
import leaveRoom from "./leaveRoom.ts";

export default function joinRoom(msg: Message, ws: ClientSocket) {
  if (!msg.payload) {
    ws.send("Room ID cannot be empty");
    return;
  }

  const socket = activeSockets.get(ws.id);

  if (socket?.hasJoinedRoom && socket.roomId) {
    if (socket.roomId === msg.payload) {
        console.log("salam");
        ws.send("You have already joined this room");
        return;
    }

    else leaveRoom(socket.roomId, ws.id);
  }

  const roomId = msg.payload;

  const room = activeRooms.get(roomId);
  if (room === undefined) {
    ws.send("Couldn't find specified room");
    return;
  }

  activeSockets.set(ws.id, { hasJoinedRoom: true, roomId: roomId });

  room.clients.set(ws.id, ws);

  activeRooms.set(roomId, room);

  broadcast(roomId, "New user has joined");
}

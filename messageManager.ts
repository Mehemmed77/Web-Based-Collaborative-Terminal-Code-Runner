import { activeSockets, rooms } from "./server.ts";
import { nanoid } from "nanoid";
import { Message } from "./types/msgType.ts";
import { ClientSocket } from "./types/clientSocket.ts";
import deleteRoomIfEmpty from "./utils/deleteRoomIfEmpty.ts";

export default function messageManager(msg: Message, ws: ClientSocket) {
  switch (msg.msgType) {
    case "PLAIN_TEXT": {
      break;
    }

    case "JOIN_ROOM": {
      if (!msg.payload) {
        ws.send("Room ID cannot be empty");
        return;
      }

      const socket = activeSockets.get(ws.id);

      if (socket?.hasJoinedRoom && socket.roomId) {
        if (socket.roomId === msg.payload) ws.send("You have already joined this room");
        else {
          rooms.get(socket.roomId)?.clients.delete(ws.id);

          if (!deleteRoomIfEmpty(socket.roomId)) {
            broadcastToAll(socket.roomId,"User has left");
          }
        }
      }

      const roomId = msg.payload;

      const room = rooms.get(roomId);
      if (room === undefined) {
        ws.send("Couldn't find specified room");
        return;
      }

      activeSockets.set(ws.id, { hasJoinedRoom: true, roomId: roomId });

      room.clients.set(ws.id, ws);

      rooms.set(roomId, room);

      broadcastToAll(roomId, "New user has joined");

      break;
    }

    case "CREATE_ROOM": {
      const roomId = nanoid(10);

      const clients = new Map<string, ClientSocket>();
      clients.set(ws.id, ws);

      rooms.set(roomId, { roomId: roomId, clients: clients });

      console.log(roomId);

      break;
    }
  }
}

function broadcastToAll(roomId: string, message: string) {
  const room = rooms.get(roomId);
  if (room === undefined) return;

  room.clients.forEach((client) => {
    client.send(message);
  });
}

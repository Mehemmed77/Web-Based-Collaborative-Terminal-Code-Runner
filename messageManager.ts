import { rooms } from "./server.ts";
import { nanoid } from "nanoid";
import { Message } from "./types/msgType.ts";
import { ClientSocket } from "./types/clientSocket.ts";

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

        const roomId = msg.payload;

        const room = rooms.get(roomId);
        if (room === undefined) {
            ws.send("Couldn't find specified room");
            return;
        }

        room.clients.push(ws);

        rooms.set(roomId, room);

        broadcastToAll(roomId, "New user has joined");

        break;
    }

    case "CREATE_ROOM": {
        console.log('salam');
        const roomId = nanoid(10);
  
        rooms.set(roomId, { roomId: roomId, clients: [ws] });
  
        console.log(roomId);
  
        break;
    }
  }
}


function broadcastToAll(roomId: string, message: string) {
    const room = rooms.get(roomId);
    if (room === undefined) return;

    room.clients.forEach(client => {
        client.send(message);
    });
}

import { Message } from "../types/msgType.ts";
import { ClientSocket } from "../types/clientSocket.ts";
import joinRoom from "./joinRoom.ts";
import createRoom from "./createRoom.ts";
import leaveRoom from "./leaveRoom.ts";

export default function messageManager(msg: Message, ws: ClientSocket) {
  switch (msg.msgType) {
    case "PLAIN_TEXT": {
      break;
    }

    case "LEAVE_ROOM": {
      leaveRoom(msg.payload.content ?? "", ws.id);
      break;
    }

    case "JOIN_ROOM": {
      joinRoom(msg, ws);
      break;
    }

    case "CREATE_ROOM": {
      createRoom(ws, msg.payload);
      break;
    }
  }
}
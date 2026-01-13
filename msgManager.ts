import createFile from "./files/services/createFile.ts";
import createRoom from "./rooms/services/createRoom.ts";
import joinRoom from "./rooms/services/joinRoom.ts";
import leaveRoom from "./rooms/services/leaveRoom.ts";
import { Message } from "./shared/protocol.ts";
import { ClientSocket } from "./ws/socket.ts";

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

    case "CREATE_FILE": {
      createFile(msg, ws);
      break;
    }
  }
}

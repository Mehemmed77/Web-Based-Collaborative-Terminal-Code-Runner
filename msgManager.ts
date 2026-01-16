import login from "./auth/services/login.ts";
import register from "./auth/services/register.ts";
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

    case "LOGIN": {
      login(msg, ws);
      break;
    }

    case "REGISTER": {
      register(msg, ws);
      break;
    }

    case "LEAVE_ROOM": {
      leaveRoom(msg, ws);
      break;
    }

    case "JOIN_ROOM": {
      joinRoom(msg, ws);
      break;
    }

    case "CREATE_ROOM": {
      createRoom(msg, ws);
      break;
    }

    case "CREATE_FILE": {
      createFile(msg, ws);
      break;
    }
  }
}

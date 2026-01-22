import authenticate from "../domain/auth/services/authenticate.ts";
import login from "../domain/auth/services/login.ts";
import register from "../domain/auth/services/register.ts";
import createFile from "../domain/files/services/createFile.ts";
import createRoom from "../domain/rooms/services/createRoom.ts";
import joinRoom from "../domain/rooms/services/joinRoom.ts";
import leaveRoom from "../domain/rooms/services/leaveRoom.ts";
import { Message } from "../shared/protocol.ts";
import { ClientSocket } from "../shared/state/socket.ts";

export default async function messageManager(msg: Message, ws: ClientSocket) {
  switch (msg.msgType) {
    case "PLAIN_TEXT": {
      break;
    }

    case "LEAVE_ROOM": {
      const userId = await authenticate(ws, msg.payload.sessionId);

      if (userId === null) return;

      leaveRoom(msg, ws);
      break;
    }

    case "JOIN_ROOM": {
      const userId = await authenticate(ws, msg.payload.sessionId);

      if (userId === null) return;

      joinRoom(msg, ws, userId);
      break;
    }

    // case "CREATE_ROOM": {
    //   const userId = await authenticate(ws, msg.payload.sessionId);

    //   if (userId === null) return;

    //   createRoom(msg, ws, userId);
    //   break;
    // }

    // case "CREATE_FILE": {
    //   const userId = await authenticate(ws, msg.payload.sessionId);

    //   if (userId === null) return;

    //   createFile(msg, ws);
    //   break;
    // }
  }
}

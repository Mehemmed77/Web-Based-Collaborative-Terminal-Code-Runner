import { Message } from "../../shared/protocol.ts";
import { activeRooms } from "../../state/activeRoom.ts";
import broadcast from "../../state/broadcast.ts";
import { ClientSocket } from "../../ws/socket.ts";
import { isLeaveRoomPayload } from "../utils.ts";
import deleteRoomIfEmpty from "./deleteRoomIfEmpty.ts";

export default function leaveRoom(msg: Message, ws: ClientSocket) {
  if (msg.msgType !== "LEAVE_ROOM" || !isLeaveRoomPayload(msg.payload)) {
    ws.send("Invalid leaveRoom payload");
    return;    
  }

  const roomId = msg.payload.roomId;
  const room = activeRooms.get(roomId);
  if (room == null) return;

  room.clients.delete(ws.id);

  if (!deleteRoomIfEmpty(roomId)) {
    broadcast(roomId, "User has left room");
  }
}

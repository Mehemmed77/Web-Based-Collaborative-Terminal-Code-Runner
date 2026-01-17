import { Message } from "@/shared/protocol.ts";
import { isLeaveRoomPayload } from "../utils.ts";
import deleteRoomIfEmpty from "./deleteRoomIfEmpty.ts";
import { ClientSocket } from "@/shared/state/socket.ts";
import { activeRooms } from "@/shared/state/activeRoom.ts";
import broadcast from "@/shared/state/broadcast.ts";

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

import { activeRooms } from "../../state/activeRoom.ts";
import broadcast from "../../state/broadcast.ts";
import deleteRoomIfEmpty from "./deleteRoomIfEmpty.ts";

export default function leaveRoom(roomId: string, clientId: string) {
  if (roomId === "") return;

  const room = activeRooms.get(roomId);
  if (room == null) return;

  room.clients.delete(clientId);

  if (!deleteRoomIfEmpty(roomId)) {
    broadcast(roomId, "User has left room");
  }
}

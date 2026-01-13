import { activeRooms } from "../../state/activeRoom.ts";

export default function deleteRoomIfEmpty(roomId: string) {
  if (activeRooms.get(roomId)?.clients.size === 0) {
    return activeRooms.delete(roomId);
  }

  return false;
}

import { rooms } from "../server.ts";

export default function deleteRoomIfEmpty(roomId: string) {
    if(rooms.get(roomId)?.clients.size === 0) {
        rooms.delete(roomId);
        return true;
    };
    return false;
}
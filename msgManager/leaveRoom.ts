import { activeRooms } from "../server.ts";
import deleteRoomIfEmpty from "../utils/deleteRoomIfEmpty.ts";
import broadcast from "./broadcast.ts";

export default function leaveRoom(roomId: string, clientId: string) {
    const room = activeRooms.get(roomId);
    if(room == null) return;

    room.clients.delete(clientId);

    if(!deleteRoomIfEmpty(roomId)) {
        broadcast(roomId, "User has left room");
    }

}
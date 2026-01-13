import { activeSockets } from "../../state/activeSockets.ts";
import leaveRoom from "./leaveRoom.ts";

export default function ensureNotInAnotherRoom(clientId: string, roomId: string) {
    const socket = activeSockets.get(clientId);

    if (!(socket?.hasJoinedRoom && socket?.roomId)) return true;

    if (socket.roomId === roomId) return false;

    leaveRoom(socket.roomId, clientId);

    return true;
}
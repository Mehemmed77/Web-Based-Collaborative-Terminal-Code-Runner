import { Message } from "../../shared/protocol.ts";
import { activeSockets } from "../../state/activeSockets.ts";
import { ClientSocket } from "../../ws/socket.ts";
import { isJoinRoomPayload } from "../utils.ts";
import leaveRoom from "./leaveRoom.ts";

export default function ensureNotInAnotherRoom(msg: Message, ws: ClientSocket) {
    if (msg.msgType !== "JOIN_ROOM" || !isJoinRoomPayload(msg)) return;

    const socket = activeSockets.get(ws.id);

    if (!(socket?.hasJoinedRoom && socket?.roomId)) return true;

    if (socket.roomId === msg.payload.roomId) return false;

    leaveRoom(msg, ws);

    return true;
}
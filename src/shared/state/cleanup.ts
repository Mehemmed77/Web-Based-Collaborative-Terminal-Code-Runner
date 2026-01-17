import { activeRooms } from "./activeRoom.ts";
import { activeSockets } from "./activeSockets.ts";

export default function cleanup(clientId: string) {
    const roomId = activeSockets.get(clientId)?.roomId;

    if(roomId) {
        const clients = activeRooms.get(roomId)?.clients;

        clients?.delete(clientId);
        if (clients?.size === 0) activeRooms.delete(roomId);
    };

    activeSockets.delete(clientId);
}
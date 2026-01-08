import { activeSockets, rooms } from "../server.ts";

export default function cleanup(clientId: string) {
    const roomId = activeSockets.get(clientId)?.roomId;

    if(roomId) {
        const clients = rooms.get(roomId)?.clients;

        clients?.delete(clientId);
        if (clients?.size === 0) rooms.delete(roomId);
    };

    activeSockets.delete(clientId);
}
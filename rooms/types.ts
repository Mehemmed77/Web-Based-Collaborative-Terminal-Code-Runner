import { ClientSocket } from "../ws/socket.ts";

export interface ActiveRoom {
    roomId: string;
    clients: Map<string, ClientSocket>;
}

import WebSocket from "ws";

export interface ClientSocket extends WebSocket {
    id: string;
}

export interface Room {
    roomId: string;
    isClosed?: boolean;
    clients: Map<string, ClientSocket>;
}

export interface clientState {
    hasJoinedRoom: boolean;
    roomId: string | null;
}

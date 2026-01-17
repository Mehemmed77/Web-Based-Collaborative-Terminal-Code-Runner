import { ClientSocket } from "@/shared/state/socket.ts";

export default function reject(ws: ClientSocket) {
    ws.send("Session Expired");
    // ws.close();
}
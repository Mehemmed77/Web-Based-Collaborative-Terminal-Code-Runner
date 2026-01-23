import "dotenv/config";
import { WebSocketServer } from "ws";
import { v4 as id } from "uuid";
import { ClientSocket } from "../shared/state/socket.ts";
import { Server } from "http";
import { activeRooms } from "@/shared/state/activeRoom.ts";

export function createWebSocketServer(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: ClientSocket, req) => {
    ws.id = id();
    const url = new URL(req.url ?? "", "http://localhost");

    const roomId = url.searchParams.get("roomId");
    const userId = url.searchParams.get("userId");

    if (roomId == null || userId == null) return;

    const clients = activeRooms.get(roomId)?.clients ?? new Map<string, ClientSocket>();

    clients.set(userId, ws);
    activeRooms.set(roomId, {clients: clients, roomId: roomId});

    console.log(activeRooms.get(roomId)?.clients.size);

    ws.on("message", (data) => {
      const msg = data.toString();

      activeRooms.get(roomId)?.clients.forEach(client => {
        if (client.id === ws.id) return;
        client.send(JSON.stringify(msg));
      })
    });

    ws.on("close", () => {
      console.log(userId, " Closed connection.")
      activeRooms.get(roomId)?.clients.delete(userId);
    });

    // console.log(ws);
  });
}
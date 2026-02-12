import "dotenv/config";
import { WebSocketServer } from "ws";
import { v4 as id } from "uuid";
import { ClientSocket } from "../shared/state/socket.ts";
import { IncomingMessage, Server } from "http";
import { activeRooms } from "@/shared/state/activeRoom.ts";
import roomManager from "./roomManager.ts";
import onMessage from "./onMessage.ts";
import { latestVals } from "@/shared/state/latestVals.ts";
import { Message } from "@/shared/protocol/ws.ts";
import validate from "./validate.ts";

export function createWebSocketServer(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: ClientSocket, req: IncomingMessage) => {
    ws.id = id();
    
    const { roomId, userId, isOwner } = validate(req) ?? {};

    if (roomId == null || userId == null) return;

    roomManager(roomId, userId, ws);

    const latestVal = latestVals.get(roomId) ?? "";
    const message: Message = {
      type: "BROADCAST",
      content: latestVal,
    };

    ws.send(JSON.stringify(message));

    ws.on("message", (data) => onMessage(data, roomId));

      ws.on("close", () => {
        console.log(userId, " Closed connection.");
        activeRooms.get(roomId)?.clients.delete(userId);
      });
  });
}

import "dotenv/config";
import WebSocket, { WebSocketServer } from "ws";
import { ClientSocket, clientState, Room } from "./types/clientSocket.ts";
import { v4 as id } from "uuid";
import messageManager from "./msgManager/index.ts";
import { Message } from "./types/msgType.ts";
import cleanup from "./utils/cleanup.ts";

const server = new WebSocketServer({ port: 8000 });

export const activeSockets = new Map<string, clientState>();
export const activeRooms = new Map<string, Room>();

server.on("connection", (ws: ClientSocket) => {
  const newId = id();
  ws.id = newId;

  activeSockets.set(newId, { hasJoinedRoom: false, roomId: null });

  ws.on("close", () => {
    cleanup(ws.id);
  });

  ws.on("message", (data) => {
    const message = JSON.parse(
      Buffer.isBuffer(data) ? data.toString("utf-8") : data.toString()
    ) as Message;

    messageManager(message, ws);
  });
});

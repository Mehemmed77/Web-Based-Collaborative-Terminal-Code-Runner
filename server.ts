import "dotenv/config";
import { WebSocketServer } from "ws";
import { v4 as id } from "uuid";
import cleanup from "./state/cleanup.ts";
import { activeSockets } from "./state/activeSockets.ts";
import { ClientSocket } from "./ws/socket.ts";
import { Message } from "./shared/protocol.ts";
import messageManager from "./msgManager.ts";

const server = new WebSocketServer({ port: 8000 });

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

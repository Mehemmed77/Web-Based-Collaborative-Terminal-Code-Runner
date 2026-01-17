import "dotenv/config";
import { WebSocketServer } from "ws";
import { v4 as id } from "uuid";
import { ClientSocket } from "../shared/state/socket.ts";
import { Message } from "../shared/protocol.ts";
import messageManager from "./msgManager.ts";
import { activeSockets } from "../shared/state/activeSockets.ts";
import cleanup from "../shared/state/cleanup.ts";

const server = new WebSocketServer({ port: 8000 });

server.on("connection", (ws: ClientSocket) => {
  const newId = id();
  ws.id = newId;

  activeSockets.set(newId, {
    hasJoinedRoom: false,
    roomId: null,
    userId: null,
    authInProgress: false,
  });

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

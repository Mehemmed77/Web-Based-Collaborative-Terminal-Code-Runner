import "dotenv/config";
import { WebSocketServer } from "ws";
import { v4 as id } from "uuid";
import { ClientSocket } from "../shared/state/socket.ts";
import { Message } from "../shared/protocol.ts";
import cleanup from "../shared/state/cleanup.ts";
import { activeRooms } from "@/shared/state/activeRoom.ts";
import { activeSockets } from "@/shared/state/activeSockets.ts";

const server = new WebSocketServer({ port: 8000 });

server.on("connection", (ws: ClientSocket, req) => {
  const newId = id();
  ws.id = newId;

  console.log(req);


});

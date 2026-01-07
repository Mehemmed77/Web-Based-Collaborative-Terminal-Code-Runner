import WebSocket, { WebSocketServer } from "ws";
import { ClientSocket, Room } from "./types/clientSocket.ts";
import { v4 as id } from "uuid";
import messageManager from "./messageManager.ts";
import { Message } from "./types/msgType.ts";

const server = new WebSocketServer({ port: 8000 });

export const rooms = new Map<string, Room>();

server.on("connection", (ws: ClientSocket) => {
  ws.on("message", (data) => {
    const message = JSON.parse(Buffer.isBuffer(data) ? data.toString("utf-8") : data.toString()) as Message;

    ws.id = id();

    messageManager(message, ws);
  });
});


// console.log("Connection established");

// const newId = id();
// ws.id = newId;

// const role = clients.size === 0 ? "author" : "user";
// ownership.set(newId, role);

// clients.add(ws);

// ws.send(`You are ${role}.`);

// commandHistory.forEach((command) => ws.send(command));

// ws.on("message", (data) => {
//   if (ownership.get(ws.id) !== "author") return;

//   const message = Buffer.isBuffer(data)
//     ? data.toString("utf-8")
//     : data.toString();
//   commandHistory.push(message);

//   clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) client.send(message);
//   });
// });

// ws.on("close", () => {
//   clients.delete(ws);
//   ownership.delete(ws.id);

//   if (clients.size > 0) {
//     const temp = Array.from(clients);
//     ownership.set(temp[0].id, "author");
//     temp[0].send("You are author.");
//   }

//   console.log("Client disconnected");
// });

// ws.on("error", console.error);
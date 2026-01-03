import WebSocket, { WebSocketServer } from "ws";
import { v4 as id } from "uuid";
import { ClientSocket } from "./types/clientSocket.ts";

const server = new WebSocketServer({ port: 8000 });
const clients = new Set<ClientSocket>();
const ownership = new Map<string, string>();
const commandHistory: string[] = [];

console.log("WebSocket server running on ws://localhost:8080");

server.on("connection", (ws: ClientSocket) => {
  console.log("Connection established");

  const newId = id();
  ws.id = newId;

  const role = clients.size === 0 ? "author" : "user";
  ownership.set(newId, role);

  clients.add(ws);

  ws.send(`You are ${role}.`);

  commandHistory.forEach((command) => ws.send(command));

  ws.on("message", (data) => {
    if (ownership.get(ws.id) !== "author") return;

    const message = Buffer.isBuffer(data)
      ? data.toString("utf-8")
      : data.toString();
    commandHistory.push(message);

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(message);
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
    ownership.delete(ws.id);

    if (clients.size > 0) {
      const temp = Array.from(clients);
      ownership.set(temp[0].id, "author");
      temp[0].send("You are author.");
    }

    console.log("Client disconnected");
  });

  ws.on("error", console.error);
});

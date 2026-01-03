import { WebSocketServer } from "ws";
import { v4 as id } from 'uuid';

const server = new WebSocketServer({ port: 8000 });
const clients = new Set();
const commandHistory = [];

const ownership = new Map();

server.on('connection', ws => {
    console.log("Connection established");
    const ws_id = id();

    ws.id = ws_id;

    if (clients.size === 0) {
        ownership.set(ws.id, "author");
    }
    else ownership.set(ws.id, "user");

    ws.send(`You are ${ownership.get(ws.id)}`)

    clients.add(ws);

    commandHistory.forEach(command => {
        ws.send(command);
    })

    ws.on("message", data => {
        if (ownership.get(ws.id) === "author") {
            const message = data.toString("utf-8");
            commandHistory.push(message);

            // broadcast
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(`${data}`);
                }
            })

        }
    })

    ws.on("close", () => {
        clients.delete(ws);
        ownership.delete(ws.id);

        if(clients.size > 0) {
            const temp = Array.from(clients);
            ownership.set(temp[0].id, "author");
            temp[0].send("You are author.")
        }

        console.log("client disconnected");
    })

    ws.on('error', console.error);
});

import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8000 });

server.on('connection', ws => {
    console.log("Connection established");
    ws.send("Welcome");

    ws.on("message", data => {
            console.log('Received message from client: %s', data);

        ws.send(`Server received: ${data}`);
    })

    ws.on("close", () => {
        console.log("client disconnected");
    })

    ws.on('error', console.error);
});

import "dotenv/config";
import { createHttpServer } from "./http/index.ts";
import http from "http";
import { createWebSocketServer } from "./ws/server.ts";

const app = createHttpServer();
const server = http.createServer(app);

createWebSocketServer(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("HTTP + WS server running on port 3000");
});
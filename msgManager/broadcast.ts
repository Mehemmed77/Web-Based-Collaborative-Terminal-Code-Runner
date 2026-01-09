import { activeRooms } from "../server.ts";

export default function broadcast(roomId: string, message: string) {
  const room = activeRooms.get(roomId);
  if (room === undefined) return;

  room.clients.forEach((client) => {
    client.send(message);
  });
}

import { activeRooms } from "./activeRoom.ts";
import { ClientSocket } from "./socket.ts";

export default function broadcast(roomId: string, message: string) {
  const room = activeRooms.get(roomId);
  if (room === undefined) return;

  room.clients.forEach((client: ClientSocket) => {
    client.send(message);
  });
}

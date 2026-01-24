import { activeRooms } from "@/shared/state/activeRoom.ts";
import { ClientSocket } from "@/shared/state/socket.ts";
import { RawData } from "ws";

export default function onMessage(data: RawData, roomId: string, ws: ClientSocket) {
  const msg = data.toString();

  activeRooms.get(roomId)?.clients.forEach((client) => {
    if (client.id === ws.id) return;
    client.send(JSON.stringify(msg));
  });
}

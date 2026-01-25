import { activeRooms } from "@/shared/state/activeRoom.ts";
import { ClientSocket } from "@/shared/state/socket.ts";

export default function roomManager(roomId: string, userId: string, ws: ClientSocket) {
  const room = activeRooms.get(roomId);
  const clients = room?.clients ?? new Map<string, ClientSocket>();

  clients.set(userId, ws);

  activeRooms.set(roomId, { clients: clients, roomId: roomId, ownerUserId: ""});

  console.log(activeRooms.get(roomId)?.clients.size);
}

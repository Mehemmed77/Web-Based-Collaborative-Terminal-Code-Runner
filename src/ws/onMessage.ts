import { activeRooms } from "@/shared/state/activeRoom.ts";
import { latestVals } from "@/shared/state/latestVals.ts";
import { ClientSocket } from "@/shared/state/socket.ts";
import { RawData } from "ws";

export default function onMessage(data: RawData, roomId: string, ws: ClientSocket) {
  const payload = JSON.parse(data.toString());
  
  if (!payload.type) return;

  if (payload.type === "BROADCAST") {
    const room = activeRooms.get(roomId);

    room?.clients?.forEach(client => {
      client.send(JSON.stringify(payload.msgContent));
    })

    latestVals.set(roomId, payload.msgContent);
  }
}

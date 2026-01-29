import { Message } from "@/shared/protocol/ws.ts";
import { activeRooms } from "@/shared/state/activeRoom.ts";
import { latestVals } from "@/shared/state/latestVals.ts";
import { RawData } from "ws";

export default function onMessage(data: RawData, roomId: string) {
  const payload = JSON.parse(data.toString());
  
  if (!payload.type) return;

  if (payload.type === "BROADCAST") {
    const room = activeRooms.get(roomId);

    const message: Message = {
      type: "UPDATE",
      content: payload.content
    }

    room?.clients?.forEach(client => {
      client.send(JSON.stringify(message));
    })

    latestVals.set(roomId, payload.content);
  }
}

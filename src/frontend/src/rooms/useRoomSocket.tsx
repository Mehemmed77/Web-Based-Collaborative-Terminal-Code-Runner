import { useEffect, useRef } from "react";
import { WEBSOCKET_SERVER_LINK } from "../utils/constants.ts";
import type { Message } from "@protocol/ws.ts";
import { useRoomStore } from "..//store/roomStore.ts";
import { useAuthStore } from "../store/authStore.ts";

export interface RoomProps {
  roomId: string | null;
  ownerId: string | null;
}

export default function useRoomSocket(
  roomExistence: boolean,
  roomId: string,
  onMessage: (data: any) => void,
) {
  const socketRef = useRef<WebSocket | null>(null);
  const ownership = useRoomStore(s => s.ownership);
  const setConnectionState = useRoomStore(s => s.setConnectionState);
  const setRoomId = useRoomStore(s => s.setRoomId);
  const userId = useAuthStore(s => s.userId);

  useEffect(() => {
    if (!roomExistence) return;
    const isOwner = ownership === "OWNER";
  
    setConnectionState("CONNECTING");

    const ws = new WebSocket(
      `${WEBSOCKET_SERVER_LINK}?roomId=${roomId}&userId=${userId}&isOwner=${isOwner}`,
    );

    ws.onopen = () => {
      setConnectionState("CONNECTED");
      setRoomId(roomId);
      console.log("connected");
    };

    ws.onerror = () => {
      setConnectionState("ERROR");
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data) as Message;

      if (msg.type === "INIT" || msg.type === "UPDATE") {
        onMessage(msg.content);
      }
    };

    ws.onclose = () => {
      setConnectionState("IDLE");
      console.log("closed");
    };

    socketRef.current = ws;

    return () => {
      ws.close();
    };

  }, [roomExistence, roomId, userId, ownership]);

  return socketRef;
}

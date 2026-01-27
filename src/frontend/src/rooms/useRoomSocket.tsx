import { useEffect, useRef } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext.tsx";
import { WEBSOCKET_SERVER_LINK } from "../utils/constants.ts";

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
  const { state } = useGlobalContext();

  useEffect(() => {
    if (!roomExistence) return;
    const isOwner = state.ownership === "OWNER";

    const ws = new WebSocket(
      `${WEBSOCKET_SERVER_LINK}?roomId=${roomId}&userId=${state.userId}&isOwner=${isOwner}`,
    );

    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "INIT" || msg.type === "UPDATE") {
        onMessage(msg.content);
      }

    };

    ws.onclose = () => {
      console.log("closed");
    };

    socketRef.current = ws;

    return () => {
      ws.close();
    };

  }, [roomExistence, roomId, state.userId, state.ownership]);

  return socketRef;
}

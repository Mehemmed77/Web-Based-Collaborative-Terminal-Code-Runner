import { useEffect, useRef } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext.tsx";
import { WEBSOCKET_SERVER_LINK } from "../utils/constants.ts";

export interface RoomProps {
  roomId: string | null;
  ownerId: string | null;
}

export default function useRoomSocket(
  effectiveRoomProps: RoomProps,
  onMessage: (data: any) => void,
) {
  const socketRef = useRef<WebSocket | null>(null);
  const { state } = useGlobalContext();

  useEffect(() => {
    if (effectiveRoomProps.roomId === null) return;

    const isOwner = effectiveRoomProps.ownerId !== null;

    const ws = new WebSocket(
      `${WEBSOCKET_SERVER_LINK}?roomId=${effectiveRoomProps.roomId}&userId=${state.userId}&isOwner=${isOwner}`,
    );

    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = (event) => {
      onMessage(event.data);
    };

    ws.onclose = () => {
      console.log("closed");
    };

    socketRef.current = ws;

    return () => {
      ws.close();
    };
  }, [effectiveRoomProps.roomId, effectiveRoomProps.ownerId]);

  return socketRef;
}

import { useEffect, useRef } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext.tsx";
import { WEBSOCKET_SERVER_LINK } from "../utils/constants.ts";
import type { Message } from "@protocol/ws.ts";

export interface RoomProps {
  roomId: string | null;
  ownerId: string | null;
}

export default function useRoomSocket(
  roomExistence: boolean,
  roomId: string,
  onMessage: (data: any) => void,
) {
  const { dispatch } = useGlobalContext();
  const socketRef = useRef<WebSocket | null>(null);
  const { state } = useGlobalContext();

  useEffect(() => {
    if (!roomExistence) return;
    const isOwner = state.ownership === "OWNER";
  
    dispatch({ type: "SET_CONNECTION_STATE", connectionState: "CONNECTING" });

    const ws = new WebSocket(
      `${WEBSOCKET_SERVER_LINK}?roomId=${roomId}&userId=${state.userId}&isOwner=${isOwner}`,
    );

    ws.onopen = () => {
      dispatch({ type: "SET_CONNECTION_STATE", connectionState: "CONNECTED" });
      console.log("connected");
    };

    ws.onerror = () => {
      dispatch({ type: "SET_CONNECTION_STATE", connectionState: "ERROR" });
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data) as Message;

      if (msg.type === "INIT" || msg.type === "UPDATE") {
        onMessage(msg.content);
      }
    };

    ws.onclose = () => {
      dispatch({ type: "SET_CONNECTION_STATE", connectionState: "IDLE" });
      console.log("closed");
    };

    socketRef.current = ws;

    return () => {
      ws.close();
    };

  }, [roomExistence, roomId, state.userId, state.ownership]);

  return socketRef;
}

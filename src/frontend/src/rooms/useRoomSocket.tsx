import { useEffect, useRef } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext.tsx";

export default function useRoomSocket(roomId: string, onMessage: (data: any) => void) {
  const socketRef = useRef<WebSocket | null>(null);
  const { state } = useGlobalContext();

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3000/ws?roomId=${roomId}&userId=${state.userId}`);

    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = (event) => {
      console.log(event.data);
      onMessage(event.data);
    };

    ws.onclose = () => {
      console.log("closed");
    };

    socketRef.current = ws;

    return () => {
      ws.close();
    };
  }, [roomId]);

  return socketRef;
}

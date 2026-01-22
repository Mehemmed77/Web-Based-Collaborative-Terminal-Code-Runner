import { useEffect, useRef } from "react";

export default function useRoomSocket(roomId: string, onMessage: (data: any) => void) {
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:3000/ws?roomId=${roomId}`);

        ws.onopen = () => {
            console.log("connected");
        }

        ws.onmessage = (event) => {
            onMessage(JSON.parse(event.data));
        }

        ws.onclose = () => {
            console.log("closed")
        }

        socketRef.current = ws;

        return () => {
            ws.close();
        }

    }, [roomId]);

    return socketRef;
}
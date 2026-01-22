import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useRoomSocket from "../hooks/useRoomSocket";

export default function Room() {
  const { roomId } = useParams();
  const [roomExistence, setRoomExistence] = useState<boolean>(false);
  let ws: WebSocket | null;

  useEffect(() => {
    const checkRoom = async () => {
      if (roomId === undefined) {
        setRoomExistence(false);
        return;
      }

      const response = await fetch(`http://localhost:3000/rooms/${roomId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionStorage.getItem("sessionId")!,
        },
      });

      if (response.status !== 200) {
        setRoomExistence(false);
        return;
      }

      ws = useRoomSocket(roomId, (data) => {}).current;
      setRoomExistence(true);
    };

    checkRoom();
  }, []);

  return roomExistence ? (
    <>
      <h1>Room Number: {roomId}</h1> 
      <button>send message</button>
    </>
  ) : (
    <h1>Page not found</h1>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Room() {
  const { roomId } = useParams();
  const [roomExistence, setRoomExistence] = useState<boolean>(false);

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
        }
      });

      const json = response.json();

      console.log(json);

      if (response.status !== 200) {
        setRoomExistence(false);
        return;
      }

      setRoomExistence(true);
    };

    checkRoom();
  }, []);

  return roomExistence ? <h1>Room Number: {roomId}</h1> : <h1>Page not found</h1>;
}

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useRoomSocket from "./useRoomSocket";
import apiFetch from "../utils/apiFetch";
import { BACKEND_SERVER_LINK } from "../utils/constants";

export default function Room() {
  const { roomId } = useParams();
  const [roomExistence, setRoomExistence] = useState<boolean>(false);
  const ws = useRoomSocket(roomId ?? "", (data) => {
    console.log(data);
  }).current;

  useEffect(() => {
    const checkRoom = async () => {
      if (roomId === undefined) {
        setRoomExistence(false);
        return;
      }

      const response = await apiFetch(`${BACKEND_SERVER_LINK}rooms/${roomId}`, "GET");

      if (response.status !== 200) {
        setRoomExistence(false);
        ws?.close();
        return;
      }

      setRoomExistence(true);
    };

    checkRoom();
  }, []);

  const handleClick = () => {
    ws?.send("Salamchik");
  };

  return roomExistence ? (
    <>
      <h1>Room Number: {roomId}</h1>
      <button onClick={handleClick}>send message</button>
    </>
  ) : (
    <h1>Page not found</h1>
  );
}

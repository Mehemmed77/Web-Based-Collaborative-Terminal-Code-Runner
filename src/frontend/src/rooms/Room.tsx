import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useRoomSocket, { type RoomProps } from "./useRoomSocket";
import apiFetch from "../utils/apiFetch";
import { BACKEND_SERVER_LINK } from "../utils/constants";

export default function Room() {
  const { roomId } = useParams();
  const [effectiveRoomProps, setEffectiveRoomProps] = useState<RoomProps>({
    roomId: null,
    ownerId: null
  });

  const [roomExistence, setRoomExistence] = useState<boolean>(false);

  const ws = useRoomSocket(effectiveRoomProps, (data) => {
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
      
      const json = await response.json();

      const roomProps: RoomProps = {roomId: roomId, ownerId: null};

      if (json.ownerId) roomProps.ownerId = json.ownerId;

      setEffectiveRoomProps(roomProps);
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

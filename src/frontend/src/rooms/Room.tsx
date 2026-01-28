import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useRoomSocket from "./useRoomSocket";
import apiFetch from "../utils/apiFetch";
import { BACKEND_SERVER_LINK } from "../utils/constants";
import { useGlobalContext } from "../hooks/useGlobalContext";

export default function Room() {
  const { roomId } = useParams();
  const { dispatch } = useGlobalContext();
  const [terminalValue, setTerminalValue] = useState<string>("");
  const [roomExistence, setRoomExistence] = useState<boolean>(false);

  const ws = useRoomSocket(roomExistence, roomId ?? "", (data) => setTerminalValue(data)).current;

  useEffect(() => {
    const checkRoom = async () => {
      dispatch({ type: "SET_CONNECTION_STATE", connectionState: "CONNECTING" });

      if (roomId === undefined) {
        dispatch({ type: "SET_CONNECTION_STATE", connectionState: "ERROR" });
        setRoomExistence(false);
        return;
      }

      const response = await apiFetch(`${BACKEND_SERVER_LINK}rooms/${roomId}`, "GET");
      

      if (response.status !== 200) {
        dispatch({ type: "SET_CONNECTION_STATE", connectionState: "ERROR" });
        setRoomExistence(false);
        return;
      }

      const json = await response.json();
      
      dispatch({ type: "SET_OWNERSHIP", ownership: json.isOwner ? "OWNER" : "USER" });
      dispatch({ type: "SET_CONNECTION_STATE", connectionState: "CONNECTED" });

      setRoomExistence(true);
    };

    checkRoom();
  }, [roomId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ws?.send(
      JSON.stringify({
        type: "BROADCAST",
        msgContent: e.target.value,
      }),
    );
  };

  return roomExistence ? (
    <>
      <h1>Room Number: {roomId}</h1>
      <input
        type="text"
        placeholder="Type a command"
        onChange={handleChange}
        value={terminalValue}
      />
      {/* <button onClick={handleClick}>send message</button> */}
    </>
  ) : (
    <h1>Page not found</h1>
  );
}

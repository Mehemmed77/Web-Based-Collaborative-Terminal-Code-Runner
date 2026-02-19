import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import useRoomSocket from "./useRoomSocket";
import apiFetch from "../utils/apiFetch";
import { BACKEND_SERVER_LINK } from "../utils/constants";
import type { Message } from "@protocol/ws";
import Terminal from "../terminalUI/Terminal";
import { useRoomStore } from "../store/roomStore";

export default function Room() {
  const { roomId } = useParams();
  const [draftValue, setDraftValue] = useState<string>("");
  const [roomExistence, setRoomExistence] = useState<boolean>(false);
  const connectionState = useRoomStore(s => s.connectionState);
  const setOwnership = useRoomStore(s => s.setOwnership);

  const onMessage = useCallback((data: any) => {
    setDraftValue(data);
  }, []);

  const ws = useRoomSocket(roomExistence, roomId ?? "", onMessage).current;

  useEffect(() => {
    const checkRoom = async () => {
      if (roomId === undefined) {
        setRoomExistence(false);
        return;
      }

      const response = await apiFetch(`${BACKEND_SERVER_LINK}rooms/${roomId}`, "GET");

      if (response.status !== 200) {
        setRoomExistence(false);
        return;
      }

      const json = await response.json();

      setOwnership(json.isOwner ? "OWNER" : "USER")
      setRoomExistence(true);
    };

    checkRoom();
  }, [roomId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (connectionState !== "CONNECTED") return;

    const inputVal = e.target.value;
    setDraftValue(inputVal);

    const data: Message = {
      type: "BROADCAST",
      content: inputVal
    }

    ws?.send(JSON.stringify(data));
  };

  return roomExistence ? (
    <>
      <h1>Room Number: {roomId}</h1>
      <input
        type="text"
        placeholder="Type a command"
        onChange={handleChange}
        value={draftValue}
      />
      <Terminal />
    </>
  ) : (
    <h1>Page not found</h1>
  );
}

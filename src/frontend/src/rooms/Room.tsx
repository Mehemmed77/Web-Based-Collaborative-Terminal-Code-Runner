import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import type { Message } from "@protocol/ws";
import Terminal from "../terminalUI/Terminal";
import { useRoomStore } from "../store/roomStore";
import { useAuthStore } from "../store/authStore";

export default function Room() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  
  // AuthStore
  const userId = useAuthStore((s) => s.userId);

  // RoomStore
  const draftValue = useRoomStore((s) => s.draftValue);
  const connectionState = useRoomStore((s) => s.connectionState);
  const connect = useRoomStore((s) => s.connect);
  const send = useRoomStore((s) => s.send);
  const disconnect = useRoomStore((s) => s.disconnect);

  useEffect(() => {
    console.log(connectionState);
    if (connectionState === "ERROR") navigate("/not-authorized");
  }, [connectionState]);

  useEffect(() => {
    connect(roomId, userId ?? "");

    return () => disconnect();
  }, [roomId, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const data: Message = {
      type: "BROADCAST",
      content: value,
    };

    send(data);
  };

  return connectionState === "CONNECTED" ? (
    <>
      <h1>Room Number: {roomId}</h1>
      <input type="text" placeholder="Type a command" onChange={handleChange} value={draftValue} />
      <Terminal />
    </>
  ) : (
    <h1>Page not found</h1>
  );
}

import { useRoomStore } from "@/shared/store/roomStore";
import { useParams } from "react-router";

export default function Room() {
  const { roomId } = useParams();
  
  // AuthStore
  const connectionState = useRoomStore((s) => s.connectionState);

  return connectionState === "CONNECTED" ? (
    <>
      <h1>Room Number: {roomId}</h1>
    </>
  ) : (
    <h1>Page not found</h1>
  );
}

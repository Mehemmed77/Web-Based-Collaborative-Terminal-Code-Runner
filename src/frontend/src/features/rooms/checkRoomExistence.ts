import apiFetch from "@/shared/utils/apiFetch";
import { BACKEND_SERVER_LINK } from "@/shared/utils/constants";

export default async function checkRoomExistence(roomId: string | undefined | null) {
  if (roomId == null) return null;

  const response = await apiFetch(`${BACKEND_SERVER_LINK}rooms/${roomId}`, "GET");

  if (response.status !== 200) {
    return null;
  };
  
  const json = await response.json();

  return json.isOwner;
}

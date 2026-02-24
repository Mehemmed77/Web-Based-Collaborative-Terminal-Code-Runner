import apiFetch from "../utils/apiFetch.ts";
import { BACKEND_SERVER_LINK } from "../utils/constants.ts";

export default async function checkRoomExistence(roomId: string | undefined | null) {
  if (roomId == null) return null;

  const response = await apiFetch(`${BACKEND_SERVER_LINK}rooms/${roomId}`, "GET");

  if (response.status !== 200) {
    return null;
  };
  
  const json = await response.json();

  return json.isOwner;
}

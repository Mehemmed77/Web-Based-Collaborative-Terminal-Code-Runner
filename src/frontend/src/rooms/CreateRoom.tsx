import { BACKEND_SERVER_LINK } from "../utils/constants";
import apiFetch from "../utils/apiFetch";
import { useAuthStore } from "../store/authStore";

export default function CreateRoom() {
  const userId = useAuthStore((s) => s.userId);

  const handleClick = async () => {
    const data = { userId: userId };

    const response = await apiFetch(`${BACKEND_SERVER_LINK}rooms/createRoom/`, "POST", data);

    const json = await response.json();

    console.log(json);
  };

  return (
    <button type="button" onClick={handleClick}>
      Create Room
    </button>
  );
}

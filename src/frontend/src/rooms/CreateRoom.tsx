import { BACKEND_SERVER_LINK } from "../utils/constants";
import { useGlobalContext } from "../hooks/useGlobalContext";
import apiFetch from "../utils/apiFetch";

export default function CreateRoom() {
  const { state } = useGlobalContext();

  const handleClick = async () => {
    const data = { userId: state.userId };

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

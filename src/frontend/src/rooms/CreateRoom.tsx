import { useGlobalContext } from "../hooks/useGlobalContext";

export default function CreateRoom() {
    const { state } = useGlobalContext();

    const handleClick = async () => {
        const sessionId = sessionStorage.getItem("sessionId");

        const data = {userId: state.userId};

        const response = await fetch("http://localhost:3000/rooms/createRoom/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-session-id": sessionId!,
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        console.log(json);
    }

    return (
        <button type="button" onClick={handleClick}>Create Room</button>
    )
}
export default function CreateRoom() {
    const handleClick = async () => {
        const sessionId = sessionStorage.getItem("sessionId");

        const response = await fetch("http://localhost:3000/rooms/createRoom/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-session-id": sessionId!,
            },
            body: JSON.stringify()
        });

    }

    return (
        <button type="button" onClick={handleClick}>Create Room</button>
    )
}
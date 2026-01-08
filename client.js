const statusText = document.getElementById("status");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("roomInput");
const messageContainer = document.getElementById("messageContainer");

let ws = new WebSocket("ws://localhost:8000");

const input = document.getElementById("room-input");

ws.onmessage = function(event) {
    console.log(event.data);
    const p = document.createElement("p");
    p.textContent = event.data;
    messageContainer.appendChild(p);
}

function join() {
    ws.send(
        JSON.stringify({
            msgType: "JOIN_ROOM",
            payload: messageInput.value,
        })
    )
}

function createRoom() {
  ws.send(
    JSON.stringify({
      msgType: "CREATE_ROOM",
    })
  );
}

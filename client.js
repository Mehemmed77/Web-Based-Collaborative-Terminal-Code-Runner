const statusText = document.getElementById("status");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

let ws = new WebSocket("ws://localhost:8000");;

function sendRequest() {
  console.log("salam");
  ws.send(JSON.stringify({
    msg: "JOIN_ROOM",
    roomId: "abc123",
  }));
}

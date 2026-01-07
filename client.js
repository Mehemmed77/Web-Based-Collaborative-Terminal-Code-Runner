const statusText = document.getElementById("status");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

let ws = new WebSocket("ws://localhost:8000");

const input = document.getElementById("room-input");

function join() {
    ws.send(
        JSON.stringify({
            msg: "JOIN_ROOM",
            payload: input.value,
        })
    )
}

function createRoom() {
  ws.send(
    JSON.stringify({
      msg: "CREATE_ROOM",
    })
  );
}

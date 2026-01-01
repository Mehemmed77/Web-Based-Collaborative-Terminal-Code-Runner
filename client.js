const statusText = document.getElementById("status");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

let ws;

function sendMessage() {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
        statusText.textContent = "You cannot send a message before establishing connection";
        statusText.style.color = "red";
        return;
    }

    ws.send(messageInput.value);
    messageInput.value = "";
}

function connect() {
  ws = new WebSocket("ws://localhost:8000");

  statusText.textContent = "Connection is starting to get established...";
  statusText.style.color = "orange";

  ws.onopen = () => {
    statusText.textContent = "Connected to server";
    statusText.style.color = "green";
  };

  ws.onerror = (error) => {
    statusText.textContent = "Connection error";
    statusText.style.color = "red";
  };

  ws.onmessage = (event) => {
    const newMessage = document.createElement("div");
    newMessage.textContent = event.data;
    messages.appendChild(newMessage);
  }
}

function disconnect() {
    if(ws === undefined || !ws || ws.readyState !== WebSocket.OPEN) {
        statusText.textContent = "Can't terminate a unestablished session";
        statusText.style.color = "red";
        return;
    }

    statusText.textContent = "Session terminated";
    statusText.style.color = "blue";
    
    ws.close();    
}

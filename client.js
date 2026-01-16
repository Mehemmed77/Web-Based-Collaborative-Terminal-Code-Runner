const statusText = document.getElementById("status");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("roomInput");
const messageContainer = document.getElementById("messageContainer");
const createFileContainer = document.getElementById("createFileContainer");
const fileInput = document.getElementById("fileNameInput");

const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");

let ws = new WebSocket("ws://localhost:8000");

const input = document.getElementById("room-input");

function getSessionId() {
  let uuid = localStorage.getItem("sessionId");
  if (uuid === null) {
    uuid = crypto.randomUUID();
    localStorage.setItem("sessionId", uuid);
  }

  return uuid;
}

ws.onmessage = function (event) {
  console.log(event.data);
  const p = document.createElement("p");
  p.textContent = event.data;
  messageContainer.appendChild(p);
};

function register() {
  ws.send(
    JSON.stringify({
      msgType: "REGISTER",
      payload: {
        username: usernameInput.value,
        password: passwordInput.value
      }
    })
  )
}

function login() {
  ws.send(
    JSON.stringify({
      msgType: "LOGIN",
      payload: {
        username: usernameInput.value,
        password: passwordInput.value,
      }
    })
  )
}

function join() {
  ws.send(
    JSON.stringify({
      msgType: "JOIN_ROOM",
      payload: {
        content: messageInput.value,
        sessionId: getSessionId(),
      },
    })
  );
  createFileContainer.style.display = "block";
}

function createRoom() {
  ws.send(
    JSON.stringify({
      msgType: "CREATE_ROOM",
      payload: {
        sessionId: getSessionId(),
      },
    })
  );
  createFileContainer.style.display = "block";
}

function createFile() {
  ws.send(
    JSON.stringify({
      msgType: "CREATE_FILE",
      payload: {
        sessionId: getSessionId(),
        content: fileInput.value
      }
    })
  )
}

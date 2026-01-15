import { Message } from "../../shared/protocol.ts";
import { ClientSocket } from "../../ws/socket.ts";
import insertUserAndSession from "../repository/insertUserAndSession.ts";
import {
  passwordValidationErrorMessages,
  insertionMessages,
  usernameValidationErrorMessages,
} from "../types.ts";
import { isRegisterPayload } from "../utils.ts";
import { validatePassword, validateUsername } from "../validation.ts";
import { hash } from "bcrypt-ts";

export default async function register(msg: Message, ws: ClientSocket) {
  if (msg.msgType !== "REGISTER" || !isRegisterPayload(msg.payload)) {
    ws.send("Invalid Register Payload");
    return;
  }

  const username = msg.payload.username.trim().toLowerCase();
  const password = msg.payload.password;

  const val1 = validateUsername(username);
  const val2 = validatePassword(password);

  if (val1 !== "VALID") {
    ws.send(usernameValidationErrorMessages[val1]);
    return;
  }

  if (val2 !== "VALID") {
    ws.send(passwordValidationErrorMessages[val2]);
    return;
  }

  const hashedPassword = await hash(password, 10);
  const userId = crypto.randomUUID();
  const sessionId = crypto.randomUUID();

  const queryRes = await insertUserAndSession(userId, username, hashedPassword, sessionId);

  if (queryRes !== "DONE") {
    ws.send(insertionMessages[queryRes]);
    return;
  }

  return sessionId;
}

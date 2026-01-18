import { Message } from "@/shared/protocol.ts";
import { ClientSocket } from "@/shared/state/socket.ts";
import { compare } from "bcrypt-ts";
import { isLoginPayload } from "../utils.ts";
import findUser from "../repository/findUser.ts";
import insertSession from "../repository/insertSession.ts";
import { insertionMessages } from "../types.ts";

export default async function login(msg: Message, ws: ClientSocket) {
  if (msg.msgType !== "LOGIN" || !isLoginPayload(msg.payload)) {
    return;
  }

  const username = msg.payload.username.trim().toLowerCase();
  const password = msg.payload.password;

  const user = await findUser(username);

  if (user?.rowCount === 0) {
    return;
  }

  const userEntry = user?.rows[0];
  console.log(userEntry);

  const password_hash = userEntry.password_hash ?? "";

  const result = await compare(password, password_hash);

  if (!result) {
    ws.send("Username or password incorrect");
    return;
  }

  const userId = userEntry.id;
  const sessionId = crypto.randomUUID();

  const queryRes = await insertSession(sessionId, userId);
  console.log(queryRes);

  if (queryRes !== "DONE") {
    ws.send(insertionMessages[queryRes]);
    return;
  }

  return sessionId;
}

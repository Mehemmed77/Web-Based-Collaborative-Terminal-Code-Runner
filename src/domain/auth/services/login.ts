import { compare } from "bcrypt-ts";
import { isLoginPayload } from "../utils.ts";
import findUser from "../repository/findUser.ts";
import insertSession from "../repository/insertSession.ts";

export default async function login(payload: any) {
  const context: Record<string, string | null> = {};
  if (!isLoginPayload(payload)) {
    context["message"] = "Not a valid payload for login";

    return context;
  }

  const username = payload.username.trim().toLowerCase();
  const password = payload.password;

  const user = await findUser(username);

  if (user?.rowCount === 0) {
    context["message"] = "Username or password incorrect";
    return context;
  }

  const userEntry = user?.rows[0];

  const password_hash = userEntry.password_hash ?? "";

  const result = await compare(password, password_hash);

  if (!result) {
    context["message"] = "Username or password incorrect";
    return context;
  }

  const userId = userEntry.id;
  const sessionId = crypto.randomUUID();

  const queryRes = await insertSession(sessionId, userId);

  if (queryRes !== "DONE") {
    context["message"] = "Unexpected error occurred, try again.";
    return context;
  }

  context["message"] = "SUCCESS";
  context["userId"] = userId;
  context["sessionId"] = sessionId;

  return context;
}

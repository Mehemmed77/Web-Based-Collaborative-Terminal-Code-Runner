import insertUserAndSession from "../repository/insertUserAndSession.ts";
import {
  passwordValidationErrorMessages,
  insertionMessages,
  usernameValidationErrorMessages,
} from "../types.ts";
import { isRegisterPayload } from "../utils.ts";
import { validatePassword, validateUsername } from "../validation.ts";
import { hash } from "bcrypt-ts";

export default async function register(payload: any) {
  const context: Record<string, string> = {};

  if (!isRegisterPayload(payload)) {
    context["message"] = "Invalid Register Payload"
    return context;
  }

  const username = payload.username.trim().toLowerCase();
  const password = payload.password;

  const val1 = validateUsername(username);
  const val2 = validatePassword(password);

  if (val1 !== "VALID") {
    context["message"] = usernameValidationErrorMessages[val1];
    return context;
  }

  if (val2 !== "VALID") {
    context["message"] = passwordValidationErrorMessages[val2];
    return context;
  }

  const hashedPassword = await hash(password, 10);
  const userId = crypto.randomUUID();
  const sessionId = crypto.randomUUID();

  const queryRes = await insertUserAndSession(userId, username, hashedPassword, sessionId);

  if (queryRes !== "DONE") {
    context["message"] = insertionMessages[queryRes];
    return context;
  }

  context["message"] = "SUCCESS";
  context["sessionId"] = sessionId;

  return context;
}

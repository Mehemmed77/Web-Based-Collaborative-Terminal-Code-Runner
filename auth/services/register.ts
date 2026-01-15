import { Message } from "../../shared/protocol.ts";
import { ClientSocket } from "../../ws/socket.ts";
import findUser from "../repository/findUser.ts";
import insertUser from "../repository/insertUser.ts";
import { passwordValidationErrorMessages, userInsertionMessages, usernameValidationErrorMessages, userQueryMessages } from "../types.ts";
import { isRegisterPayload } from "../utils.ts";
import { validatePassword, validateUsername } from "../validation.ts";
import { hash } from 'bcrypt-ts';

export default async function register(msg: Message, ws: ClientSocket) {
    if (msg.msgType !== "REGISTER" || isRegisterPayload(msg.payload)) {
        ws.send("Invalid Register Payload");
        return;
    }

    const username = msg.payload.username;
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

    const queryMsg = await findUser(username);
    
    if(queryMsg !== "USER_NOT_FOUND") {
        ws.send(userQueryMessages[queryMsg]);
        return;
    }

    const hashedPassword = await hash(password, 10);

    const res = await insertUser(username, hashedPassword);

    if (res !== "DONE") {
        ws.send(userInsertionMessages[res]);
        return;
    }

}
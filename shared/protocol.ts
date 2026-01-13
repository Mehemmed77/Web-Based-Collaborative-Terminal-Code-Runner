export type Payload = {
    content?: string,
    sessionId?: string,
}

export type Message = {
    msgType: "PLAIN_TEXT" | "JOIN_ROOM" | "CREATE_ROOM" | "LEAVE_ROOM" | "CREATE_FILE";
    payload: Payload;
};


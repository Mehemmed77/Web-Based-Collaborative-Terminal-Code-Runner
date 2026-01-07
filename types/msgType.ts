export type Message = {
    msgType: "PLAIN_TEXT" | "JOIN_ROOM" | "CREATE_ROOM";
    payload?: any;
};



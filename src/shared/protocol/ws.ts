export type ConnectionState = "IDLE" | "CONNECTING" | "CONNECTED" | "ERROR";
export type Message = {
    type: "INIT" | "UPDATE" | "BROADCAST",
    content: string,
}
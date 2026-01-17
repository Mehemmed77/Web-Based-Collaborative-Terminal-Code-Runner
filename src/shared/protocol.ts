export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  password: string;
};

export type CreateFilePayload = {
  fileName: string;
  sessionId: string;
};

export type JoinRoomPayload = {
  roomId: string;
  sessionId: string;
};

export type CreateRoomPayload = {
  sessionId: string;
};

export type LeaveRoomPayload = {
  roomId: string;
  sessionId: string;
}

export type TextPayload = {
  text: string;
  sessionId: string;
};

// "PLAIN_TEXT" | "JOIN_ROOM" | "CREATE_ROOM" | "LEAVE_ROOM" | "CREATE_FILE";

export type Message =
  | { msgType: "PLAIN_TEXT"; payload: TextPayload }
  | { msgType: "JOIN_ROOM"; payload: JoinRoomPayload }
  | { msgType: "CREATE_ROOM"; payload: CreateRoomPayload }
  | { msgType: "LEAVE_ROOM"; payload: LeaveRoomPayload }
  | { msgType: "CREATE_FILE"; payload: CreateFilePayload }
  | { msgType: "LOGIN"; payload: LoginPayload }
  | { msgType: "REGISTER"; payload: RegisterPayload }

import type { Message } from "@protocol/ws";
import checkRoomExistence from "../rooms/checkRoomExistence";
import { create } from "zustand";
import { WEBSOCKET_SERVER_LINK } from "../utils/constants";

type ConnectionState = "IDLE" | "CONNECTING" | "CONNECTED" | "ERROR";
type OwnershipType = "OWNER" | "USER";

interface RoomState {
  connectionState: ConnectionState;
  ownership: OwnershipType | null;
  roomId: string | null;
  draftValue: string;

  socket: WebSocket | null;

  connect: (roomId: string | undefined | null, userId: string) => void;
  disconnect: () => void;
  send: (msg: Message) => void;
  setDraftValue: (val: string) => void;
}

const initialState = {
  ownership: null,
  roomId: null,
  connectionState: "IDLE",
  draftValue: "",
  socket: null,
} satisfies Pick<RoomState, "connectionState" | "draftValue" | "ownership" | "roomId" | "socket">;

export const useRoomStore = create<RoomState>()((set, get) => ({
  ...initialState,

  connect: async (roomId, userId) => {
    const { socket, connectionState } = get();

    if (socket || connectionState === "CONNECTED") return; // do not continue if there is already a connection

    const userAuthority = await checkRoomExistence(roomId); // checkRoomExistence returns user's authority

    if (userAuthority === null) {
      set({
        connectionState: "ERROR",
      })

      return;
    }; // If room doesn't exist or user is not a member of the room then do not preceed

    if (get().socket) return;

    const ws = new WebSocket(
      `${WEBSOCKET_SERVER_LINK}?roomId=${roomId}&userId=${userId}&isOwner=${userAuthority}`,
    );

    ws.onopen = () => {
      set({
        socket: ws,
        connectionState: "CONNECTED",
        roomId: roomId,
        ownership: userAuthority as OwnershipType,
      });
    };

    ws.onerror = () => {
      set({ connectionState: "ERROR" });
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data) as Message;

      if (msg.type === "INIT" || msg.type === "UPDATE") set({ draftValue: msg.content });
    };

    ws.onclose = () => {
      set({
        socket: null,
        connectionState: "IDLE",
        roomId: null,
        ownership: null,
      });
      console.log("closed");
    };
  },

  disconnect: () => {
    const { socket } = get();
    socket?.close();

    set({ socket: null, connectionState: "IDLE" });
  },

  send: (msg) => {
    const { socket, connectionState } = get();

    if (connectionState !== "CONNECTED") return;

    set({ draftValue: msg.content });

    socket?.send(JSON.stringify(msg));
  },

  setDraftValue: (draftValue) => set({ draftValue }),
}));

import { create } from "zustand";

type ConnectionState = "IDLE" | "CONNECTING" | "CONNECTED" | "ERROR";
type OwnershipType = "OWNER" | "USER";

interface RoomState {
    connectionState: ConnectionState;
    hasJoinedRoom: boolean;
    ownership: OwnershipType | null;
    roomId: string | null;
    setConnectionState: (connectionState: ConnectionState) => void;
    setHasJoinedRoom: (hasJoinedRoom: boolean) => void;
    setOwnership: (ownership: OwnershipType) => void;
    setRoomId: (roomId: string) => void;
}

const initialState = {
    ownership: null,
    roomId: null,
    connectionState: "IDLE",
    hasJoinedRoom: false,
} satisfies Pick<RoomState, "connectionState" | "hasJoinedRoom" | "ownership" | "roomId">

export const useRoomStore = create<RoomState>()((set) => ({
    ...initialState,
    setConnectionState: (connectionState) => set({connectionState}),
    setHasJoinedRoom: (hasJoinedRoom) => set({hasJoinedRoom}),
    setOwnership: (ownership) => set({ ownership }),
    setRoomId: (roomId) => set({ roomId }),
}))

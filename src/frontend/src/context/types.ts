import type { ConnectionState } from "@protocol/ws";

export type OwnershipState = "OWNER" | "USER";

export type GlobalState = {
  userId: string | null;
  ownership: OwnershipState | null;
  connectionState: ConnectionState | null;
};


export type Actions =
  | { type: "SET_USER_ID"; userId: string }
  | { type: "SET_OWNERSHIP"; ownership: OwnershipState }
  | { type: "SET_CONNECTION_STATE", connectionState: ConnectionState }
  | { type: "LOGOUT_USER_ID" };

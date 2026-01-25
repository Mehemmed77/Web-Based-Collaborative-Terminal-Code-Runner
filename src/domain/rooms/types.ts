import { ClientSocket } from "@/shared/state/socket.ts";

export interface ActiveRoom {
  roomId: string;
  ownerUserId: string;
  clients: Map<string, ClientSocket>;
}

export interface ClientSessionState {
  hasJoinedRoom: boolean;
  userId: string | null;
  roomId: string | null;
  authInProgress: boolean;
}
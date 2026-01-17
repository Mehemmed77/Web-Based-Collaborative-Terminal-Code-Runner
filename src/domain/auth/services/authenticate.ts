import { ClientSocket } from "@/shared/state/socket.ts";
import reject from "./reject.ts";
import requireDb from "./validateSession.ts";
import { activeSockets } from "@/shared/state/activeSockets.ts";

export default async function authenticate(ws: ClientSocket, sessionId: string) {
  const clientSessionState = activeSockets.get(ws.id);

  if (clientSessionState != null && clientSessionState.userId !== null) return clientSessionState.userId;

  activeSockets.set(ws.id, {
    hasJoinedRoom: false,
    roomId: null,
    userId: null,
    authInProgress: true,
  });

  const userId = await requireDb(ws.id, sessionId);

  if (userId !== null) {
    activeSockets.set(ws.id, {
      roomId: null,
      userId: userId,
      hasJoinedRoom: false,
      authInProgress: false,
    });

    return userId;

  } else {
    reject(ws);
    return null;
  };
}

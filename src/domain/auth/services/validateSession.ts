import { activeSockets } from "@/shared/state/activeSockets.ts";
import findSession from "../repository/findSession.ts";
import refreshSession from "../repository/refreshSession.ts";

export default async function validateSession(clientId: string, sessionId: string) {
  if (activeSockets.get(clientId)?.hasJoinedRoom) return;
  const sessionRow = await findSession(sessionId);

  if (sessionRow === null || sessionRow.rowCount === 0) return null;

  const sessionEntry = sessionRow.rows[0];

  if (sessionEntry.expires_at < new Date()) return null;

  await refreshSession(sessionId);

  return sessionEntry.userId;
}

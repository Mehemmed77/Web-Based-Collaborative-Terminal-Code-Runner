import { ClientSessionState } from "./clientSession.ts";

export const activeSockets = new Map<string, ClientSessionState>();

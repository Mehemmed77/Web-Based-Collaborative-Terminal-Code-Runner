import validateSession from "@/domain/auth/services/validateSession.ts";
import { Request, Response, NextFunction } from "express";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.headers["x-session-id"];
  
  if (!sessionId || typeof sessionId !== "string") {
    return res.sendStatus(401);
  }
  
  const userId = await validateSession(sessionId);

  if (!userId) {
    return res.sendStatus(401);
  }

  req.userId = userId;
  next();
}
import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.ts";

const router = Router();

router.get("/", requireAuth, (_req, res) => {
  res.json([]);
});

router.post("/", requireAuth, (_req, res) => {
  res.status(201).json({ roomId: "abc" });
});

export default router;
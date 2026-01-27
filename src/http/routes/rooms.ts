import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.ts";
import createRoom from "@/domain/rooms/services/createRoom.ts";
import findRoom from "@/domain/rooms/services/findRoom.ts";
import { latestVals } from "@/shared/state/latestVals.ts";

const router = Router();

router.get("/:roomId", requireAuth, async (req, res) => {
  const roomId = req.params.roomId as string;
  const ownerId = await findRoom(roomId);

  if (!ownerId) {
    return res.status(404);
  }

  const latestVal = latestVals.get(roomId) ?? "";

  res.status(200).json({isOwner: req.userId === ownerId });
});

router.post("/createRoom", requireAuth, (req, res) => {
  const context = req.body;

  createRoom(context);

  res.status(200);
  res.send({});
});

export default router;

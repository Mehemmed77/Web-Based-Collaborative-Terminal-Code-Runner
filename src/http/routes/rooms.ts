import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.ts";
import createRoom from "@/domain/rooms/services/createRoom.ts";
import findRoom from "@/domain/rooms/services/findRoom.ts";

const router = Router();

router.get("/:roomId", requireAuth, (req, res) => {
  const roomId = req.params.roomId as string;

  const roomExistence = findRoom(roomId);

  roomExistence.then(val => {
    if (val === "NOT_FOUND") {
      res.status(404);
      res.send(val);
    }

    else {
      res.status(200);
      res.send(val);
    }
  });

});

router.post("/createRoom", requireAuth, (req, res) => {
  const context = req.body;

  createRoom(context);

  res.status(200);
  res.send({});
});



export default router;
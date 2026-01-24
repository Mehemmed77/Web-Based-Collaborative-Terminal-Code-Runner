import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.ts";
import createRoom from "@/domain/rooms/services/createRoom.ts";
import findRoom from "@/domain/rooms/services/findRoom.ts";

const router = Router();

router.get("/:roomId", requireAuth, (req, res) => {
  console.log(req.userId);
  const roomId = req.params.roomId as string;

  const roomOwner = findRoom(roomId);

  roomOwner.then(ownerId => {
    if (ownerId === null) {
      res.status(404);
      res.send();
    }

    else {
      const data = req.userId !== ownerId ? {} : {
        ownerId: ownerId
      }

      res.status(200);
      res.send(JSON.stringify(data));
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
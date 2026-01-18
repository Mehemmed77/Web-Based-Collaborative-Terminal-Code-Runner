import { Router } from "express";

const router = Router();

router.post("/register", (_req, res) => {
  // no logic yet
  res.status(201).json({ message: "register route" });
});

router.post("/login", (_req, res) => {
  // no logic yet
  res.status(200).json({ message: "login route" });
});

export default router;
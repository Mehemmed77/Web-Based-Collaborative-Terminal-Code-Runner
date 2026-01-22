import login from "@/domain/auth/services/login.ts";
import register from "@/domain/auth/services/register.ts";
import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.ts";

const router = Router();

router.get("/me", requireAuth, (req, res) => {
  res.status(200).json({
    userId: req.userId
  })
})

router.post("/register", async (req, res) => {
  const context = await register(req.body);
  res.status(201).json(context);
});

router.post("/login", async (req, res) => {
  const context = await login(req.body);
  res.status(200).json(context);
});

export default router;

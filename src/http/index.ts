import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.ts";

export function createHttpServer() {
  const app = express();

  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))

  app.use(express.json());

  app.use("/auth", authRoutes);

  return app;
}
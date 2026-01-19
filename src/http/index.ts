import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.ts";
import roomRoutes from "./routes/rooms.ts";

export function createHttpServer() {
  const app = express();

  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))

  app.use(express.json());

  app.use("/auth", authRoutes);
  app.use("/", roomRoutes);

  return app;
}
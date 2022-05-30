import express from "express";
import cors from "cors";
import morgan from "morgan";
import morganConfigWithLogger from "./morgan";
import { Routes } from "../api";

export function createServer() {
  const app = express();

  app.use([
    cors(),
    morgan(morganConfigWithLogger as any),
    express.json(),
  ]);

  app.get("/", (req, res) => res.send("Hello from API Server."));
  app.use("/api/v1", Routes());

  return app;
}
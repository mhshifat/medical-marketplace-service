import express from "express";
import cors from "cors";
import morgan from "morgan";
import morganConfigWithLogger from "./morgan";

export function createServer() {
  const app = express();

  app.use([
    cors(),
    morgan(morganConfigWithLogger as any),
    express.json(),
  ]);

  app.get("/", (req, res) => res.send("Hello from API Server."));

  return app;
}
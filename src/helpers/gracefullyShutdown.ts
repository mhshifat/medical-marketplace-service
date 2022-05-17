import { Server } from "http";
import { logger } from '../lib';
import { sequelize } from "../loaders/sequelize";

export default function gracefullyShutdown(signal: string, server: Server) {
  return process.on(signal, () => {
    sequelize.close();
    logger.info("✔ Closed database connection.");
    server.close();
    logger.info("✔ Closed server connection.");
    process.exit(0);
  })
}
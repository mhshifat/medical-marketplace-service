import "dotenv/config";
import { logger } from "./lib";
import Loaders from "./loaders";

const { HOST, PORT, NODE_ENV, PROTOCOL } = process.env;
Loaders.load().then(() => logger.info(`🚀 The server is running on ${PROTOCOL}://${HOST}:${PORT} on ${NODE_ENV} mode.`));
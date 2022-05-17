import { logger } from '../lib';
import { createServer } from './express';
import { gracefullyShutdown } from './../helpers';
import connectDB from './sequelize';
import { Sequelize } from 'sequelize';

export default (function Loaders() {
  return {
    async load() {
      return Promise.all([
        await loadDatabaseConnection(),
        await loadExpress(),
      ])
    }
  }
})()

const { PORT } = process.env;
async function loadExpress() {
  const server = createServer();
  const serverConn = server.listen(PORT);
  logger.info("📦 ExpressJS is running...");
  const SIGNALS = ["SIGINT", "SIGTERM"];
  SIGNALS.forEach(signal => gracefullyShutdown(signal, serverConn))
  return serverConn;
}
async function loadDatabaseConnection() {
  const db = connectDB()
  logger.info("📦 Database connected...");
  return db;
}
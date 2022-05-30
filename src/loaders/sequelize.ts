import { Sequelize, Model, DataTypes } from 'sequelize'
import { logger } from '../lib';

const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
} = process.env;
export const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASS, {
  host: DB_HOST,
  port: +DB_PORT!,
  dialect: 'postgres',
  logging: false
});

export default async function connectDB() {
  try {
    return await sequelize.sync({ force: true, logging: false });
  } catch (err: any) {
    logger.error("Database connection failed.", {
      stack: err,
      message: err?.message,
      db_info: {
        user: DB_USER,
        host: DB_HOST,
        name: DB_NAME,
        pass: DB_PASS,
        port: DB_PORT,
      }
    });
    process.exit();
  }
}
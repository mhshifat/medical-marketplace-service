import winston from "winston";
import path from "path";

const { format, transports } = winston
const logFormat = format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)
const appendZero = (str: string) => str.length === 1 ? `0${str}` : str;

const date = new Date();
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
  format: format.combine(
    format.label({ label: path.basename(process?.mainModule?.filename || "") }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // Format the metadata object
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        logFormat
      )
    }),
    new transports.File({
      filename: `logs/${appendZero(date.getDay() + "")}-${appendZero(date.getMonth() + 1 + "")}-${date.getFullYear()}.log`,
      format: format.combine(
        // Render in one line in your log file.
        // If you use prettyPrint() here it will be really
        // difficult to exploit your logs files afterwards.
        format.json()
      )
    })
  ],
  exitOnError: false
})

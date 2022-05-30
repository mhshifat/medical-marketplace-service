import { Request, Response } from "express";
import { TokenIndexer } from "morgan";
import { logger } from "../lib";
import { LogTypes } from "../utils";

export default function morganConfigWithLogger(tokens: TokenIndexer<Request, Response>, req: Request, res: Response) {
  const authorizationHeader = req.headers['authorization'];
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.get('User-Agent');
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  logger.info(`📍 ${[
    tokens.method(req, res),
    "-",
    ip,
    "-",
    tokens.url(req, res),
    "-",
    tokens.status(req, res),
    "-",
    tokens.res(req, res, 'content-length'), 
    userAgent,
    '-',
    tokens['response-time'](req, res), 
    'ms',
  ].join(' ')}`, { type: LogTypes.Network, authorizationHeader, requestUrl: fullUrl })
}
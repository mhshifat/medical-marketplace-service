import { response, Response } from "express";
import { logger } from "../lib";
import { LogTypes, ResponsesOptions } from "./types";

export function SuccessResponses<TData>(res: Response, data: TData, options?: ResponsesOptions) {
  if (options?.log) logger.info(options.log, {
    type: LogTypes.System
  });
  return res.status(options?.statusCode || 200).json({
    success: true,
    result: data
  });
}

export function FailureResponses<TError extends Error>(res: Response, err: TError, options?: ResponsesOptions) {
  if (err) logger.error("Error detected!", {
    stack: err,
    type: LogTypes.System
  });
  return res.status(options?.statusCode || 500).json({
    success: false,
    msg: err?.message,
    ...options?.errors?.length ? { errors: options.errors } : {}
  });
}
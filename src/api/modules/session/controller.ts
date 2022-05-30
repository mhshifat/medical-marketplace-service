import { Request, Response } from "express";
import { CustomRequest, SessionBody, SessionDocument, SuccessResponses } from "../../../utils";
import { SessionService } from "./service";

export const SessionController = {
  async get(req: CustomRequest, res: Response) {
    const { id } = req.params;
    if (!id) {
      const sessions = await SessionService.findAll({});
      return SuccessResponses(res, sessions, {
        log: `[SYSTEM] => ${req.user?.display_name || "unknown"} accessed all sessions.`
      });
    }
    const session = await SessionService.findById(id);
    return SuccessResponses(res, session, {
      log: `[SYSTEM] => ${req.user?.display_name || "unknown"} accessed session id ${id}.`
    });
  },
  async post(req: CustomRequest, res: Response) {
    const newSession = await SessionService.create(req.body as SessionBody);
    return SuccessResponses(res, newSession, {
      statusCode: 201,
      log: `[SYSTEM] => Created a new session by ${req.user?.display_name || "unknown"}.`
    });
  },
  async update(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const newSession = await SessionService.update({ where: { id } }, req.body as SessionBody);
    return SuccessResponses(res, newSession, {
      log: `[SYSTEM] => Updated session for ${id} by ${req.user?.display_name || "unknown"}.`
    });
  },
  async delete(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const deletedSession = await SessionService.delete(id);
    return SuccessResponses(res, deletedSession, {
      log: `[SYSTEM] => Deleted session for ${id} by ${req.user?.display_name || "unknown"}.`
    });
  },
};
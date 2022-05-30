import { Router } from "express";
import { asyncCatchHandler } from "../../../utils";
import { validateRequest } from "../../middlewares";
import { SessionController } from "./controller";
import { sessionBodyValidation, sessionPatchBodyValidation } from "./validations";

export const SessionRouter = Router();

SessionRouter.route("/")
  .get(asyncCatchHandler(SessionController.get))
  .post([validateRequest(sessionBodyValidation)], asyncCatchHandler(SessionController.post));

SessionRouter.route("/:id")
  .get(asyncCatchHandler(SessionController.get))
  .patch([validateRequest(sessionPatchBodyValidation)], asyncCatchHandler(SessionController.update))
  .delete(asyncCatchHandler(SessionController.delete));
import { Router } from "express";
import { asyncCatchHandler } from "../../../utils";
import { validateRequest } from "../../middlewares";
import { AuthController } from "./controller";
import { authBodyValidation, authPatchBodyValidation, authRegisterBodyValidation } from "./validations";

export const AuthRouter = Router();

AuthRouter.route("/")
  .get(asyncCatchHandler(AuthController.get))
  .post([validateRequest(authBodyValidation)], asyncCatchHandler(AuthController.post));

AuthRouter.route("/register")
  .post([validateRequest(authRegisterBodyValidation)], asyncCatchHandler(AuthController.register));

AuthRouter.route("/:id")
  .get(asyncCatchHandler(AuthController.get))
  .patch([validateRequest(authPatchBodyValidation)], asyncCatchHandler(AuthController.update))
  .delete(asyncCatchHandler(AuthController.delete));
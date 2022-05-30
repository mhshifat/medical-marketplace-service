import { Router } from "express";
import { asyncCatchHandler } from "../../../utils";
import { validateRequest } from "../../middlewares";
import { ProfileController } from "./controller";
import { profilePatchBodyValidation, profileBodyValidation } from "./validations";

export const ProfileRouter = Router();

ProfileRouter.route("/")
  .get(asyncCatchHandler(ProfileController.get))
  .post([validateRequest(profileBodyValidation)], asyncCatchHandler(ProfileController.post));

ProfileRouter.route("/:id")
  .get(asyncCatchHandler(ProfileController.get))
  .patch([validateRequest(profilePatchBodyValidation)], asyncCatchHandler(ProfileController.update))
  .delete(asyncCatchHandler(ProfileController.delete));
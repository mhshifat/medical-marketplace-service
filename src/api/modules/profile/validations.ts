import Joi from "joi";
import { ProfileBody, ProfileDocument, SessionDocument } from "../../../utils";

export const profileBodyValidation = Joi.object<ProfileBody>({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  display_name: Joi.string().required(),
  avatar: Joi.string().required(),
})

export const profilePatchBodyValidation = Joi.object<Partial<ProfileDocument>>({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  display_name: Joi.string().required(),
  avatar: Joi.string().required(),
  is_deleted: Joi.string().required(),
})
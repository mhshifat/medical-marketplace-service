import Joi from "joi";
import { SessionBody, SessionDocument } from "../../../utils";

export const sessionBodyValidation = Joi.object<SessionBody>({
  ip_address: Joi.string().required(),
  user_agent: Joi.string().required(),
})

export const sessionPatchBodyValidation = Joi.object<Partial<SessionDocument>>({
  login_time: Joi.string().required(),
  ip_address: Joi.string().required(),
  user_agent: Joi.string().required(),
  is_deleted: Joi.string().required(),
})
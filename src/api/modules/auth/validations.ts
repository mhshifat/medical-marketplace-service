import Joi from "joi";
import { AuthBody, AuthDocument, ProfileDocument, RegisterBody } from "../../../utils";

export const authBodyValidation = Joi.object<AuthBody>({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export const authPatchBodyValidation = Joi.object<Partial<AuthDocument>>({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export const authRegisterBodyValidation = Joi.object<RegisterBody>({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  display_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  avatar: Joi.string().required(),
})
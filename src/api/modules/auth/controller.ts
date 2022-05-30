import { Request, Response } from "express";
import { AuthBody, CustomRequest, DataFormatter, ProfileBody, RegisterBody, SessionBody, SessionDocument, SuccessResponses } from "../../../utils";
import { AuthService } from './service';

export const AuthController = {
  async get(req: CustomRequest, res: Response) {
    const { id } = req.params;
    if (!id) {
      const users = await AuthService.findAll({});
      return SuccessResponses(res, users, {
        log: `[SYSTEM] => ${req.user?.display_name || "unknown"} accessed all users.`
      });
    }
    const user = await AuthService.findById(id);
    return SuccessResponses(res, user, {
      log: `[SYSTEM] => ${req.user?.display_name || "unknown"} accessed user id ${id}.`
    });
  },
  async post(req: CustomRequest, res: Response) {
    const newUser = await AuthService.create(req.body as AuthBody);
    return SuccessResponses(res, newUser, {
      statusCode: 201,
      log: `[SYSTEM] => Created a new user by ${req.user?.display_name || "unknown"}.`
    });
  },
  async update(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const newUser = await AuthService.update({ where: { id } }, req.body as AuthBody);
    return SuccessResponses(res, newUser, {
      log: `[SYSTEM] => Updated user for ${id} by ${req.user?.display_name || "unknown"}.`
    });
  },
  async delete(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const deletedUser = await AuthService.delete(id);
    return SuccessResponses(res, deletedUser, {
      log: `[SYSTEM] => Deleted user for ${id} by ${req.user?.display_name || "unknown"}.`
    });
  },
  async register(req: CustomRequest, res: Response) {
    const newUser = await AuthService.register(req.body as RegisterBody);
    return SuccessResponses(res, DataFormatter(newUser).format("user"), {
      statusCode: 201,
      log: `[SYSTEM] => Created a new user for ${req.body?.display_name || "unknown"}.`
    });
  },
};
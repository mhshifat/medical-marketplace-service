import { Request, Response } from "express";
import { CustomRequest, ProfileBody, SessionBody, SessionDocument, SuccessResponses } from "../../../utils";
import { ProfileService } from './service';

export const ProfileController = {
  async get(req: CustomRequest, res: Response) {
    const { id } = req.params;
    if (!id) {
      const profiles = await ProfileService.findAll({});
      return SuccessResponses(res, profiles, {
        log: `[SYSTEM] => ${req.user?.display_name || "unknown"} accessed all profiles.`
      });
    }
    const profile = await ProfileService.findById(id);
    return SuccessResponses(res, profile, {
      log: `[SYSTEM] => ${req.user?.display_name || "unknown"} accessed profile id ${id}.`
    });
  },
  async post(req: CustomRequest, res: Response) {
    const newProfile = await ProfileService.create(req.body as ProfileBody);
    return SuccessResponses(res, newProfile, {
      statusCode: 201,
      log: `[SYSTEM] => Created a new profile by ${req.user?.display_name || "unknown"}.`
    });
  },
  async update(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const newProfile = await ProfileService.update({ where: { id } }, req.body as ProfileBody);
    return SuccessResponses(res, newProfile, {
      log: `[SYSTEM] => Updated profile for ${id} by ${req.user?.display_name || "unknown"}.`
    });
  },
  async delete(req: CustomRequest, res: Response) {
    const { id } = req.params;
    const deletedProfile = await ProfileService.delete(id);
    return SuccessResponses(res, deletedProfile, {
      log: `[SYSTEM] => Deleted profile for ${id} by ${req.user?.display_name || "unknown"}.`
    });
  },
};
import { FindOptions } from 'sequelize';
import { hashPassword } from '../../../lib';
import { AuthBody, AuthDocument, RegisterBody } from '../../../utils';
import { ProfileModel } from '../profile/model';
import { ProfileService } from '../profile/service';
import { SessionModel } from '../session/model';
import { AuthModel } from './model';

export const AuthService = {
  async findAll(query: FindOptions<AuthDocument>) {
    const docs = await AuthModel.findAll({
      ...query, where: { is_deleted: false, ...query.where }, include: [
        { model: ProfileModel, as: "profiles" }
      ]
    });
    return docs;
  },
  async findWithoutError(query: FindOptions<AuthDocument>) {
    const doc = await AuthModel.findOne({ ...query, where: { is_deleted: false, ...query.where } });
    return doc;
  },
  async findById(id: AuthDocument["id"]) {
    const doc = await AuthModel.findOne({ where: { id, is_deleted: false } });
    if (!doc) throw new Error("404:-User not found");
    return doc;
  },
  async findByWhere(query: FindOptions<AuthDocument>) {
    const doc = await AuthModel.findOne({ ...query, where: { is_deleted: false, ...query.where } });
    if (!doc) throw new Error("404:-User not found");
    return doc;
  },
  async create(body: AuthBody) {
    const doc = await AuthModel.create(body);
    return doc;
  },
  async update(where: FindOptions<AuthDocument>, body: Partial<AuthDocument>) {
    const doc = await AuthService.findByWhere(where);
    doc.set(body);
    return await doc.save();
  },
  async delete(id: AuthDocument["id"]) {
    const doc = await AuthService.update({ where: { id } }, { is_deleted: true });
    return doc;
  },
  async register(body: RegisterBody) {
    const { email, password, ...restProps } = body;
    const isUserExist = await AuthService.findWithoutError({ where: { email } });
    if (isUserExist) throw new Error("400:-User already exist.");
    const hashedPwd = await hashPassword(password);
    const newUser = await AuthService.create({ email, password: hashedPwd });
    const newProfile = await ProfileService.create({ ...restProps, auth_id: (newUser as any).dataValues.id });
    delete (newProfile as any).dataValues.id;
    return { ...(newUser as any).dataValues, ...(newProfile as any).dataValues };
  },
}

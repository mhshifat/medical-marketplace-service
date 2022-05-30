import { FindOptions } from 'sequelize';
import { ProfileBody, ProfileDocument } from '../../../utils';
import { ProfileModel } from './model';

export const ProfileService = {
  async findAll(query: FindOptions<ProfileDocument>) {
    const docs = await ProfileModel.findAll({ ...query, where: { is_deleted: false, ...query.where } });
    return docs;
  },
  async findById(id: ProfileDocument["id"]) {
    const doc = await ProfileModel.findOne({ where: { id, is_deleted: false } });
    if (!doc) throw new Error("404:-Profile not found");
    return doc;
  },
  async findByWhere(query: FindOptions<ProfileDocument>) {
    const doc = await ProfileModel.findOne({ ...query, where: { is_deleted: false, ...query.where } });
    if (!doc) throw new Error("404:-Profile not found");
    return doc;
  },
  async create(body: ProfileBody) {
    const doc = await ProfileModel.create(body);
    return doc;
  },
  async update(where: FindOptions<ProfileDocument>, body: Partial<ProfileDocument>) {
    const doc = await ProfileService.findByWhere(where);
    doc.set(body);
    return await doc.save();
  },
  async delete(id: ProfileDocument["id"]) {
    const doc = await ProfileService.update({ where: { id } }, { is_deleted: true });
    return doc;
  },
}
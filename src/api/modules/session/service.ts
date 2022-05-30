import { FindOptions } from 'sequelize';
import { SessionBody, SessionDocument } from '../../../utils';
import { SessionModel } from './model';

export const SessionService = {
  async findAll(query: FindOptions<SessionDocument>) {
    const docs = await SessionModel.findAll({ ...query, where: { is_deleted: false, ...query.where } });
    return docs;
  },
  async findById(id: SessionDocument["id"]) {
    const doc = await SessionModel.findOne({ where: { id, is_deleted: false } });
    if (!doc) throw new Error("404:-Session not found");
    return doc;
  },
  async findByWhere(query: FindOptions<SessionDocument>) {
    const doc = await SessionModel.findOne({ ...query, where: { is_deleted: false, ...query.where } });
    if (!doc) throw new Error("404:-Session not found");
    return doc;
  },
  async create(body: SessionBody) {
    const doc = await SessionModel.create(body);
    return doc;
  },
  async update(where: FindOptions<SessionDocument>, body: Partial<SessionDocument>) {
    const doc = await SessionService.findByWhere(where);
    doc.set(body);
    return await doc.save();
  },
  async delete(id: SessionDocument["id"]) {
    const doc = await SessionService.update({ where: { id } }, { is_deleted: true });
    return doc;
  },
}
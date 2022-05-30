import { Sequelize, DataTypes, Model } from "sequelize";
import { SessionDocument } from "../../../utils";
import { AuthModel } from "../auth/model";
import { ProfileModel } from "../profile/model";
import { sequelize } from './../../../loaders/sequelize';

export const SessionModel = sequelize.define<Model<SessionDocument>>('Session', {
  login_time: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
    allowNull: false
  },
  user_agent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ip_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
}, {});
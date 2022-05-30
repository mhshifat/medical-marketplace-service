import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from '../../../loaders/sequelize';
import { AuthDocument, AuthDocumentTypeEnum } from "../../../utils";
import { ProfileModel } from "../profile/model";
import { SessionModel } from "../session/model";

export const AuthModel = sequelize.define<Model<AuthDocument>>('Auth', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM(...Object.values(AuthDocumentTypeEnum)),
    defaultValue: AuthDocumentTypeEnum.Email,
    allowNull: false
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
});

AuthModel.hasMany(ProfileModel, { as: 'profiles', foreignKey: 'auth_id' })
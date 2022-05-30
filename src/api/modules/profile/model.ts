import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from '../../../loaders/sequelize';
import { ProfileDocument } from "../../../utils";
import { AuthModel } from "../auth/model";
import { SessionModel } from "../session/model";

export const ProfileModel = sequelize.define<Model<ProfileDocument>>('Profile', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  display_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
}, {});

// ProfileModel.belongsTo(AuthModel, { foreignKey: 'authId' });

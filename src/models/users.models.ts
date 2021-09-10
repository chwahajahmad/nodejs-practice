import { DataTypes } from 'sequelize';
import db from '../db.conn';

export const users = db.define(
  'users',
  {
    // Model attributes are defined here
    slack_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fiqah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channel_id: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  },
);
export const findOneUser = (id: string) => {
  if (!id) throw new Error('ID Missing'); //Validation
  return users.findOne({
    where: {
      slack_id: id,
    },
  });
};

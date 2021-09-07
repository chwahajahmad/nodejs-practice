export {};
const { DataTypes } = require('sequelize');
const db = require('../db.conn');

const users = db.define(
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
const findOneUser = (id: string) => {
  if (!id) throw new Error('ID Missing'); //Validation
  return users.findOne({
    where: {
      slack_id: id,
    },
  });
};
module.exports = { users, findOneUser };

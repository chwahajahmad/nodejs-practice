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
// user
//   .sync()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
module.exports = users;

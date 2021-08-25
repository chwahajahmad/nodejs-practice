const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db.conn');

const user = db.define(
  'user',
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
    fiqa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.JSONB,
      allowNull: false,
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
module.exports = user;

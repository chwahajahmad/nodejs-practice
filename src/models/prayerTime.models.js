const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db.config');

const weekly_prayer_data = db.define(
  'weekly_prayer_data',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);
weekly_prayer_data.sync().catch((err) => console.log(err));
module.exports = weekly_prayer_data;

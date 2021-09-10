import Sequelize, { DataTypes } from 'sequelize';
import db from '../db.conn';

export const weekly_prayer_data = db.define(
  'weekly_prayer_data',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fiqah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);

export const findPrayerTimeByCityAndFiqah = (city: string, fiqah: string) => {
  return weekly_prayer_data.findAll({
    where: {
      city: city.toLowerCase(),
      fiqah: fiqah.toLowerCase(),
    },
  });
};

export const findPrayerTime = () => {
  return weekly_prayer_data.findAll();
};

export const deleteAllPrayerTimes = () => {
  return weekly_prayer_data.destroy({ truncate: true });
};

export const addPrayerTime = (weeklyData: {
  city: string;
  fiqah: string;
  data: any;
}) => {
  if (!weeklyData.city || !weeklyData.fiqah || !weeklyData.data)
    throw new Error('No Data To Add');
  const newPrayerTime = new weekly_prayer_data(weeklyData);
  return newPrayerTime.save();
};

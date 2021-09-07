"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db.conn');
const weekly_prayer_data = db.define('weekly_prayer_data', {
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
}, {
    freezeTableName: true,
});
const findPrayerTimeByCityAndFiqah = (city, fiqah) => {
    return weekly_prayer_data.findAll({
        where: {
            city: city.toLowerCase(),
            fiqah: fiqah.toLowerCase(),
        },
    });
};
const findPrayerTime = () => {
    return weekly_prayer_data.findAll();
};
const deleteAllPrayerTimes = () => {
    return weekly_prayer_data.destroy({ truncate: true });
};
const addPrayerTime = (weeklyData) => {
    if (!weeklyData.city || !weeklyData.fiqah || !weeklyData.data)
        throw new Error('No Data To Add');
    const newPrayerTime = new weekly_prayer_data(weeklyData);
    return newPrayerTime.save();
};
module.exports = {
    findPrayerTime,
    findPrayerTimeByCityAndFiqah,
    deleteAllPrayerTimes,
    addPrayerTime,
    weekly_prayer_data,
};

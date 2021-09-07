"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user = require('../models/users.models');
const prayerTime = require('../models/prayerTime.models');
const findOneUser = (id) => {
    if (!id)
        throw new Error('ID Missing'); //Validation
    return user.findOne({
        where: {
            slack_id: id,
        },
    });
};
const findPrayerTimeByCityAndFiqah = (city, fiqah) => {
    return prayerTime.findAll({
        where: {
            city: city.toLowerCase(),
            fiqah: fiqah.toLowerCase(),
        },
    });
};
const findPrayerTime = () => {
    return prayerTime.findAll();
};
const deleteAllPrayerTimes = () => {
    return prayerTime.destroy({ truncate: true });
};
const addPrayerTime = (weeklyData) => {
    if (!weeklyData.city || !weeklyData.fiqah || !weeklyData.data)
        throw new Error('No Data To Add');
    const newPrayerTime = new prayerTime(weeklyData);
    return newPrayerTime.save();
};
module.exports = {
    findPrayerTime,
    findPrayerTimeByCityAndFiqah,
    deleteAllPrayerTimes,
    addPrayerTime,
    findOneUser,
};

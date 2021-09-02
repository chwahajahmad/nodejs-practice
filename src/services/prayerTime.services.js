const prayerTime = require('../models/prayerTime.models');

const addPrayerTime = (weeklyData) => {
  if (!weeklyData.city || !weeklyData.fiqah || !weeklyData.data)
    throw new Error('No Data To Add');
  const newPrayerTime = new prayerTime(weeklyData);
  return newPrayerTime.save();
};
module.exports = { addPrayerTime };

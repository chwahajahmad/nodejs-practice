const prayerTime = require('../models/prayerTime.models');

const findPrayerTimeByCityAndFiqah = (city: string, fiqah: string) => {
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

const deleteAll = () => {
  return prayerTime.destroy({ truncate: true });
};

const addPrayerTime = (weeklyData: {
  city: string;
  fiqah: string;
  data: any;
}) => {
  if (!weeklyData.city || !weeklyData.fiqah || !weeklyData.data)
    throw new Error('No Data To Add');
  const newPrayerTime = new prayerTime(weeklyData);
  return newPrayerTime.save();
};

module.exports = {
  findPrayerTime,
  findPrayerTimeByCityAndFiqah,
  deleteAll,
  addPrayerTime,
};

const prayerTime = require('../models/prayerTime.models');

const addPrayerTime = (req) => {
  const time = req.body;
  const newPrayerTime = new prayerTime(time);
  return newPrayerTime.save();
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

const deleteAll = () => {
  return prayerTime.destroy({ truncate: true });
};

module.exports = {
  addPrayerTime,
  findPrayerTime,
  findPrayerTimeByCityAndFiqah,
  deleteAll,
};

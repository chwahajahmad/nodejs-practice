const prayerTime = require('../models/prayerTime.models');

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
  findPrayerTime,
  findPrayerTimeByCityAndFiqah,
  deleteAll,
};

const prayerTime = require('../models/prayerTime.models');

const addPrayerTime = (req) => {
  const time = req.body;
  const newPrayerTime = new prayerTime(time);
  return newPrayerTime.save();
};
// Controllers should contain a (req, res, next)
// if one is unused prefix with _ but should not be removed. 
// e.g: (req, res, _next)
const findPrayerTimeByCityAndFiqah = (city, fiqah) => {

  // Always add some sort of req.body validation for user
  return prayerTime.findAll({
    where: {
      city: city.toLowerCase(),
      fiqah: fiqah.toLowerCase(),
    },
  });
  // Return a response. 
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

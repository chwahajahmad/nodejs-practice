const prayerTime = require('../models/prayerTime.models');

const addPrayerTime = (req, res = null) => {
  const time = req.body;

  const newPrayerTime = new prayerTime(time);
  newPrayerTime
    .save()
    .then((data) => {
      if (res) res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const findPrayerTimeByCityAndFiqah = async (city, fiqah) => {
  console.log('Here:', city, fiqah);
  return await prayerTime
    .findAll({
      where: {
        city: city.toLowerCase(),
        fiqah: fiqah.toLowerCase(),
      },
    })
    .catch((err) => {
      throw Error(err);
    });
};

const findPrayerTime = async () => {
  return await prayerTime.findAll().catch((error) => {
    throw Error(error);
  });
};

const deleteAll = (req = null, res = null) => {
  prayerTime
    .destroy({ truncate: true })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

module.exports = {
  addPrayerTime,
  findPrayerTime,
  findPrayerTimeByCityAndFiqah,
  deleteAll,
};

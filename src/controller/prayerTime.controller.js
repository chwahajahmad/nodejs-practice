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
  const data = await prayerTime
    .findAll({
      where: {
        city,
        fiqah,
      },
    })
    .catch((err) => {
      throw Error(err);
    });
  return data;
};

const findPrayerTime = () => {
  prayerTime
    .findAll()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteAll = (req = null, res = null) => {
  prayerTime
    .destroy({ truncate: true })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
const prayerTimesController = {
  addPrayerTime,
  findPrayerTime,
  findPrayerTimeByCityAndFiqah,
  deleteAll,
};

module.exports = prayerTimesController;

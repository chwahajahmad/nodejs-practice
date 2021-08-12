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

const findPrayerTimeById = (req, res) => {
  prayerTime
    .findByPk(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const findPrayerTime = (req, res) => {
  prayerTime
    .findAll()
    .then((data) => {
      console.log(data);
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
  findPrayerTimeById,
  deleteAll,
};

module.exports = prayerTimesController;

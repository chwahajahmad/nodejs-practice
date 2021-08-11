const prayerDao = require('../DAOs/prayerTime.dao');

const addPrayerTime = (req, res = null) => {
  const prayerTime = req.body;
  prayerDao
    .create(prayerTime)
    .then((data) => {
      if (res) res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const findPrayerTimeById = (req, res) => {
  prayerDao
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteById = (req, res) => {
  prayerDao
    .deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Prayer Times deleted successfully',
        prayerTimes: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const updatePrayerTime = (req, res) => {
  prayerDao
    .updateGig(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Gig updated successfully',
        prayerTimes: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const findPrayerTime = (req, res) => {
  prayerDao
    .findAll()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteAll = (req = null, res = null) => {
  prayerDao
    .deleteAll()
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
const prayerTimesController = {
  addPrayerTime,
  findPrayerTime,
  findPrayerTimeById,
  updatePrayerTime,
  deleteById,
  deleteAll,
};

module.exports = prayerTimesController;

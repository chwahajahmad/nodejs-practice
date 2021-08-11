const prayerTime = require('../models/prayerTime.models');

const findAll = () => prayerTime.findAll();

const findById = (id) => prayerTime.findByPk(id);

const deleteById = (id) => prayerTime.destroy({ where: { id: id } });

const deleteAll = () => prayerTime.destroy({ truncate: true });

const create = (prayerTimeData) => {
  const newPrayerTime = new prayerTime(prayerTimeData);
  return newPrayerTime.save();
};

const updatePrayerTime = (prayerTimeData, id) => {
  const updatePrayerTime = {
    data: prayerTimeData.data,
  };
  return prayerTime.update(updatePrayerTime, { where: { id: id } });
};

const prayerDAO = {
  findAll,
  create,
  findById,
  deleteById,
  updatePrayerTime,
  deleteAll,
};

module.exports = prayerDAO;

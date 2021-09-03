const axios = require('axios');
const {
  findPrayerTimeByCityAndFiqah,
  deleteAll,
  addPrayerTime,
} = require('../../utils/prayerTime.utils');
const apiEndPoint = 'https://api.pray.zone/v2/times/this_week.json?';
const user = require('../../models/users.models');

const getSaveDataForSingleUser = async (city, fiqah) => {
  if (!city || !fiqah) throw new Error('City or Fiqah is Missing');
  try {
    const res = await findPrayerTimeByCityAndFiqah(city, fiqah);
    if (res.length > 0) return;
  } catch (err) {
    throw new Error('Error fetching Prayer Times Data');
  }

  let school;
  fiqah.toLowerCase() === 'jafari' ? (school = 0) : (school = 1);

  const weeklyData = await axios.get(
    `${apiEndPoint}city=${city}&school=${school}`,
  );

  if (weeklyData.length <= 0) return;

  try {
    await addPrayerTime({
      city: city.toLowerCase(),
      fiqah: fiqah.toLowerCase(),
      data: weeklyData.data.results,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const getSaveData = async () => {
  const userData = await user.findAll();

  userData.forEach((data) => {
    const { city, fiqah } = data.dataValues;
    getSaveDataForSingleUser(city, fiqah);
  });
};

const deleteAllData = async () => {
  await deleteAll();
};

module.exports = { getSaveDataForSingleUser, deleteAllData, getSaveData };

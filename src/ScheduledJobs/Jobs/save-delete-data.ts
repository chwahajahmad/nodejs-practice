export {};
const axios = require('axios');
const {
  findPrayerTimeByCityAndFiqah,
  deleteAll,
  addPrayerTime,
} = require('../../utils/prayerTime.utils');
const apiEndPoint = 'https://api.pray.zone/v2/times/this_week.json?';
const user = require('../../models/users.models');
const { to } = require('await-to-js');
const getSaveDataForSingleUser = async (city: string, fiqah: string) => {
  if (!city || !fiqah) throw new Error('City or Fiqah is Missing');

  const [err, res] = await to(findPrayerTimeByCityAndFiqah(city, fiqah));
  if (res.length > 0) return;
  if (err) throw new Error('Error fetching Prayer Times Data');

  let school;
  fiqah.toLowerCase() === 'jafari' ? (school = 0) : (school = 1);

  const weeklyData = await axios.get(
    `${apiEndPoint}city=${city}&school=${school}`,
  );

  if (weeklyData.length <= 0) return;

  const [errAddingData] = await to(
    addPrayerTime({
      city: city.toLowerCase(),
      fiqah: fiqah.toLowerCase(),
      data: weeklyData.data.results,
    }),
  );
  if (errAddingData) throw new Error(err);
};

const getSaveData = async () => {
  const [err, userData] = await to(user.findAll());
  if (err) throw new Error('Error Fetching User Data');
  userData.forEach((data: any) => {
    const { city, fiqah } = data.dataValues;
    getSaveDataForSingleUser(city, fiqah);
  });
};

const deleteAllData = async () => {
  await deleteAll();
};

module.exports = { getSaveDataForSingleUser, deleteAllData, getSaveData };

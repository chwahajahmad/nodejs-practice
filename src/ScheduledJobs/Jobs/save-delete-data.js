const axios = require('axios');
const prayerTimeController = require('../../controller/prayerTime.controller');
const { findAllUsers } = require('../../controller/users.controller');
const apiEndPoint = 'https://api.pray.zone/v2/times/this_week.json?';

const getSaveDataForSingleUser = async (city, fiqah) => {
  const res = await prayerTimeController.findPrayerTimeByCityAndFiqah(
    city,
    fiqah,
  );
  if (res.length <= 0) {
    let school;
    fiqah.toLowerCase() === 'jafari' ? (school = 0) : (school = 1);
    const weeklyData = await axios.get(
      `${apiEndPoint}city=${city}&school=${school}`,
    );

    await prayerTimeController.addPrayerTime({
      body: {
        city: city.toLowerCase(),
        fiqah: fiqah.toLowerCase(),
        data: weeklyData.data.results,
      },
    });
  }
};

const getSaveData = async () => {
  const userData = await findAllUsers();

  userData.forEach((data) => {
    const { city, fiqah } = data.dataValues;
    getSaveDataForSingleUser(city, fiqah);
  });
};

const deleteAllData = async () => {
  await prayerTimeController.deleteAll();
};

module.exports = { getSaveDataForSingleUser, deleteAllData, getSaveData };

const axios = require('axios');
const prayerTimeController = require('../../controller/prayerTime.controller');
const apiEndPoint = 'https://api.pray.zone/v2/times/this_week.json?';
//dummy user data
const userData = [
  {
    id: 1,
    city: 'Lahore',
    fiqah: 'Hanafi',
    slackData: {
      name: 'Ahmad Wahaj',
      userId: 123,
    },
  },
  {
    id: 2,
    city: 'Lahore',
    fiqah: 'Jafari',
    slackData: {
      name: 'Abdullah Iqbal',
      userId: 124,
    },
  },
  {
    id: 3,
    city: 'Lahore',
    fiqah: 'Hanafi',
    slackData: {
      name: 'Irteza Iqbal',
      userId: 123,
    },
  },
  {
    id: 4,
    city: 'Sialkot',
    fiqah: 'Hanafi',
    slackData: {
      name: 'Irteza Iqbal',
      userId: 123,
    },
  },
];

const getSaveData = () => {
  userData.forEach((data) => {
    const { city, fiqah } = data;
    getSaveDataForSingleUser(city, fiqah);
  });
};

const getSaveDataForSingleUser = (city, fiqah) => {
  prayerTimeController.findPrayerTimeByCityAndFiqah(city, fiqah).then((res) => {
    if (res.length <= 0) {
      let school;
      fiqah === 'Jafri' ? (school = 0) : (school = 1);
      axios.get(`${apiEndPoint}city=${city}&school=${school}`).then((res) => {
        prayerTimeController.addPrayerTime({
          body: { city, fiqah, data: res.data.results },
        });
      });
    }
  });
};

const deleteAllData = () => {
  prayerTimeController.deleteAll();
};

module.exports = { getSaveData, deleteAllData };

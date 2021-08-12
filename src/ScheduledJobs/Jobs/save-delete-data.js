const axios = require('axios');
const prayerTimeController = require('../../controller/prayerTime.controller');
const { deleteAll } = require('../../DAOs/prayerTime.dao');
const apiEndPoint = 'https://api.pray.zone/v2/times/this_week.json?city=';

const getSaveData = (city = 'lahore') => {
  axios.get(`${apiEndPoint}${city}`).then((res) => {
    prayerTimeController.addPrayerTime({
      body: { city, fiqah: 'Hanfi', data: res.data.results },
    });
  });
};

const deleteAllData = () => {
  prayerTimeController.deleteAll();
};

module.exports = { getSaveData, deleteAllData };

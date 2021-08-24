const prayerTimeController = require('../../controller/prayerTime.controller');

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

const setReminderForAll = () => {
  userData.map((data) => {
    const { city, fiqah } = data;
    prayerTimeController
      .findPrayerTimeByCityAndFiqah(city, fiqah)
      .then((res) => {
        if (res.length <= 0) {
          throw Error('No Data Present Against Given City And Fiqah');
        } else {
          //   logic about setting reminder goes here
          //   console.log(res[0].dataValues.data.datetime[0]);
          //   console.log(res[0].dataValues.data.location.timezone);
        }
      });
  });
};
setReminderForAll();

module.exports = setReminderForAll;

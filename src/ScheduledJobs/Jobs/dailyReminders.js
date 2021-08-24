const prayerTimeController = require('../../controller/prayerTime.controller');
const postMessage = require('./postingMessage');
const dayjs = require('dayjs');

const userData = [
  {
    id: 1,
    city: 'Lahore',
    fiqah: 'Hanafi',
    slackData: {
      name: 'Ahmad Wahaj',
      userId: 'U02BXNRLBQD',
    },
  },
  {
    id: 2,
    city: 'Lahore',
    fiqah: 'Jafari',
    slackData: {
      name: 'Abdullah Iqbal',
      userId: 'C02BU1N3X8W',
    },
  },
  {
    id: 3,
    city: 'Lahore',
    fiqah: 'Hanafi',
    slackData: {
      name: 'Suraj Saxena',
      userId: 'C02BL20HUK1',
    },
  },
  {
    id: 4,
    city: 'Sialkot',
    fiqah: 'Hanafi',
    slackData: {
      name: 'Irteza Iqbal',
      userId: 'C02BXNRM7S9',
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
          const prayerTimes = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
          prayerTimes.map((namazName) => {
            // const day = new Date().getDay();
            // const message = `Its ${namazName} Time`;
            // const channel = data.slackData.userId;
            // const time =
            //   res[0].dataValues.data.datetime[day - 1].times[namazName];
            // const date = res[0].dataValues.data.datetime[day - 1].date.gregorian;
            // const timestamp = dayjs(`${date} ${time}`).unix();
            // postMessage(message, channel, timestamp);
          });
        }
      });
  });
};

setReminderForAll();

module.exports = setReminderForAll;

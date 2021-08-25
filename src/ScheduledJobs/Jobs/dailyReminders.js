const prayerTimeController = require('../../controller/prayerTime.controller');
const postMessage = require('./postingMessage');
const User = require('../../controller/users.controller');
const dayjs = require('dayjs');

const setReminderForAll = async () => {
  const userData = await User.findAllUsers();
  userData.forEach((data) => setReminder(data.dataValues));
};
const setReminder = async (data) => {
  const { city, fiqah } = data;
  console.log('reached here');
  const res = await prayerTimeController.findPrayerTimeByCityAndFiqah(
    city,
    fiqah,
  );

  if (res.length > 0) {
    const prayerTimes = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    prayerTimes.forEach((namazName) => {
      const day = new Date().getDay();
      const time = res[0].dataValues.data.datetime[day - 1].times[namazName];
      const date = res[0].dataValues.data.datetime[day - 1].date.gregorian;

      const message = `Its ${namazName} Time`;
      const channel = data.slack_id;

      const timeStamp = dayjs(`${date} ${time}`).unix();
      const timeStampNow = dayjs().unix();

      if (timeStampNow < timeStamp) postMessage(message, channel, timeStamp);
    });
  }
};

module.exports = { setReminder, setReminderForAll };

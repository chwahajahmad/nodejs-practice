const dayjs = require('dayjs');
const prayerTimeController = require('../../controller/prayerTime.controller');
const { postMessage } = require('./slackTasks');
const user = require('../../models/users.models');
const setReminder = async (data) => {
  const { city, fiqah } = data;
  if (!city || !fiqah) throw new Error('City or Fiqah Missing');

  const res = await prayerTimeController.findPrayerTimeByCityAndFiqah(
    city,
    fiqah,
  );

  if (res.length <= 0) return;

  const prayerTimes = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  prayerTimes.forEach((namazName) => {
    const day = new Date().getDay();
    const time = res[0].dataValues.data.datetime[day - 1].times[namazName];
    const date = res[0].dataValues.data.datetime[day - 1].date.gregorian;

    const message = `Its ${namazName} Time`;
    const channel = data.slack_id;

    const timeStamp = dayjs(`${date} ${time}`).unix();
    const timeStampNow = dayjs().unix();

    if (timeStampNow < timeStamp) {
      postMessage(message, channel, timeStamp);
    }
  });
};
const setReminderForAll = async () => {
  const userData = await user.findAllUsers();
  userData.forEach((data) => {
    setReminder(data.dataValues);
  });
};

module.exports = {
  setReminder,
  setReminderForAll,
};

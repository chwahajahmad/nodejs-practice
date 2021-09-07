export {};
const dayjs = require('dayjs');
const {
  findPrayerTimeByCityAndFiqah,
} = require('../../utils/prayerTime.utils');
const { postMessage } = require('../../services/slackTasks');
const user = require('../../models/users.models');
const { to } = require('await-to-js');
const setReminder = async (city: string, fiqah: string, channel: string) => {
  if (!city || !fiqah) throw new Error('City or Fiqah Missing');

  const res = await findPrayerTimeByCityAndFiqah(city, fiqah);

  if (res.length <= 0) return;

  const prayerTimes = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  prayerTimes.forEach((namazName) => {
    const day = new Date().getDay();
    const time = res[0].dataValues.data.datetime[day - 1].times[namazName];
    const date = res[0].dataValues.data.datetime[day - 1].date.gregorian;

    const message = `Its ${namazName} Time`;

    const timeStamp = dayjs(`${date} ${time}`).unix();
    const timeStampNow = dayjs().unix();

    if (timeStampNow < timeStamp) {
      try {
        postMessage(message, channel, timeStamp);
      } catch (err) {
        throw Error('Error Posting Alerts');
      }
    }
  });
};
const setReminderForAll = async () => {
  const [err, userData] = await to(user.findAll());
  if (err) throw Error(err);

  userData.forEach((data: any) => {
    const { city, fiqah, slack_id } = data.dataValues;
    setReminder(city, fiqah, slack_id);
  });
};
module.exports = {
  setReminder,
  setReminderForAll,
};

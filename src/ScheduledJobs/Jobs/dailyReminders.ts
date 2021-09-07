import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)


const {
  findPrayerTimeByCityAndFiqah,
} = require('../../models/prayerTime.models');
const { postMessage } = require('../../services/slackTasks');
const { users } = require('../../models/users.models');
const { to } = require('await-to-js');

const setReminder = async (city: string, fiqah: string, channel: string) => {
  if (!city || !fiqah) throw new Error('City or Fiqah Missing');
  const [err,res] = await to(findPrayerTimeByCityAndFiqah(city, fiqah));
  if(err) throw new Error('Error Finding Prayer Data');
  if (res.length <= 0) return;

  const prayerTimes = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  prayerTimes.forEach((namazName) => {
    const timezone = res[0].dataValues.data.location.timezone;
    const timeStampNow = dayjs().unix();
    const day = dayjs().day();
    const time = res[0].dataValues.data.datetime[day].times[namazName];
    const date = res[0].dataValues.data.datetime[day].date.gregorian;
    const message = `Its ${namazName} Time`;
    
    const timeStamp = dayjs.tz(`${date} ${time}`,timezone).unix();
    console.log("Server data:",dayjs().unix());
    console.log("came here", timeStamp,timeStampNow)
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
  const [err, userData] = await to(users.findAll());
  if (err) throw Error(err);
  console.log("came in set reminder");
  userData.forEach((data: any) => {
    const { city, fiqah, slack_id } = data.dataValues;
    setReminder(city, fiqah, slack_id);
  });
};
export { setReminder, setReminderForAll };

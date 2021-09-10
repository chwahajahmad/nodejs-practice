import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getTimezoneOffset } from '../../utils/basic-helpers';
import { findPrayerTimeByCityAndFiqah } from '../../models/prayerTime.models';
import { postMessage } from '../../services/slackTasks';
import { users } from '../../models/users.models';
import { to } from 'await-to-js';

dayjs.extend(utc);
dayjs.extend(timezone);

export const setReminder = async (
  city: string,
  fiqah: string,
  channel: string,
) => {
  if (!city || !fiqah) throw new Error('City or Fiqah Missing');
  const [err, res]: any = await to(findPrayerTimeByCityAndFiqah(city, fiqah));
  if (err) throw new Error('Error Finding Prayer Data');
  if (res.length <= 0) return;

  const prayerTimes = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  prayerTimes.forEach((namazName) => {
    const timezone = res[0].dataValues.data.location.timezone;
    const timeStampNow = dayjs().unix();
    let day = dayjs().add(getTimezoneOffset(timezone, dayjs()), 'hours').day();
    day === 0 ? (day = 6) : (day -= 1);
    const time = res[0].dataValues.data.datetime[day].times[namazName];
    const date = res[0].dataValues.data.datetime[day].date.gregorian;
    const message = `Its ${namazName} Time`;

    const timeStamp = dayjs.tz(`${date} ${time}`, timezone).unix();
    console.log(timeStampNow, timeStamp, day);
    if (timeStampNow < timeStamp) {
      try {
        postMessage(message, channel, timeStamp);
      } catch (err) {
        throw Error('Error Posting Alerts');
      }
    }
  });
};
export const setReminderForAll = async () => {
  const [err, userData]: any = await to(users.findAll());
  if (err) throw Error(err);

  userData.forEach((data: any) => {
    const { city, fiqah, slack_id } = data.dataValues;
    setReminder(city, fiqah, slack_id);
  });
};

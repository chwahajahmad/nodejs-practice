var cityTimezones = require('city-timezones');
const CronJob = require('cron').CronJob;
import { getSaveData, deleteAllData } from './Jobs/save-delete-data';
import { setReminderForAll } from './Jobs/dailyReminders';
const weeklyDataGetterScheduler = new CronJob(
  '02 00 * * */7',
  function () {
    deleteAllData();
    getSaveData();
  },
  null,
  true,
  'Asia/Karachi',
);

const dailyReminderScheduler = new CronJob(
  '07 00 */1 */1 *',
  function () {
    setReminderForAll();
  },
  null,
  true,
  'Asia/Karachi',
);

const cityLookup = cityTimezones.lookupViaCity('lahore');
console.log(cityLookup[0].timezone);

const data = ['Asia/Karachi', 'Asia/Karachi', 'America/Los_Angeles'];

const testScheduler = data.map(
  (data) =>
    new CronJob(
      '*/4 * * * * *',
      function () {
        console.log('You will see this message every 4 second');
      },
      null,
      true,
      data,
    ),
);

export { weeklyDataGetterScheduler, dailyReminderScheduler, testScheduler };

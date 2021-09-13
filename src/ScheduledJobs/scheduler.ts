const CronJob = require('cron').CronJob;
import { getSaveData, deleteAllData } from './Jobs/save-delete-data';
import { setReminderForAll } from './Jobs/dailyReminders';

export const weeklyDataGetterScheduler = new CronJob(
  '02 00 * * 1',
  function () {
    deleteAllData();
    getSaveData();
  },
  null,
  true,
  'Asia/Karachi',
);

export const dailyReminderScheduler = new CronJob(
  '06 00 */1 */1 *',
  function () {
    setReminderForAll();
  },
  null,
  true,
  'Asia/Karachi',
);

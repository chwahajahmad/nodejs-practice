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

export { weeklyDataGetterScheduler, dailyReminderScheduler };

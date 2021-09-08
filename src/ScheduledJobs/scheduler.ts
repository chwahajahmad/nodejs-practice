
const CronJob = require('cron').CronJob;
import { getSaveData, deleteAllData } from './Jobs/save-delete-data';
import { setReminderForAll } from './Jobs/dailyReminders';
const weeklyDataGetterScheduler = new CronJob({
  cronTime: '02 00 * * */7',
  onTick: function() {
      deleteAllData();
      getSaveData();
  },
  start: true,
  timeZone: 'Asia/Karachi'
});
const dailyReminderScheduler = new CronJob({
  cronTime: '07 00 */1 */1 *',
  onTick: function() {
      setReminderForAll();
  },
  start: true,
  timeZone: 'Asia/Karachi'
});

export { weeklyDataGetterScheduler, dailyReminderScheduler };

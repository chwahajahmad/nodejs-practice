
const CronJob = require('cron').CronJob;
import { getSaveData, deleteAllData } from './Jobs/save-delete-data';
import { setReminderForAll } from './Jobs/dailyReminders';
const weeklyDataGetterScheduler = new CronJob({
  cronTime: '40 00 * * */7',
  onTick: function() {
      console.log('CronJob ran!!');
      deleteAllData();
      getSaveData();
  },
  start: true,
  timeZone: 'Asia/Karachi'
});
const dailyReminderScheduler = new CronJob({
  cronTime: '00 02 */1 */1 *',
  onTick: function() {
      console.log('CronJob ran!!');
      setReminderForAll();
  },
  start: true,
  timeZone: 'Asia/Karachi'
});

export { weeklyDataGetterScheduler, dailyReminderScheduler };

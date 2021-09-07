
const CronJob = require('cron').CronJob;
import { getSaveData, deleteAllData } from './Jobs/save-delete-data';
import { setReminderForAll } from './Jobs/dailyReminders';
const weeklyDataGetterScheduler = new CronJob({
  // Run at 05:00 Central time, only on weekdays
  cronTime: '40 00 * * */7',
  onTick: function() {
      console.log('CronJob ran!!');
  },
  start: true,
  timeZone: 'Asia/Karachi'
});
const dailyReminderScheduler = new CronJob({
  // Run at 05:00 Central time, only on weekdays
  cronTime: '35 01 1-31 */1 *',
  onTick: function() {
      console.log('CronJob ran!!');
  },
  start: true,
  timeZone: 'Asia/Karachi'
});
// const weeklyDataGetterScheduler = schedule.scheduleJob('', () => {
//   deleteAllData();
//   getSaveData();
// }, {
//   timezone:'Asia/Karachi'
// });

// const dailyReminderScheduler = schedule.scheduleJob('26 01 1-31 */1 *', () => {
//   setReminderForAll();
// },{
//   timezone:'Asia/Karachi'
// });

export { weeklyDataGetterScheduler, dailyReminderScheduler };

const schedule = require('node-schedule');
const { getSaveData, deleteAllData } = require('./Jobs/save-delete-data');
const { setReminderForAll } = require('./Jobs/dailyReminders');
module.exports.weeklyDataGetterScheduler = schedule.scheduleJob(
  '50 23 * * */6',
  () => {
    deleteAllData();
    getSaveData();
  },
);

module.exports.dailyReminderScheduler = schedule.scheduleJob(
  '05 00 1-31 */1 *',
  () => {
    setReminderForAll();
  },
);

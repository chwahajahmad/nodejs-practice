const schedule = require('node-schedule');
const { getSaveData, deleteAllData } = require('./Jobs/save-delete-data');
const { setReminderForAll } = require('./Jobs/dailyReminders');
module.exports.weeklyDataGetterScheduler = schedule.scheduleJob(
  '02 12 * * */7',
  () => {
    deleteAllData();
    getSaveData();
  },
);

module.exports.dailyReminderScheduler = schedule.scheduleJob(
  '02 00 1-31 */1 *',
  () => {
    setReminderForAll();
  },
);

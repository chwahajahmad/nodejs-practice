const schedule = require('node-schedule');
const { getSaveData, deleteAllData } = require('./Jobs/save-delete-data');

module.exports.weeklyDataGetterScheduler = schedule.scheduleJob(
  '50 23 * * */6',
  () => {
    deleteAllData();
    getSaveData();
  },
);

module.exports.dailyReminderScheduler = schedule.scheduleJob(
  '0 12 1-31 */1 *',
  () => {
    console.log('Hello');
  },
);

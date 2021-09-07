
const schedule = require ('node-schedule');
import { getSaveData, deleteAllData } from './Jobs/save-delete-data';
import { setReminderForAll } from './Jobs/dailyReminders';

const weeklyDataGetterScheduler = schedule.scheduleJob('40 00 * * */7', () => {
  deleteAllData();
  getSaveData();
}, {
  timezone:'Asia/Karachi'
});

const dailyReminderScheduler = schedule.scheduleJob('26 01 1-31 */1 *', () => {
  setReminderForAll();
},{
  timezone:'Asia/Karachi'
});

export { weeklyDataGetterScheduler, dailyReminderScheduler };

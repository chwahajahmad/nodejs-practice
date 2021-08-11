const schedule = require('node-schedule');
const { getSaveData, deleteAllData } = require('./Jobs/save-delete-data');
module.exports = schedule.scheduleJob('* * * * * 7', () => {
  deleteAllData();
  getSaveData();
});

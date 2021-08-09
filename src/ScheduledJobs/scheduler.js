const schedule = require('node-schedule');

module.exports = schedule.scheduleJob('* * * * * 7', () => {
  console.log('Hello');
});

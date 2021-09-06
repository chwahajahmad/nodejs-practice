const dailyReminders = require('./dailyReminders');

const weeklyDataOperations = require('./save-delete-data');

module.exports = { ...dailyReminders, ...weeklyDataOperations };

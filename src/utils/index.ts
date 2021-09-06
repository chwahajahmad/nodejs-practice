export { }
const sendRes = require('./resSender');
const PrayerTimesUtils = require('./prayerTime.utils');
const findOneUser = require('./users.utils');

module.exports = { ...sendRes, ...PrayerTimesUtils,... findOneUser };

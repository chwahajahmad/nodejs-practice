const express = require('express');
const postgre = require('./db.conn');
const scheduler = require('./ScheduledJobs/scheduler');
const dailyReminderScheduler = require('./ScheduledJobs/Jobs/dailyReminders');
const subscribeRoute = require('./routes/subscribe');
const unsubscribeRoute = require('./routes/unsubscribe');
const helpRoute = require('./routes/help');
const updateFiqahRoute = require('./routes/updateFiqah');
const updateCityRoute = require('./routes/updateCity');

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/subscribe', subscribeRoute);
app.use('/unsubscribe', unsubscribeRoute);
app.use('/helpforprayertimes', helpRoute);
app.use('/updatecity', updateCityRoute);
app.use('/updatefiqah', updateFiqahRoute);

app.listen(port, () => console.log(`Running Successfully at ${port}`));

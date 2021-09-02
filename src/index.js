const express = require('express');
const postgre = require('./db.conn');
const scheduler = require('./ScheduledJobs/scheduler');
const dailyReminderScheduler = require('./ScheduledJobs/Jobs/dailyReminders');
const slackRoutes = require('./routes/SlackCrudRoutes');
const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/slack-routes', slackRoutes());

app.listen(port, () => console.log(`Running Successfully at ${port}`));

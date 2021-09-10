import express from 'express';
import postgre from './db.conn';
// please change to imports instead of require

const scheduler = require('./ScheduledJobs/scheduler');
const dailyReminderScheduler = require('./ScheduledJobs/Jobs/dailyReminders');
const slackRoutes = require('./routes/SlackCrudRoutes');
const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/slack-routes', slackRoutes());

app.listen(port, () => console.log(`Running Successfully at ${port}`));

export default app;
import express from 'express';
import postgre from './db.conn';
import * as scheduler from './ScheduledJobs/scheduler';
import slackRoutes from './routes/SlackCrudRoutes';
const app = express();
const port = process.env.PORT || 3002;
scheduler.dailyReminderScheduler.start();
scheduler.weeklyDataGetterScheduler.start();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/slack-routes', slackRoutes());

app.listen(port, () => console.log(`Running Successfully at ${port}`));

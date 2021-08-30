const express = require('express');
const postgre = require('./db.conn');
const scheduler = require('./ScheduledJobs/scheduler');

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Welcome TO Slack Prayer Bot!'));
app.listen(port, () => console.log(`Running Successfully at ${port}`));

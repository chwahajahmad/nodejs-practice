const express = require('express');
const sequelize = require('./db-config');
const path = require('path');
const getlist = require('./prayerAlertApis/apis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use('/api', getlist);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

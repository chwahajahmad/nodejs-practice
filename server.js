const express = require('express');
const sequelize = require('./db-config');
const path = require('path');

const app = express();
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to bezkoder application.' });
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

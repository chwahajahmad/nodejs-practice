const express = require('express');
const postgre = require('./db.config');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log('Running Successfully at 3000'));

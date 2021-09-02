const express = require('express');
const { addUser } = require('../controller/users.controller');
const axios = require('axios');
const router = express.Router();

router.post('/', (req, res) => {
  addUser(req, res);
});
module.exports = router;

const express = require('express');
const WorldCities = require('worldcities');
const { deleteUser } = require('../controller/users.controller');
const axios = require('axios');
const router = express.Router();

router.post('/', (req, res) => {
  res.status(200).send('Working on IT.');
  if (req.body.command === '/unsubscribe') {
    (async () => {
      const result = await deleteUser(req, res);
      console.log(req.body);
      //   axios.post(req.body.response_url, {
      //     replace_original: true,
      //     text: result,
      //   });
    })();
  }
});

module.exports = router;

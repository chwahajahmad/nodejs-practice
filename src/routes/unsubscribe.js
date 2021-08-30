const express = require('express');
const { deleteUser } = require('../controller/users.controller');
const axios = require('axios');
const router = express.Router();

router.post('/', (req, res) => {
  res.status(200).send('Working on IT.');
  if (req.body.command === '/unsubscribe') {
    (async () => {
      const result = await deleteUser(req.body);
      axios.post(req.body.response_url, {
        replace_original: true,
        text: result.message,
      });
    })();
  }
});

module.exports = router;

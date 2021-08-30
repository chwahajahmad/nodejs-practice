const express = require('express');
const { updateCity } = require('../controller/users.controller');
const { cityValidator } = require('./subscribe');
const axios = require('axios');
const router = express.Router();

router.post('/', (req, res) => {
  if (req.body.command === '/updatecity') {
    const details = cityValidator(req.body.text.trim());
    if (!details.status) {
      res.status(200).json({
        response_type: 'ephemeral',
        text: details.message,
      });
    } else {
      req.body = {
        ...req.body,
        city: req.body.text.toLowerCase().trim(),
      };
      res.status(200).send('Got you Mate');
      (async () => {
        const result = await updateCity(req, res);

        axios.post(req.body.response_url, {
          replace_original: true,
          text: result.message,
        });
      })();
    }
  }
});

module.exports = router;

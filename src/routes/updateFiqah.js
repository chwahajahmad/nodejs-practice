const express = require('express');
const { updateFiqah } = require('../controller/users.controller');
const { fiqahValidator } = require('./subscribe');
const axios = require('axios');
const router = express.Router();

router.post('/', (req, res) => {
  if (req.body.command === '/updatefiqah') {
    const details = fiqahValidator(req.body.text.trim());
    if (!details.status) {
      res.status(200).json({
        response_type: 'ephemeral',
        text: details.message,
      });
    } else {
      req.body = {
        ...req.body,
        fiqah: req.body.text.toLowerCase().trim(),
      };
      res.status(200).send('Got you Mate');
      (async () => {
        const result = await updateFiqah(req, res);

        axios.post(req.body.response_url, {
          replace_original: true,
          text: result.message,
        });
      })();
    }
  }
});

module.exports = router;

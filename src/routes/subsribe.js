const express = require('express');
const WorldCities = require('worldcities');
const { addUser } = require('../controller/users.controller');
const axios = require('axios');
const router = express.Router();

router.post('/', (req, res) => {
  if (req.body.command === '/subscribe') {
    const details = VerifyRequest(req.body.text);
    if (!details.status) {
      res.status(200).json({
        response_type: 'ephemeral',
        text: details.message,
      });
    } else {
      res.status(200).send('Got you Mate');
      req.body = { ...req.body, ...details };
      (async () => {
        const result = await addUser(req, res);

        axios.post(req.body.response_url, {
          replace_original: 'true',
          text: result,
        });
      })();
    }
  }
});

const VerifyRequest = (text) => {
  if (
    text.length <= 0 ||
    text.indexOf('--') === -1 ||
    text.indexOf('--') === text.lastIndexOf('--')
  )
    return {
      status: false,
      message: 'Make Sure You have added City And Fiqah',
    };
  const city = text.slice(
    text.indexOf('--') + 2,
    text.charAt(text.lastIndexOf('--') - 1) === ' '
      ? text.lastIndexOf('--') - 1
      : text.lastIndexOf('--'),
  );
  const fiqah = text.slice(text.lastIndexOf('--') + 2, text.length);

  if (
    !(fiqah.toLowerCase() === 'jafari' || fiqah.toLowerCase() === 'hanafi') ||
    WorldCities.getByName(city) === undefined
  )
    return { status: false, message: 'Fiqah Should Be Jafari or Hanafi' };
  return { status: true, city: city.toLowerCase(), fiqah: fiqah.toLowerCase() };
};
// VerifyRequest('--lahores --Hanfi');
module.exports = router;

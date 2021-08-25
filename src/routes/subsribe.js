const express = require('express');
const WorldCities = require('worldcities');
const operations = require('../controller/users.controller');
const axios = require('axios');
const router = express.Router();
router.post('/', (req, res) => {
  console.log('here');
  if (req.body.command === '/subscribe') {
    const details = VerifyRequest(req.body.text);
    if (!details) {
      res.status(200).json({
        response_type: 'ephemeral',
        text: "Sorry, Slash Commando, that didn't work. Please try again.",
      });
    } else {
      res.status(200).send('Got you Mate');
      req.body = { ...req.body, ...details };
      const addData = (async () => {
        const result = await operations.addUser(req, res);
        let text;
        result
          ? (text = 'Request Successful.')
          : (text = 'Something Went Wrong.');
        axios.post(req.body.response_url, {
          replace_original: 'true',
          text,
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
    return false;
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
    return false;
  return { city: city.toLowerCase(), fiqah: fiqah.toLowerCase() };
};
// VerifyRequest('--lahores --Hanfi');
module.exports = router;

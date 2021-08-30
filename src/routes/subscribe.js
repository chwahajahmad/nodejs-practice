const express = require('express');
const WorldCities = require('worldcities');
const { addUser } = require('../controller/users.controller');
const axios = require('axios');
const router = express.Router();

router.post('/', (req, res) => {
  if (req.body.command === '/subscribe') {
    if (req.body.channel_name === 'directmessage') {
      const details = VerifyRequest(req.body.text);
      if (!details.status) {
        res.status(200).json({
          response_type: 'ephemeral',
          text: details.message,
        });
      } else {
        console.log(req.body);
        res.status(200).send('Got you Mate');
        req.body = { ...req.body, ...details };
        (async () => {
          const result = await addUser(req, res);

          axios.post(req.body.response_url, {
            replace_original: true,
            text: result,
          });
        })();
      }
    } else {
      res
        .status(200)
        .send(
          'Unable to process your request. \n Please send this command in direct message with Slack Prayer Bot App.',
        );
    }
  }
});
const cityValidator = (city) => {
  city = city.trim();
  if (WorldCities.getByName(city) === undefined)
    return {
      status: false,
      message: 'City Not Found',
    };
  else
    return {
      status: true,
      message: 'All Good!',
    };
};

const fiqahValidator = (fiqah) => {
  fiqah = fiqah.trim();
  if (!(fiqah.toLowerCase() === 'jafari' || fiqah.toLowerCase() === 'hanafi'))
    return {
      status: false,
      message: 'Fiqah Should Be Hanafi or Jafari',
    };
  else
    return {
      status: true,
      message: 'All Good!',
    };
};
const VerifyRequest = (text) => {
  if (
    text.length <= 0 ||
    text.indexOf('--') === -1 ||
    text.indexOf('--') === text.lastIndexOf('--')
  )
    return {
      status: false,
      message: 'Make Sure You have added City and Fiqah',
    };
  const city = text.slice(
    text.indexOf('--') + 2,
    text.charAt(text.lastIndexOf('--') - 1) === ' '
      ? text.lastIndexOf('--') - 1
      : text.lastIndexOf('--'),
  );
  const fiqah = text.slice(text.lastIndexOf('--') + 2, text.length);

  const fiqahValidation = fiqahValidator(fiqah);
  const cityValidation = cityValidator(city);

  if (!fiqahValidation.status) return fiqahValidation;
  if (!cityValidation.status) return cityValidation;

  return { status: true, city: city.toLowerCase(), fiqah: fiqah.toLowerCase() };
};
// VerifyRequest('--lahore --Hanfi');
module.exports = router;
module.exports.cityValidator = cityValidator;
module.exports.fiqahValidator = fiqahValidator;

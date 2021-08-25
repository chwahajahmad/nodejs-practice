const express = require('express');
const WorldCities = require('worldcities');
const router = express.Router();

router.post('/', (req, res) => {
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
      console.log(req.body);
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
    !(fiqah.toLowerCase() === 'jafri' || fiqah.toLowerCase() === 'hanfi') ||
    WorldCities.getByName(city) === undefined
  )
    return false;
  return { city, fiqah };
};
// VerifyRequest('--lahores --Hanfi');
module.exports = router;

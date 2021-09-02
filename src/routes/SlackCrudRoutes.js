const subscribeRoute = require('./subscribe');
const unsubscribeRoute = require('./unsubscribe');
const helpRoute = require('./help');
const updateFiqahRoute = require('./updateFiqah');
const updateCityRoute = require('./updateCity');
const express = require('express');
const router = express.Router();

const routes = () => {
  router.use('/subscribe', subscribeRoute);
  router.use('/unsubscribe', unsubscribeRoute);
  router.use('/helpforprayertimes', helpRoute);
  router.use('/updatecity', updateCityRoute);
  router.use('/updatefiqah', updateFiqahRoute);
  return router;
};

module.exports = routes;

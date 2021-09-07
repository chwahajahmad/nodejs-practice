import subscribeRoute from './subscribe';
import unsubscribeRoute from './unsubscribe';
import helpRoute from './help';
import updateFiqahRoute from './updateFiqah';
import updateCityRoute from './updateCity';
import express from 'express';
const router = express.Router();

const routes = () => {
  router.use('/subscribe', subscribeRoute);
  router.use('/unsubscribe', unsubscribeRoute);
  router.use('/helpforprayertimes', helpRoute);
  router.use('/updatecity', updateCityRoute);
  router.use('/updatefiqah', updateFiqahRoute);
  return router;
};

export default routes;

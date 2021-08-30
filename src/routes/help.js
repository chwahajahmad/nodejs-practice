const express = require('express');
const router = express.Router();

const blockData = {
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: "Hey there 👋 I'm Prayer Bot. I'm here to remind you to offer prayer.\nYou can subscribe to alerts using following command:",
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Use the `/subscribe` command*. Type `/subscribe` followed by --your city --your fiqah. Try it out by using the `/task` command in this channel.',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'What if you want to unsubscribe?',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Use the `/unsubscribe` command*. Type `/unsubscribe`. Try it out by using the `/unsubscribe` command in this channel.',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'If you have moved to new city:',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Use the `/updatecity` command*. Type `/updatecity` followed by your city name. Try it out by using the `/updatecity` command in this channel.',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'To Change Fiqah:',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Use the `/updatefiqah` command*. Type `/updatefiqah` followed by your fiqah. Try it out by using the `/updatefiqah` command in this channel.',
      },
    },
    {
      type: 'divider',
    },
  ],
};
router.post('/', (req, res) => {
  if (req.body.command === '/helpforprayertimes') {
    res.status(200).json(blockData);
  }
});
module.exports = router;

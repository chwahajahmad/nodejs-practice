import express, { Request, Response } from 'express';
const router = express.Router();
const blockData = {
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: "Hey there 👋 I'm Prayer Reminder Bot. I'm here to remind you to offer prayer. You have to subscribe to get alerts . You can subscribe to alerts using following command:",
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Use the `/subscribe` command*. Type `/subscribe` followed by --your city --your fiqah. Make sure to use this command in direct message. Try it out by using the `/subscribe` command in this channel.\n `Note: If your city contain spaces, replace space with "-" sign.`',
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

router.post('/', (req: Request, res: Response) => {
  if (req.body.command === '/helpforprayertimes') {
    res.status(200).json(blockData);
  }
});
export default router;

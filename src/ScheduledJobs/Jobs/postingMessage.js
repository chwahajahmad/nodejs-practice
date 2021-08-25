const { WebClient } = require('@slack/web-api');
const dayjs = require('dayjs');
const token = 'xoxb-2408994401491-2409016581235-aNfHwYGcAPlIpfuN7mhLKwtW';

const web = new WebClient(token);
// const getList = (async () => {
//   const res = await web.chat.scheduledMessages.list({
//     channel: 'U02BXNRLBQD',
//   });
//   console.log(res.error);
// })();

module.exports = async (text, channel, post_at) => {
  const result = await web.chat.scheduleMessage({
    text,
    channel,
    post_at,
  });

  console.log(
    `Successfully send message: ${text} in conversation @${channel} at ${dayjs.unix(
      post_at,
    )}`,
  );
};

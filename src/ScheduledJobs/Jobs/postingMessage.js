const { WebClient } = require('@slack/web-api');

const token = 'xoxb-2408994401491-2409016581235-daKxlAv6ihVPT1ewvjV3NNOP';

const web = new WebClient(token);

module.exports = async (text, channel, post_at) => {
  const result = await web.chat.scheduleMessage({
    text,
    channel,
    post_at,
  });

  console.log(`Successfully send message ${result.ts} in conversation`);
};

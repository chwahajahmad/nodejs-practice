const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv').config();
const token = process.env.SLACKBOT_OAUTH_TOKEN;

const web = new WebClient(token);
const getScheduledMessages = async (channel) => {
  return web.chat.scheduledMessages.list({
    channel,
  });
};

const deleteScheduledMessage = async (channel) => {
  const messages = await getScheduledMessages(channel);

  messages.scheduled_messages.forEach((data) => {
    web.chat
      .deleteScheduledMessage({
        channel: data.channel_id,
        scheduled_message_id: data.id,
      })
      .then((res) => console.log(res));
  });
};

const postMessage = async (text, channel, post_at) => {
  return await web.chat.scheduleMessage({
    text,
    channel,
    post_at,
  });
};

module.exports = { deleteScheduledMessage, postMessage, getScheduledMessages };

const web = require('../slack.conn');

const getScheduledMessages = (channel) => {
  return web.chat.scheduledMessages.list({
    channel,
  });
};

const deleteScheduledMessage = async (channel) => {
  try {
    const messages = await getScheduledMessages(channel);

    if (!messages) return;
    messages.scheduled_messages.forEach((data) => {
      try {
        web.chat.deleteScheduledMessage({
          channel: data.channel_id,
          scheduled_message_id: data.id,
        });
      } catch (err) {
        throw Error('Error Deleting Scheduled Messages');
      }
    });
  } catch (err) {
    throw Error('Error Getting Scheduled Messages list');
  }
};

const postMessage = (text, channel, post_at) => {
  return web.chat.scheduleMessage({
    text,
    channel,
    post_at,
  });
};

module.exports = { deleteScheduledMessage, postMessage, getScheduledMessages };

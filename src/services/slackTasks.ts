export {};
const web = require('../slack.conn');
const { to } = require('await-to-js');
const getScheduledMessages = (channel: string) => {
  return web.chat.scheduledMessages.list({
    channel,
  });
};

const deleteScheduledMessage = async (channel: string) => {
  const [errGettingMsg, messages] = await to(getScheduledMessages(channel));
  if (errGettingMsg) throw Error('Error Getting Scheduled Messages list');
  messages.scheduled_messages.forEach((data: any) => {
    try {
      web.chat.deleteScheduledMessage({
        channel: data.channel_id,
        scheduled_message_id: data.id,
      });
    } catch (err) {
      throw Error('Error Deleting Scheduled Messages');
    }
  });
};

const postMessage = (text: string, channel: string, post_at: number) => {
  return web.chat.scheduleMessage({
    text,
    channel,
    post_at,
  });
};

module.exports = { deleteScheduledMessage, postMessage, getScheduledMessages };

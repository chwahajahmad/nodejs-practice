const webs = require('../slack.conn');
import { to } from 'await-to-js';
const getScheduledMessages = (channel: string) => {
  return webs.chat.scheduledMessages.list({
    channel,
  });
};

const deleteScheduledMessage = async (channel: string) => {
  const [errGettingMsg, messages]: any = await to(
    getScheduledMessages(channel),
  );
  if (errGettingMsg) throw Error('Error Getting Scheduled Messages list');
  messages.scheduled_messages.forEach((data: any) => {
    try {
      webs.chat.deleteScheduledMessage({
        channel: data.channel_id,
        scheduled_message_id: data.id,
      });
    } catch (err) {
      throw Error('Error Deleting Scheduled Messages');
    }
  });
};

const postMessage = (text: string, channel: string, post_at: number) => {
  return webs.chat.scheduleMessage({
    text,
    channel,
    post_at,
  });
};

export { deleteScheduledMessage, postMessage, getScheduledMessages };

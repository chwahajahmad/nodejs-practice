const web = require('../slack.conn');
import { to } from 'await-to-js';

export const getScheduledMessages = (channel: string) => {
  return web.chat.scheduledMessages.list({
    channel,
  });
};

export const deleteScheduledMessage = async (channel: string) => {
  const [errGettingMsg, messages]: any = await to(
    getScheduledMessages(channel),
  );
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

export const postMessage = (text: string, channel: string, post_at: number) => {
  return web.chat.scheduleMessage({
    text,
    channel,
    post_at,
  });
};

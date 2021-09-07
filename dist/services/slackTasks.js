"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web = require('../slack.conn');
const { to } = require('await-to-js');
const getScheduledMessages = (channel) => {
    return web.chat.scheduledMessages.list({
        channel,
    });
};
const deleteScheduledMessage = async (channel) => {
    const [errGettingMsg, messages] = await to(getScheduledMessages(channel));
    if (errGettingMsg)
        throw Error('Error Getting Scheduled Messages list');
    messages.scheduled_messages.forEach((data) => {
        try {
            web.chat.deleteScheduledMessage({
                channel: data.channel_id,
                scheduled_message_id: data.id,
            });
        }
        catch (err) {
            throw Error('Error Deleting Scheduled Messages');
        }
    });
};
const postMessage = (text, channel, post_at) => {
    return web.chat.scheduleMessage({
        text,
        channel,
        post_at,
    });
};
module.exports = { deleteScheduledMessage, postMessage, getScheduledMessages };

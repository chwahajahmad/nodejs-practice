"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sucMsgs = {
    USER_SUB: { stats: 200, msg: 'User Subscribed Successfully!' },
    CITY_UPDATE: { stats: 200, msg: 'City Updated Successfully!' },
    FIQAH_UPDATE: { stats: 200, msg: 'Fiqah Updated Successfully!' },
    DELETE_USER: { stats: 200, msg: 'User Unsubscribed Successfully!' },
};
const errMsgs = {
    INTERNAL_ERR: {
        status: 500,
        msg: 'Internal Error.',
    },
    INVALID_REQ: {
        status: 400,
        msg: 'Invalid Request',
    },
    USER_EXIST: {
        status: 400,
        msg: 'User exists already',
    },
    USER_NOT_EXIST: {
        status: 400,
        msg: 'User does not exist',
    },
    FETCH_USER_DATA: {
        status: 502,
        msg: 'Error Fetching User Data',
    },
    FETCH_CITY_DATA: {
        status: 502,
        msg: 'City Data not found!',
    },
    CREATING_USER: {
        status: 502,
        msg: 'Error Creating User',
    },
    REMINDER_SET: {
        status: 500,
        msg: 'Error Setting Reminder',
    },
    DELETE_SCH_MSG: {
        status: 500,
        msg: 'Error Deleting Scheduled Messages',
    },
    DELETE_USER: {
        status: 500,
        msg: 'Error Deleting User',
    },
    UPDATE_USER: {
        status: 500,
        msg: 'Error Updating User Data',
    },
    SUB_INVALID_LOC: {
        status: 400,
        msg: 'Unable to process your request. \n Please send this command in direct message with Slack Prayer Bot App.',
    },
    SAME_FIQAH: {
        status: 400,
        msg: 'You have already subscribed for given fiqah',
    },
    SAME_CITY: {
        status: 400,
        msg: 'You have already subscribed for given City',
    },
};
module.exports = { sucMsgs, errMsgs };

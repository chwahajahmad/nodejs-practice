"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user = require('../models/users.models');
const { deleteScheduledMessage } = require('../services/slackTasks');
const { cityFiqahSeperator, fiqahValidator, userSchema, } = require('../utils/inputValidation/users-validation.utils');
const { getSaveDataForSingleUser, setReminder, } = require('../ScheduledJobs/Jobs/index');
const { sendRes, findOneUser } = require('../utils/index');
const { errMsgs, sucMsgs } = require('../utils/constants/responseMessages');
const { to } = require('await-to-js');
const addUser = async (req, res, _next) => {
    const result = userSchema(false).validate(req.body);
    if (result.error)
        return sendRes(res, errMsgs.INVALID_REQ.msg);
    if (req.body.channel_name !== 'directmessage')
        return sendRes(res, errMsgs.SUB_INVALID_LOC.msg);
    const params = cityFiqahSeperator(req.body.text);
    if (!params.status)
        return sendRes(res, params.message);
    const { city, fiqah } = params;
    const { user_id, user_name, channel_id } = req.body;
    const [errUserData, userData] = await to(findOneUser(user_id));
    if (userData)
        return sendRes(res, errMsgs.USER_EXIST.msg);
    if (errUserData)
        return sendRes(res, errMsgs.FETCH_USER_DATA.msg);
    const [errSaveData] = await to(getSaveDataForSingleUser(city, fiqah));
    if (errSaveData)
        return sendRes(res, errMsgs.FETCH_CITY_DATA.msg);
    const [errUserCreate, userCreate] = await to(user.create({
        slack_id: user_id,
        fiqah,
        city,
        name: user_name,
        channel_id,
    }));
    if (!userCreate)
        return sendRes(res, errMsgs.CREATING_USER.msg);
    if (errUserCreate)
        return sendRes(res, errMsgs.INTERNAL_ERR.msg);
    const [errReminder] = await to(setReminder(city, fiqah, user_id));
    if (errReminder)
        return sendRes(res, errMsgs.REMINDER_SET.msg);
    return sendRes(res, sucMsgs.USER_SUB.msg);
};
const deleteUser = async (req, res, _next) => {
    const result = userSchema(true).validate(req.body);
    if (result.error)
        return sendRes(res, errMsgs.INVALID_REQ.msg);
    const { user_id: slack_id } = req.body;
    const [errFetchingUser, userExist] = await to(findOneUser(slack_id));
    if (errFetchingUser)
        return sendRes(res, errMsgs.FETCH_USER_DATA.msg);
    if (!userExist)
        return sendRes(res, errMsgs.USER_NOT_EXIST.msg);
    const [errScheduleMsg] = await to(deleteScheduledMessage(userExist.dataValues.channel_id));
    if (errScheduleMsg)
        return sendRes(res, errMsgs.DELETE_SCH_MSG.msg);
    const [errDestroy] = await to(user.destroy({ where: { slack_id } }));
    if (errDestroy)
        return sendRes(res, errMsgs.DELETE_USER);
    return sendRes(res, sucMsgs.DELETE_USER.msg);
};
const updateFiqah = async (req, res, _next) => {
    const result = userSchema(false).validate(req.body);
    if (result.error)
        return sendRes(res, errMsgs.INVALID_REQ.msg);
    const fiqah = req.body.text.trim();
    const slack_id = req.body.user_id;
    const details = fiqahValidator(fiqah);
    if (!details.status)
        return res.status(200).json({
            text: details.message,
        });
    const [userFetchError, userExist] = await to(findOneUser(slack_id));
    if (userFetchError)
        return sendRes(res, errMsgs.FETCH_USER_DATA.msg);
    if (!userExist)
        return sendRes(res, errMsgs.USER_NOT_EXIST.msg);
    if (userExist.dataValues.fiqah === fiqah)
        return sendRes(res, errMsgs.SAME_FIQAH.msg);
    const { channel_id } = userExist.dataValues;
    const [errDeleteMsg] = await to(deleteScheduledMessage(channel_id));
    if (errDeleteMsg)
        return sendRes(res, errMsgs.DELETE_SCH_MSG.msg);
    const [saveDataErr] = await to(getSaveDataForSingleUser(userExist.dataValues.city, fiqah));
    if (saveDataErr)
        return sendRes(res, errMsgs.FETCH_CITY_DATA.msg);
    const [errSetReminder] = await to(setReminder(userExist.dataValues.city, fiqah, slack_id));
    if (errSetReminder)
        return sendRes(res, errMsgs.REMINDER_SET.msg);
    const [errUpdate] = await to(user.update({ fiqah }, { where: { slack_id } }));
    if (errUpdate)
        return sendRes(res, errMsgs.UPDATE_USER.msg);
    return sendRes(res, sucMsgs.FIQAH_UPDATE.msg);
};
const updateCity = async (req, res, _next) => {
    const result = userSchema(false).validate(req.body);
    if (result.error)
        return sendRes(res, errMsgs.INVALID_REQ.msg);
    const city = req.body.text.trim();
    const slack_id = req.body.user_id;
    const [userFetchErr, userExist] = await to(findOneUser(slack_id));
    if (!userExist)
        return sendRes(res, errMsgs.USER_NOT_EXIST.msg);
    if (userFetchErr)
        return sendRes(res, errMsgs.FETCH_USER_DATA.msg);
    if (userExist.dataValues.city === city)
        return sendRes(res, errMsgs.SAME_CITY.msg);
    const { channel_id } = userExist.dataValues;
    const [saveDataErr] = await to(getSaveDataForSingleUser(city, userExist.dataValues.fiqah));
    if (saveDataErr)
        return sendRes(res, errMsgs.FETCH_CITY_DATA.msg);
    const [deleteErr] = await to(deleteScheduledMessage(channel_id));
    if (deleteErr)
        return sendRes(res, errMsgs.DELETE_SCH_MSG.msg);
    const [reminderErr] = await to(setReminder(city, userExist.dataValues.fiqah, slack_id));
    if (reminderErr)
        return sendRes(res, errMsgs.REMINDER_SET.msg);
    const [updateErr] = await to(user.update({ city }, { where: { slack_id } }));
    if (updateErr)
        return sendRes(res, errMsgs.UPDATE_USER.msg);
    return sendRes(res, sucMsgs.CITY_UPDATE.msg);
};
module.exports = {
    addUser,
    deleteUser,
    updateFiqah,
    updateCity,
};

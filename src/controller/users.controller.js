const user = require('../models/users.models');
const { deleteScheduledMessage } = require('../services/slackTasks');
const { findOneUser } = require('../utils/users.utils');
const {
  VerifyRequest,
  fiqahValidator,
  cityValidator,
} = require('../utils/inputValidation/users-validation.utils');
const savePrayerData = require('../ScheduledJobs/Jobs/save-delete-data');
const reminders = require('../ScheduledJobs/Jobs/dailyReminders');
const sendRes = require('../utils/resSender');
const { errMsgs, sucMsgs } = require('../utils/constants/responseMessages');

const addUser = async (req, res, _next) => {
  if (!req.body.channel_name || !req.body.user_id || !req.body.user_name)
    return sendRes(res, errMsgs.INTERNAL_ERR.msg);

  if (req.body.channel_name !== 'directmessage')
    return sendRes(res, errMsgs.SUB_INVALID_LOC.msg);

  const params = VerifyRequest(req.body.text);

  if (!params.status) return sendRes(res, params.message);

  const { city, fiqah } = params;
  const { user_id, user_name, channel_id } = req.body;

  try {
    const userExists = await findOneUser(user_id);
    if (userExists) return sendRes(res, errMsgs.USER_EXIST.msg);
  } catch (err) {
    return sendRes(res, errMsgs.FETCH_USER_DATA.msg);
  }

  try {
    await savePrayerData.getSaveDataForSingleUser(city, fiqah);
  } catch (err) {
    return sendRes(res, errMsgs.FETCH_CITY_DATA.msg);
  }

  try {
    const userData = await user.create({
      slack_id: user_id,
      fiqah,
      city,
      name: user_name,
      channel_id,
    });
    if (!userData) return sendRes(res, errMsgs.CREATING_USER.msg);
  } catch (err) {
    return sendRes(res, errMsgs.INTERNAL_ERR.msg);
  }

  try {
    await reminders.setReminder({
      ...req.body,
      city,
      fiqah,
      slack_id: user_id,
    });
  } catch (err) {
    return sendRes(res, errMsgs.REMINDER_SET.msg);
  }

  return sendRes(res, sucMsgs.USER_SUB.msg);
};

const deleteUser = async (req, res, _next) => {
  if (!req.body.channel_name || !req.body.user_id || !req.body.user_name)
    return sendRes(res, errMsgs.INVALID_REQ.msg);

  const { user_id: slack_id } = req.body;

  const userExist = await findOneUser(slack_id);

  if (!userExist) return sendRes(res, errMsgs.USER_NOT_EXIST.msg);

  try {
    deleteScheduledMessage(userExist.dataValues.channel_id);
  } catch (err) {
    return sendRes(res, errMsgs.DELETE_SCH_MSG.msg);
  }

  try {
    await user.destroy({
      where: {
        slack_id,
      },
    });
  } catch (err) {
    return sendRes(res, errMsgs.DELETE_USER);
  }

  return sendRes(res, sucMsgs.DELETE_USER.msg);
};

const updateFiqah = async (req, res, _next) => {
  if (!req.body.text || !req.body.user_id)
    return sendRes(res, errMsgs.INVALID_REQ.msg);

  const fiqah = req.body.text.trim();
  const slack_id = req.body.user_id;

  const details = fiqahValidator(fiqah);
  if (!details.status)
    return res.status(200).json({
      text: details.message,
    });

  try {
    const userExist = await findOneUser(slack_id);
    if (!userExist) return sendRes(res, errMsgs.USER_NOT_EXIST.msg);
    if (userExist.dataValues.fiqah === fiqah)
      return sendRes(res, errMsgs.SAME_FIQAH.msg);

    const { channel_id } = userExist.dataValues;

    try {
      await savePrayerData.getSaveDataForSingleUser(
        userExist.dataValues.city,
        fiqah,
      );
    } catch (err) {
      return sendRes(res, errMsgs.FETCH_CITY_DATA.msg);
    }
    try {
      deleteScheduledMessage(channel_id);
    } catch (err) {
      return sendRes(res, errMsgs.DELETE_SCH_MSG.msg);
    }
    try {
      await reminders.setReminder({
        ...req.body,
        city: userExist.dataValues.city,
        slack_id,
        fiqah,
      });
    } catch (err) {
      return sendRes(res, errMsgs.REMINDER_SET.msg);
    }
  } catch (err) {
    return sendRes(res, errMsgs.FETCH_USER_DATA.msg);
  }
  try {
    await user.update(
      {
        fiqah,
      },
      {
        where: {
          slack_id,
        },
      },
    );
  } catch (err) {
    return sendRes(res, errMsgs.UPDATE_USER.msg);
  }

  return sendRes(res, sucMsgs.FIQAH_UPDATE.msg);
};

const updateCity = async (req, res, _next) => {
  if (!req.body.text || !req.body.user_id)
    return sendRes(res, errMsgs.INVALID_REQ.msg);

  const city = req.body.text.trim();
  const slack_id = req.body.user_id;

  const details = cityValidator(city);
  if (!details.status) return sendRes(res, details.message);

  try {
    const userExist = await findOneUser(slack_id);
    if (!userExist) return sendRes(res, errMsgs.USER_NOT_EXIST.msg);
    if (userExist.dataValues.city === city)
      return sendRes(res, errMsgs.SAME_CITY.msg);

    const { channel_id } = userExist.dataValues;

    try {
      await savePrayerData.getSaveDataForSingleUser(
        city,
        userExist.dataValues.fiqah,
      );
    } catch (err) {
      return sendRes(res, errMsgs.FETCH_CITY_DATA.msg);
    }
    try {
      deleteScheduledMessage(channel_id);
    } catch (err) {
      return sendRes(res, errMsgs.DELETE_SCH_MSG.msg);
    }
    try {
      await reminders.setReminder({
        ...req.body,
        fiqah: userExist.dataValues.fiqah,
        slack_id,
        city,
      });
    } catch (err) {
      return sendRes(res, errMsgs.REMINDER_SET.msg);
    }
  } catch (err) {
    return sendRes(res, errMsgs.FETCH_USER_DATA.msg);
  }
  try {
    await user.update(
      {
        city,
      },
      {
        where: {
          slack_id,
        },
      },
    );
  } catch (err) {
    return sendRes(res, errMsgs.UPDATE_USER.msg);
  }

  return sendRes(res, sucMsgs.CITY_UPDATE.msg);
};

module.exports = {
  addUser,
  deleteUser,
  updateFiqah,
  updateCity,
};

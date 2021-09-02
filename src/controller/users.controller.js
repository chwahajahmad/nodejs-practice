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

const addUser = async (req, res, _next) => {
  if (!req.body.channel_name || !req.body.user_id || !req.body.user_name)
    return res.status(200).json({ text: 'Missing Necessary data' });

  if (req.body.channel_name !== 'directmessage')
    return res.status(200).json({
      text: 'Unable to process your request. \n Please send this command in direct message with Slack Prayer Bot App.',
    });

  const params = VerifyRequest(req.body.text);

  if (!params.status) return res.status(200).json({ text: params.message });

  const { city, fiqah } = params;
  const { user_id, user_name, channel_id } = req.body;

  try {
    const userExists = await findOneUser(user_id);
    if (userExists)
      return res.status(200).json({ text: 'User Already Exists' });
  } catch (err) {
    return res.status(200).json({ text: 'Error Fetching User Data' });
  }

  try {
    await savePrayerData.getSaveDataForSingleUser(city, fiqah);
  } catch (err) {
    return res
      .status(200)
      .json({ text: 'Error Getting/Saving Prayer Data(City not Found)' });
  }

  try {
    const userData = await user.create({
      slack_id: user_id,
      fiqah,
      city,
      name: user_name,
      channel_id,
    });
    if (!userData) return res.status(200).json({ text: 'Error Creating User' });
  } catch (err) {
    return res.status(200).json({ text: 'Internal Error(User Creation)' });
  }

  try {
    await reminders.setReminder({
      ...req.body,
      city,
      fiqah,
      slack_id: user_id,
    });
  } catch (err) {
    return res.status(200).json({ text: 'Error Setting Reminder' });
  }

  return res.status(200).json({ text: 'You have subscribed Successfully' });
};

const deleteUser = async (req, res, _next) => {
  if (!req.body.channel_name || !req.body.user_id || !req.body.user_name)
    return res.status(200).json({ text: 'Missing Necessary data' });

  const { user_id: slack_id } = req.body;

  const userExist = await findOneUser(slack_id);

  if (!userExist) return res.status(200).json({ text: 'User Does not Exist!' });

  try {
    deleteScheduledMessage(userExist.dataValues.channel_id);
  } catch (err) {
    return res.status(200).json({ text: 'Error Deleting Scheduled Messages!' });
  }

  try {
    await user.destroy({
      where: {
        slack_id,
      },
    });
  } catch (err) {
    res.status(200).json({ text: 'Error Deleting User!' });
  }

  return res
    .status(200)
    .json({ text: 'You will not receive reminders anymore!' });
};

const updateFiqah = async (req, res, _next) => {
  if (!req.body.text || !req.body.user_id)
    return res.status(200).json({ text: 'Invalid Input!' });

  const fiqah = req.body.text.trim();
  const slack_id = req.body.user_id;

  const details = fiqahValidator(fiqah);
  if (!details.status)
    return res.status(200).json({
      text: details.message,
    });

  try {
    const userExist = await findOneUser(slack_id);
    if (!userExist)
      return res.status(200).json({ text: 'You have not Subscribed!' });
    if (userExist.dataValues.fiqah === fiqah)
      return res
        .status(200)
        .json({ text: 'You have already subscribed for same fiqah!' });

    const { channel_id } = userExist.dataValues;

    try {
      await savePrayerData.getSaveDataForSingleUser(
        userExist.dataValues.city,
        fiqah,
      );
    } catch (err) {
      return res.status(200).json({ text: 'Error Saving Data for city' });
    }
    try {
      deleteScheduledMessage(channel_id);
    } catch (err) {
      return res.status(200).json({ text: 'Error Deleting Scheduled Message' });
    }
    try {
      await reminders.setReminder({
        ...req.body,
        city: userExist.dataValues.city,
        slack_id,
        fiqah,
      });
    } catch (err) {
      return res.status(200).json({ text: 'Error Setting reminder' });
    }
  } catch (err) {
    return res.status(200).json({ text: 'Error fetching user' });
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
    return res.status(200).json({ text: 'Error fetching user' });
  }

  return res.status(200).json({
    text: `You have now subscribed for Fiqah *${fiqah.toUpperCase()}*`,
  });
};

const updateCity = async (req, res, _next) => {
  if (!req.body.text || !req.body.user_id)
    return res.status(200).json({ text: 'Invalid Input!' });

  const city = req.body.text.trim();
  const slack_id = req.body.user_id;

  const details = cityValidator(city);
  if (!details.status)
    return res.status(200).json({
      text: details.message,
    });

  try {
    const userExist = await findOneUser(slack_id);
    if (!userExist)
      return res.status(200).json({ text: 'You have not Subscribed!' });
    if (userExist.dataValues.city === city)
      return res
        .status(200)
        .json({ text: 'You have already subscribed for same city!' });

    const { channel_id } = userExist.dataValues;

    try {
      await savePrayerData.getSaveDataForSingleUser(
        city,
        userExist.dataValues.fiqah,
      );
    } catch (err) {
      return res.status(200).json({ text: 'Error Saving Data for city' });
    }
    try {
      deleteScheduledMessage(channel_id);
    } catch (err) {
      return res.status(200).json({ text: 'Error Deleting Scheduled Message' });
    }
    try {
      await reminders.setReminder({
        ...req.body,
        fiqah: userExist.dataValues.fiqah,
        slack_id,
        city,
      });
    } catch (err) {
      return res.status(200).json({ text: 'Error Setting reminder' });
    }
  } catch (err) {
    return res.status(200).json({ text: 'Error fetching user' });
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
    return res.status(200).json({ text: 'Error fetching user' });
  }

  return res.status(200).json({
    text: `You have now subscribed for City *${city.toUpperCase()}*`,
  });
};

module.exports = {
  addUser,
  deleteUser,
  updateFiqah,
  updateCity,
};

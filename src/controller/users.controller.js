const user = require('../models/users.models');
const { deleteScheduledMessage } = require('../ScheduledJobs/Jobs/slackTasks');
const { findOneUser } = require('../utils/users.utils');
const {
  VerifyRequest,
} = require('../utils/inputValidation/users-validation.utils');
const savePrayerData = require('../ScheduledJobs/Jobs/save-delete-data');
const reminders = require('../ScheduledJobs/Jobs/dailyReminders');

const addUser = async (req, res) => {
  if (!req.body.channel_name || !req.body.user_id || !req.body.user_name)
    return res.status(200).json({ text: 'Missing Necessary data' });

  if (req.body.channel_name !== 'directmessage')
    return res.status(200).json({
      text: 'Unable to process your request. \n Please send this command in direct message with Slack Prayer Bot App.',
    });

  const params = VerifyRequest(req.body.text);

  if (!params.status) res.status(200).json({ text: params.message });

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
    const userData = await user.create({
      slack_id: user_id,
      fiqah,
      city,
      name: user_name,
      channel_id,
    });
    if (!userData) return res.status(200).json({ text: 'Error Creating User' });
  } catch (error) {
    return res.status(200).json({ text: 'Internal Error(User Creation)' });
  }
  try {
    await savePrayerData.getSaveDataForSingleUser(city, fiqah);
  } catch (err) {
    return res.status(200).json({ text: 'Error Gettin/Saving Prayer Data' });
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

const deleteUser = async (req) => {
  const userExist = await findOneUser(req.user_id);
  if (userExist) {
    deleteScheduledMessage(userExist.dataValues.channel_id);

    await user
      .destroy({
        where: {
          slack_id: req.user_id,
        },
      })
      .catch(() => {
        return {
          status: false,
          message: 'Error Processing Request',
        };
      });
    return { status: true, message: 'You will not recieve any reminders!' };
  }
  return { status: false, message: 'User does not Exist' };
};
const updateFiqah = async (req) => {
  const userExist = await findOneUser(req.body.user_id);
  if (userExist) {
    if (userExist.dataValues.fiqah === req.body.fiqah)
      return { status: false, message: 'Your current fiqah is also same!' };
    const isUpdated = await user.update(
      {
        fiqah: req.body.fiqah,
      },
      {
        where: {
          slack_id: req.body.user_id,
        },
      },
    );
    if (isUpdated) {
      const savePrayerData = require('../ScheduledJobs/Jobs/save-delete-data');
      const reminders = require('../ScheduledJobs/Jobs/dailyReminders');

      deleteScheduledMessage(userExist.dataValues.channel_id);

      await savePrayerData.getSaveDataForSingleUser(
        userExist.dataValues.city,
        req.body.fiqah,
      );

      await reminders.setReminder({
        ...req.body,
        city: userExist.dataValues.city,
        slack_id: req.body.user_id,
      });

      return {
        status: true,
        message: `You have now subscribed for Fiqah *${req.body.text
          .toUpperCase()
          .trim()}*`,
      };
    }
    return { status: false, message: 'Internal Error' };
  }
  return { status: false, message: 'User Does not exist' };
};
const updateCity = async (req) => {
  const userExist = await findOneUser(req.body.user_id);
  if (userExist) {
    if (userExist.dataValues.city === req.body.city)
      return { status: false, message: 'Your current city is also same' };
    const isUpdated = await user.update(
      {
        city: req.body.city,
      },
      {
        where: {
          slack_id: req.body.user_id,
        },
      },
    );
    if (isUpdated) {
      const savePrayerData = require('../ScheduledJobs/Jobs/save-delete-data');
      const reminders = require('../ScheduledJobs/Jobs/dailyReminders');

      deleteScheduledMessage(userExist.dataValues.channel_id);

      await savePrayerData.getSaveDataForSingleUser(
        req.body.city,
        userExist.dataValues.fiqah,
      );

      await reminders.setReminder({
        ...req.body,
        fiqah: userExist.dataValues.fiqah,
        slack_id: req.body.user_id,
      });
      return {
        status: true,
        message: `You have now subscribed for *${req.body.text
          .toUpperCase()
          .trim()}*`,
      };
    }
    return { status: false, message: 'Internal Error' };
  }

  return { status: true, message: 'User Does not exist' };
};
module.exports = {
  addUser,
  findOneUser,
  deleteUser,
  updateFiqah,
  updateCity,
};

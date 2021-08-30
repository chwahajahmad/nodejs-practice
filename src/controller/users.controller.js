const user = require('../models/users.models');
const { deleteScheduledMessage } = require('../ScheduledJobs/Jobs/slackTasks');

const addUser = async (req, res) => {
  const { user_id, fiqah, city, user_name } = req.body;
  console.log(req.body);
  const userExists = await findOneUser(user_id);
  if (userExists) return 'User Already Exists';
  else {
    const userData = await user.create({
      slack_id: user_id,
      fiqah,
      city,
      name: user_name,
    });
    if (userData) {
      const savePrayerData = require('../ScheduledJobs/Jobs/save-delete-data');
      const reminders = require('../ScheduledJobs/Jobs/dailyReminders');

      savePrayerData.getSaveDataForSingleUser(city, fiqah);
      reminders.setReminder({ ...req.body, slack_id: user_id, newUser: true });
      return 'Request Successful';
    }
    return 'Request Unsuccessful';
  }
};

const updateChannel = async (channel_id, slack_id) => {
  return await user.update(
    {
      channel_id,
    },
    {
      where: {
        slack_id,
      },
    },
  );
};
const findOneUser = async (id) => {
  if (id)
    return await user
      .findOne({
        where: {
          slack_id: id,
        },
      })
      .catch((err) => {
        throw Error(err);
      });
};

const findAllUsers = async () => {
  return await user.findAll().catch((error) => {
    throw Error(error);
  });
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
    return { status: false, message: 'You will not recieve any reminders!' };
  }
  return { status: false, message: 'User does not Exist' };
};
// deleteUser('U02BXNRLBQD');
const updateFiqah = async (req, res) => {
  const userExist = await findOneUser(req.body.user_id);
  if (userExist) {
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

      savePrayerData.getSaveDataForSingleUser(
        userExist.dataValues.city,
        req.body.fiqah,
      );
      reminders.setReminder({
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
const updateCity = async (req, res) => {
  const userExist = await findOneUser(req.body.user_id);
  if (userExist) {
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

      savePrayerData.getSaveDataForSingleUser(
        req.body.city,
        userExist.dataValues.fiqah,
      );
      reminders.setReminder({
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
  findAllUsers,
  deleteUser,
  updateChannel,
  updateFiqah,
  updateCity,
};

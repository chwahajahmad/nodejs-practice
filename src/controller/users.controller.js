const user = require('../models/users.models');
const { deleteScheduledMessage } = require('../ScheduledJobs/Jobs/slackTasks');

const addUser = async (req, res) => {
  // Wrap in try Catch with multiple catch blocks
  try{
  const { user_id, fiqah, city, user_name, channel_id } = req.body;
  const userExists = await findOneUser(user_id);

  // Avoid having nested if or large if blocks
  if (!userExists) throw new Error('User Already Exists');

  
  const userData = await user.create({
    slack_id: user_id,
    fiqah,
    city,
    name: user_name,
    channel_id,
  });

  if (!userData) 
    return res.status(501).json({ status: false, message: 'Internal Error' });
  // DB oberations should be in models.
  // Call those opertions in Controllers. 
  // Controller is interacting with either a interface or a user

  const savePrayerData = require('../ScheduledJobs/Jobs/save-delete-data');
  const reminders = require('../ScheduledJobs/Jobs/dailyReminders');

  await savePrayerData.getSaveDataForSingleUser(city, fiqah);
  await reminders.setReminder({ ...req.body, slack_id: user_id });

  return res.status(200).json({ status: true, message: 'Request Successful', });
  
}catch(err UserAlreadyExists) {
  // Always send Responses
  res.send(401).json('User already Exists');
}catch (err MissingField){

};

// functions not interaction directly with interface or user should be in helpers/utils
// event, events should trigger from services or events. 
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
const findOneUser = (id) => {
  if (id)
    return user.findOne({
      where: {
        slack_id: id,
      },
    });
};

const findAllUsers = () => user.findAll();

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
  findAllUsers,
  deleteUser,
  updateChannel,
  updateFiqah,
  updateCity,
};

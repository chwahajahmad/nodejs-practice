const user = require('../models/users.models');
const {
  getSaveDataForSingleUser,
} = require('../ScheduledJobs/Jobs/save-delete-data');
const reminders = require('../ScheduledJobs/Jobs/dailyReminders');
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
      getSaveDataForSingleUser(city, fiqah);
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

const deleteUser = async (req, res) => {
  const userExist = await findOneUser(req.user_id);
  console.log(userExist);
  if (userExist) {
    console.log('USER:', userExist);
    // deleteScheduledMessage(userExi)
    // return await user
    //   .destroy({
    //     where: {
    //       slack_id,
    //     },
    //   })
    //   .catch(() => {
    //     return {
    //       status: false,
    //       message: 'You will not recieve any reminders!',
    //     };
    //   });
  }
  return { status: false, message: 'User does not Exist' };
};
// deleteUser('U02BXNRLBQD');
// const updateFiqah = async (slack_id, fiqah) => {
//   return await user.update(
//     {
//       fiqah,
//     },
//     {
//       where: {
//         slack_id,
//       },
//     },
//   );
// };
// const updateCity = async (slack_id, fiqah) => {
//   return await user.update(
//     {
//       fiqah,
//     },
//     {
//       where: {
//         slack_id,
//       },
//     },
//   );
// };

const prayerTimesController = {
  addUser,
  findOneUser,
  findAllUsers,
  deleteUser,
  updateChannel,
  // updateCity,
  // updateFiqah,
};

module.exports = prayerTimesController;

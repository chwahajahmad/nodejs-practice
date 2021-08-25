const user = require('../models/users.models');
const { setReminder } = require('../ScheduledJobs/Jobs/dailyReminders');
const {
  getSaveDataForSingleUser,
} = require('../ScheduledJobs/Jobs/save-delete-data');

const addUser = async (req, res) => {
  const { user_id, fiqah, city, user_name } = req.body;
  console.log(req.body);
  const userExists = await findOneUser(user_id);
  if (userExists) return false;
  else {
    const userData = await user.create({
      slack_id: user_id,
      fiqah,
      city,
      name: user_name,
    });
    if (userData) {
      getSaveDataForSingleUser(city, fiqah);
      setReminder(req.body);
      return true;
    }
  }
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

const deleteUser = async (slack_id) => {
  return await user
    .destroy({
      where: {
        slack_id,
      },
    })
    .catch((error) => {
      throw Error(error);
    });
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
  // updateCity,
  // updateFiqah,
};

module.exports = prayerTimesController;

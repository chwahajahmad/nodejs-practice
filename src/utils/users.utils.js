const user = require('../models/users.models');

const findOneUser = (id) => {
  if (!id) return []; //Validation
  return user.findOne({
    where: {
      slack_id: id,
    },
  });
};

module.exports = { findOneUser };

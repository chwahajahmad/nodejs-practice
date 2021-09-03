const Joi = require('joi');

const userSchema = Joi.object()
  .keys({
    command: Joi.string().required(),
    text: Joi.string().required(),
    response_url: Joi.string().required(),
    user_id: Joi.string().required(),
    user_name: Joi.string().required(),
    channel_id: Joi.string().required(),
    channel_name: Joi.string().required(),
  })
  .unknown(true);

module.exports = userSchema;

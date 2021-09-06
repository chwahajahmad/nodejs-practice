export { }
const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv').config();
const token = process.env.SLACKBOT_OAUTH_TOKEN;

const web = new WebClient(token);

module.exports = web;

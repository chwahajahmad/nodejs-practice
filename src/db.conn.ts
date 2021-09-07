export {};
const Sequelize = require('sequelize');
const config = require('./config/config.json');

let creds;
process.env.NODE_ENV
  ? (creds = config[process.env.NODE_ENV])
  : (creds = config['development']);

const postgresConn = new Sequelize(
  `postgres://${creds.username}:${creds.password}@${creds.host}:${creds.port}/${creds.database}`,
);

postgresConn
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = postgresConn;

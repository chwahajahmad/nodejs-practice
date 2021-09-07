export {};
const Sequelize = require('sequelize');
const config = require('./config/config.json');

let databaseUrl,
  creds = config['development'];
process.env.NODE_ENV === 'production'
  ? (databaseUrl = process.env.DATABASE_URL)
  : (databaseUrl = `postgres://${creds.username}:${creds.password}@${creds.host}:${creds.port}/${creds.database}`);

const postgresConn = new Sequelize(databaseUrl);

postgresConn
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = postgresConn;

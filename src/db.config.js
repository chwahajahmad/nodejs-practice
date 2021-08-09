const Sequelize = require('sequelize');

const postgresConn = new Sequelize(
  'postgres://wahaj_choudhry:12345@localhost:5432/prayerTime-DB',
);

postgresConn
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = postgresConn;

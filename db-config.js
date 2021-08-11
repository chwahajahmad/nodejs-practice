const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('prayerAlert', 'postgres', '0990', {
  host: 'localhost',
  dialect: 'postgres',
});

try {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  });
} catch (err) {
  console.error('Unable to connect to the database:', err);
}
module.exports = sequelize;

const Sequelize = require('sequelize');
import * as config from './config/config.json';

let databaseUrl,
creds = config['development'];
process.env.NODE_ENV === 'production'
? (databaseUrl = `${process.env.DATABASE_URL}?sslmode=require`)
: (databaseUrl = `postgres://${creds.username}:${creds.password}@${creds.host}:${creds.port}/${creds.database}`);

   

const postgresConn = new Sequelize(databaseUrl,{
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ...(process.env.NODE_ENV && {ssl: {
      require: true,
      rejectUnauthorized: false, 
    }})
  }
});
postgresConn
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });

export default postgresConn;

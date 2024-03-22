import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  "username": "root", //process.env.DB_USERNAME,
  "password": "LOZINKA", //process.env.DB_PASSWORD,
  host: "mysql_server", //process.env.DB_HOST,
  dialect: 'mysql',
  database: "ISA2022", //process.env.DB_NAME,
  storage: ':memory:',
  models: [__dirname + '/../models']
});

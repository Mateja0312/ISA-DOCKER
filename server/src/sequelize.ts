import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  host: 'mysql_server',
  dialect: 'mysql',
  database: process.env.DB_NAME,
  storage: ':memory:',
  models: [__dirname + '/../models']
});

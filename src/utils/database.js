const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  logging: false,
  //ojo esta linea se pone para poder correr en render, pero para poder correrlo aqui 
  //como local hay que quitarlo. solo es para correr en el render
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
});

module.exports = db;

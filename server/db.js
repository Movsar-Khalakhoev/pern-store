const config = require('./config')
const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
  config.DB_NAME, // Название БД
  config.DB_USER, // Пользователь
  config.DB_PASSWORD, // Пароль
  {
    dialect: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT
  }
)

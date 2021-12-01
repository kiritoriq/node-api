// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('db_sipandu', 'postgres', 'password13', {
//     host: '103.171.85.34',
//     dialect: 'postgres'
// });

// module.exports = {
//     DataTypes, sequelize
// }

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'sipandu.org',
  database: 'db_sipandu',
  password: 'password13',
  port: 5432,
})

module.exports = pool;
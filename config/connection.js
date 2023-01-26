const Sequelize = require('sequelize');
require('dotenv').config();
//import * as pg from 'pg';

let sequelize

if (process.env.RENDER) {
  console.log("Got to Render")
  sequelize = new Sequelize(process.env.RENDERDB,{
    dialect: 'postgres'
  });
} else if (process.env.CYCLIC_URL) {
  console.log("Got to CYCLIC")
} else {
  sequelize = new Sequelize(
      process.env.DB_NAME, 
      process.env.DB_USER, 
      process.env.DB_PASSWORD, 
      {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        dialectOptions: {
          decimalNumbers: true,
        },
      } 
  ); 
}

module.exports = sequelize;
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from "mysql2"
dotenv.config(); 

/*console.log(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    process.env.DATABASE_HOST
)*/

const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: false,
    dialectModule: mysql2
  }
);

async function connection() {
    try {
      await db.authenticate();
      console.log('successful');
    } catch (error) {
      console.error('not successful', error);
    }
  }
  
  connection();

export default db;

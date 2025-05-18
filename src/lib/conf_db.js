import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg';
Sequelize.postgres = pg;

dotenv.config(); 

/*console.log(
    process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
    process.env.POSTGRES_HOST
)*/

const db = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    port: 5432,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: false,
    dialectModule: pg,
     dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false 
    }
  }
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

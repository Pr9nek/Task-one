import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();
const { DB_PORT = '', DB_HOST, DB_USER = '', DB_PASSWORD, DB_DATABASE = '', DB_SYNCHRONIZE } = process.env;

const sequelize = new Sequelize(
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: parseInt(DB_PORT, 10),
        dialect: 'postgres',
        logging: false,
    }
);

if (DB_SYNCHRONIZE === 'true') {
    sequelize.sync();
}

export { sequelize };
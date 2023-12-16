import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, {  dirname } from 'path';

dotenv.config({
    path: path.join(__dirname, '..', '.env')
});

export const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
};
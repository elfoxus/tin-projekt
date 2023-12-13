import mysql from 'mysql2';
import {dbConfig} from "../config.js";

const pool = mysql.createPool(dbConfig);

export default pool.promise();
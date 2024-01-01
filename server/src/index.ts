import dotenv from "dotenv";
import path from 'path';

dotenv.config({
    path: path.join(__dirname, '..', '.env')
});

import express, {Application} from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { router } from './routes/routes'
import { prisma } from "./services/db/prisma";
import { logger } from "./middleware/logger";
import errorHandler  from "./middleware/errorHandler";
import multer from "multer";


const app: Application = express();

app.use(logger);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(multer({
    storage: multer.memoryStorage()
}).fields([
    {name: 'image', maxCount: 1}
]))
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(express.static(path.join(__dirname, '..', 'public'))); // static files
app.use('/images', express.static(path.join(__dirname, '..', 'images'))); // static files
// api
app.use('/api', router);
// serve react app files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.use(errorHandler);

console.log('Starting server...');
databaseTest()
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.log('Error connecting to database.');
        console.log(err);
    });
const port = process.env.SERVER_PORT;
const server = app.listen(port, () => {
    console.log(`Server available at: http://localhost:${port}`);
});

async function databaseTest() {
    return prisma.$connect();
}




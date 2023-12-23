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


const app: Application = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
}))
app.use(express.static(path.join(__dirname, '..', 'public'))); // static files
app.use('/images', express.static(path.join(__dirname, '..', 'images'))); // static files
// api
app.use('/api', router);
// serve react app files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

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




import express, {Application} from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import { router } from './routes/routes'
import { PrismaClient } from '@prisma/client'
import dotenv from "dotenv";

dotenv.config({
    path: path.join(__dirname, '..', '.env')
});

const app: Application = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public'))); // static files
// api
app.use('/api', router)
// serve react app files
app.use('*', (req, res) => {
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
    const prisma = new PrismaClient();
    return await prisma.$connect();
}




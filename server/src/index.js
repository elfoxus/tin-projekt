import express from 'express';
import path, {  dirname } from 'path';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
    path: path.join(__dirname, '..', '.env')
});

console.log(process.env.MYSQL_HOST);

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public'))); // static files


// test api
app.use('/api', (req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
})
// serve react app files
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const port = process.env.SERVER_PORT;

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
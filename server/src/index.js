import { __dirname} from "./config.js";
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import { router } from './routes/config.js'
import db from "./services/database.js";


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public'))); // static files
// api
app.use('/api', router)
// serve react app files
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

db.execute('SELECT 1')
    .then(([rows, fields]) => {
        console.log('Database connected');
    })
    .catch(err => {
        console.log('Error connecting to database.');
        console.log(err);
    });

console.log('Starting server...');
const port = process.env.SERVER_PORT;
const server = app.listen(port, () => {
    console.log(`Server available at: http://localhost:${port}`);
});





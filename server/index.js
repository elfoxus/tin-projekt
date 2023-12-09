const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join('..', 'client', 'build'))); // static files


app.use('/api', (req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
})
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const port = 3000;

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
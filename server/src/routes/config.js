import express from 'express';

export const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/test', (req, res) => {
    res.send('Test route');
});

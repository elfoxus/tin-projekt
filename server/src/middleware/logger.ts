import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const logs  = 'logs';
const dir = path.join(process.cwd(), logs);

function assertDirExists(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true});
    }
}

const logEvents = async  (message: string, logFileName: string) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const logMessage = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        assertDirExists(dir);
        fs.appendFileSync(path.join(dir, logFileName), logMessage);
    } catch (err) {
        console.log('Error saving log', err);
    }
}

const logger = (req: Request, res: Response, next: NextFunction) => {
    logEvents(`${req.method}\t${req.originalUrl}\t${req.headers.origin}`, 'requests.log'); // it will generate a lot of logs
    console.log(`${req.method} ${req.path}`);
    next();
}

export { logger, logEvents };
import { logEvents} from "./logger";
import {Request, Response, NextFunction} from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logEvents(
        `${err.name}: ${err.message}\t${req.method}\t${req.originalUrl}\t${req.headers.origin}`,
        'errors.log');
    console.log(err.stack);

    const status = res.statusCode ? res.statusCode : 500;
    res.status(status)
        .json({
            message: err.message,
        });
};

export default errorHandler;
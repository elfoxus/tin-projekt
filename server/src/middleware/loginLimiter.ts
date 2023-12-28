import rateLimit from "express-rate-limit";
import {logEvents} from "./logger";

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 5, // limit each IP to 5 requests per windowMs
    message: { message: "Too many login attempts from this IP, please try again after a minute" },
    handler: (req, res, next, options) => {
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.originalUrl}\t${req.headers.origin}`, 'errors.log');
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false
});

export default loginLimiter;
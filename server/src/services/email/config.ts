import {Options} from "nodemailer/lib/smtp-connection";
import nodemailer from "nodemailer";

const config: Options = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT as unknown as number,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}

const transport = nodemailer.createTransport(config);

export default transport;
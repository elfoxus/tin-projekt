import SMTPTransport from "nodemailer/lib/smtp-transport";
import transport from "./config";

export async function sendEmail(email: string, token: string): Promise<SMTPTransport.SentMessageInfo> {
        const message = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Registration',
            text: `Activate your account here: ${process.env.APP_URL}activate/${token}`
        };

    return transport.sendMail(message);
}
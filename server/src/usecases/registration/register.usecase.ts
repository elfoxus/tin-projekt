import { v4 } from "uuid";
import {Registration, RegistrationRequest} from "../../model/registration";
import {sendEmail} from "../../services/email/register.email";
import {prisma} from "../../services/db/prisma";
import bcrypt from "bcrypt";


export default function register(registration: RegistrationRequest): void {
    // create token
    const token = v4();
    const saltRounds = 10;
    // async as recommended by bcrypt
    bcrypt.hash(registration.password, saltRounds, (err, hash) => {
        // create registration
        const regData: Registration = {
            username: registration.username,
            email: registration.email,
            password: hash,
            create_time: new Date(),
            token: token
        };

        //async save to db then send email
        prisma.registration.create({data: {...regData}})
            .then(() => {
                console.log('Registration saved to database.');
                sendEmail(registration.email, token)
                    .then(() => console.log('Registration email sent to: ' + registration.email))
                    .catch(err => console.log('Error sending registration email to: ' + registration.email, err));
            })
            .catch(err => console.log('Error saving registration to database.', err));
    });
}

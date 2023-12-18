import {PrismaClient} from "@prisma/client";
import {prisma} from "../../services/db/prisma";


export default function activate(token: string): Promise<void> {
    return prisma.registration.findFirst({
            where: {
                token: token
            }
        })
        .then(reg => {
            if (!reg) {
                throw new Error('Registration not found.');
            }

            console.log('Registration found.');
            // do something with the registration
        })
}
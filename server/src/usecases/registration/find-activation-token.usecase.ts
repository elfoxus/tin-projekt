import {prisma} from "../../services/db/prisma";
import {UserActivationData} from "../../model/user";


export default function findActivationToken(token: string): Promise<UserActivationData | null> {
    return prisma.registration.findFirst({
            where: {
                token: token
            }
        }).then(registration => {
            return registration ? {
                email: registration.email,
                password: registration.password,
                role: 'USER',
                username: registration.username,
                activate_time: new Date()
            } : null;
        })
}
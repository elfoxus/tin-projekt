import {User, UserActivationData} from "../../model/user";
import {prisma} from "../../services/db/prisma";

export const createNewUser = (user: UserActivationData): Promise<User> => {
    return prisma.user.create({
        data: {
            username: user.username,
            password: user.password,
            role: user.role,
            email: user.email,
            activate_time: user.activate_time
        }
    }).then(user => {
        return {
            username: user.username,
            role: user.role
        }
    })
}

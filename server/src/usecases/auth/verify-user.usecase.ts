import {prisma} from "../../services/db/prisma";
import {User} from "../../model/user";

export const verifyUser = (username: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: {
            username: username
        }
    }).then((user) => {
        if (!user) {
            return null
        }
        return {
            username: user?.username,
            role: user?.role
        }
    });
}
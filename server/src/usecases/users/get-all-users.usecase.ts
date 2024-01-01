import {prisma} from "../../services/db/prisma";

export default function getAllUsers(): Promise<any> {
    return prisma.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            activate_time: true,
            role: true,
            recipe: true
        }
    })
}
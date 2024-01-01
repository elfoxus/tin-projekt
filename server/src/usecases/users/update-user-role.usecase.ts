import {prisma} from "../../services/db/prisma";

export default function updateUserRole(id: number, role: 'USER' | 'ADMIN' | 'MODERATOR'): Promise<any> {
    return prisma.user.update({
        where: {
            id: id,
            NOT: {
                username: 'admin'
            }
        },
        data: {
            role: role
        },
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
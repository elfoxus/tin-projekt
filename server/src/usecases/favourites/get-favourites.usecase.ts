import {prisma} from "../../services/db/prisma";

export default function getFavourites(username: string): Promise<any> {
    return prisma.favourite_recipes.findMany({
        where: {
            user: {
                is: {
                    username: username
                }
            }
        },
        select: {
            recipe: true
        }
    }).then(data => {
        return data.map(item => item.recipe);
    })
}
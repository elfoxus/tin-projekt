import {prisma} from "../../services/db/prisma";

export default function getAllDishes(): Promise<any[]> {
    return prisma.dish.findMany({
        orderBy: {
            name: 'asc'
        }
    }).then(dishes => {
        return dishes.map(dish => {
            return dish.name
        })
    })
}
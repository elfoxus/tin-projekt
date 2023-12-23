import {prisma} from "../../services/db/prisma";

export default function getAllCategories(): Promise<any[]> {
    return prisma.category.findMany({
        orderBy: {
            name: 'asc'
        }
    }).then(categories => {
        return categories.map(category => {
            return category.name
        })
    })
}
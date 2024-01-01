import {prisma} from "../../services/db/prisma";

export default function getAllTags(): Promise<any[]> {
    return prisma.tag.findMany({
        orderBy: {
            name: 'asc'
        }
    }).then(tags => {
        return tags.map(tag => {
            return tag.name
        })
    })
}
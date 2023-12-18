import {prisma} from "../../services/db/prisma";


export default function getAllRecipes(page: number = 0): void {
    var recipesPromise = prisma.recipe.findMany({
        skip: page * 12,
        take: 12,
        orderBy: {
            recipe_rating: {
                _count: 'desc'
            }
        }
    })
}

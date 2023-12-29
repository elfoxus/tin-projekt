import {prisma} from "../../services/db/prisma";

export default function addRatingToRecipe (recipeId: number, username: string, rating: number): Promise<any> {
    return prisma.user.findUnique({where: {username: username}})
        .then(user => {

            if (!user) {
                throw new Error("User not found");
            }

            let userId = user.id;
            return prisma.recipe_rating.upsert({
                where: {
                    recipe_id_user_id: {
                        recipe_id: recipeId,
                        user_id: userId
                    }
                },
                create: {
                    rating: rating,
                    recipe_id: recipeId,
                    user_id: userId
                },
                update: {
                    rating: rating
                }
            })
        })
        .then(data => {
            return {
                message: "Rating added"
            }
        })
}
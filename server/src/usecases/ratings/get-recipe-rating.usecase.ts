import {prisma} from "../../services/db/prisma";

export default function getRecipeRatingForUser(recipeId: number, username: string): Promise<number> {
    return prisma.user.findUnique({where: {username: username}})
        .then(user => {

            if (!user) {
                throw new Error("User not found");
            }

            let userId = user.id;
            return prisma.recipe_rating.findUnique({
                where: {
                    recipe_id_user_id: {
                        recipe_id: recipeId,
                        user_id: userId
                    }
                }
            })
        })
        .then(data => {
            if (data) {
                return data.rating;
            } else {
                return -1;
            }
        })
}
import {prisma} from "../../services/db/prisma";

export default function removeFromFavourites(recipeId: number, username: string): Promise<any> {
    return prisma.user.findUnique({where: {username: username}})
        .then(user => {

            if (!user) {
                throw new Error("User not found");
            }

            let userId = user.id;
            return prisma.favourite_recipes.deleteMany({
                where: {
                    recipe_id: recipeId,
                    user_id: userId
                }
            })
        })
        .then(data => {
            return {
                message: "Recipe removed from favourites"
            }
        })
}
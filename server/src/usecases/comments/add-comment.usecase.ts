import {prisma} from "../../services/db/prisma";


export default function addCommentToRecipe (recipeId: number, username: string, comment: string): Promise<any> {
    return prisma.user.findUnique({where: {username: username}})
        .then(user => {

            if (!user) {
                throw new Error("User not found");
            }

            let userId = user.id;
            return prisma.recipe_review.createMany({
                data:
                    {
                        date: new Date(),
                        comment: comment,
                        recipe_id: recipeId,
                        user_id: userId
                    }

            })
        })
        .then(data => {
            return {
                message: "Comment added"
            }
        })
}

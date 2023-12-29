import {prisma} from "../../services/db/prisma";
import {CommentWithRating} from "../../model/comment";

export default function getRecipeComments(id: number): Promise<CommentWithRating[]> {
    return prisma.recipe_review.findMany({
        where: {
            recipe_id: id
        },
        include: {
            user: {
                include: {
                    recipe_rating: {
                        select: {
                            rating: true
                        },
                        where: {
                            recipe_id: id
                        },
                        take: 1
                    }
                }
            }
        }
    }).then(reviews => {
        return reviews.map(review => {
            let rating = -1;
            if (review.user.recipe_rating.length === 1) {
                rating = review.user.recipe_rating[0].rating
            }
            return {
                recipe_id: review.recipe_id,
                user: {
                    id: review.user_id,
                    username: review.user.username
                },
                date: review.date,
                comment: review.comment,
                rating: rating
            }
        })
    })
}
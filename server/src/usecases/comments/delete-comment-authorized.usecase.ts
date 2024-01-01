import {prisma} from "../../services/db/prisma";

export default function deleteCommentAuthorized(commentId: number): Promise<any> {
    return prisma.recipe_review.delete({
        where: {
            id: commentId
        }
    })
        .then(data => {
            return {
                message: "Comment deleted"
            }
        })
}
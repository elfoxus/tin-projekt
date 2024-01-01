import {prisma} from "../../services/db/prisma";

export default function deleteCommentAsUser(commentId: number, username: string): Promise<any> {
    return prisma.user.findUnique({
        where: {
            username: username
        }
    }).then(user => {
        if (!user) {
            throw new Error("User not found");
        }

        return prisma.recipe_review.findUnique({
            where: {
                id: commentId
            }
        })
            .then(comment => {
                if (!comment) {
                    throw new Error("Comment not found");
                }

                if (comment.user_id !== user.id) {
                    throw new Error("Unauthorized");
                }

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
            })
    })
}
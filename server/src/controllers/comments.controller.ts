import { Request, Response } from 'express';
import deleteCommentAuthorized from "../usecases/comments/delete-comment-authorized.usecase";
import deleteCommentAsUser from "../usecases/comments/delete-comment-as-user.usecase";

const deleteComment = (req: Request, res: Response) => {
    const user = res.locals.user;

    try {
        var commentId = parseInt(req.params.commentId);
    } catch (e) {
        res.status(400).json({message: "Comment ID is required"});
        return;
    }

    if (atLeastPassRole(user.role, 'MODERATOR')) {
        deleteCommentAuthorized(commentId)
            .then(message => {
                res.status(200).json({message: message});
            }).catch(e => {
            res.status(500).json({message: "Error deleting comment"});
        })
    } else {
        deleteCommentAsUser(commentId, user.username)
            .then(message => {
                res.status(200).json({
                    message: message,
                    id: commentId
                });
            }).catch(e => {
                if (e.message === 'Unauthorized') {
                    res.status(403).json({message: e.message});
                    return;
                } else {
                    res.status(500).json({
                        message: "Error deleting comment",
                        id: commentId
                    });
                }
            })
    }

}

export {
    deleteComment
}

const roleMap = {
    'USER': 0,
    'MODERATOR': 1,
    'ADMIN': 2
}

const atLeastPassRole = (a: 'USER' | 'MODERATOR' | 'ADMIN', b: 'USER' | 'MODERATOR' | 'ADMIN') => {
    return roleMap[a] >= roleMap[b]
}
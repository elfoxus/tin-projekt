import express from 'express';
import {deleteComment} from "../controllers/comments.controller";
import verifyJWT from "../middleware/authRoutes";

const router = express.Router();

router.route('/:commentId')
    .delete(verifyJWT, deleteComment)

export default router;
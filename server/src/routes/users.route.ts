import express from "express";
import verifyJWT from "../middleware/authRoutes";
import {allUsers, newUserRole} from "../controllers/users.controller";

const router = express.Router();

router.route('/')
    .get(verifyJWT, allUsers)

router.route('/:id/role')
    .put(verifyJWT, newUserRole)

export default router
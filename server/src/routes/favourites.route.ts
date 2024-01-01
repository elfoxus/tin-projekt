import express from "express";
import verifyJWT from "../middleware/authRoutes";
import {allFavourites, deleteFavourite, newFavourite} from "../controllers/favourites.controller";

const router = express.Router();

router.route('/')
    .get(verifyJWT, allFavourites)

router.route('/:recipeId')
    .post(verifyJWT, newFavourite)
    .delete(verifyJWT, deleteFavourite)

export default router;
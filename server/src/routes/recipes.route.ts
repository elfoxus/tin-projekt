import express from "express";
import verifyJWT from "../middleware/authRoutes";
import {
    allRecipes,
    newRecipe,
    myRecipes,
    getRecipe,
    getRating,
    newRating,
    recipeComments,
    newComment,
    deleteComment,
    getRecipesByDish,
    getRecipesByCategory,
    getRecipesByTag
} from "../controllers/recipes.controller";

const router = express.Router();

router.route('/')
    .get(allRecipes)
    .post(verifyJWT, newRecipe)

router.route('/my')
    .get(verifyJWT, myRecipes)

router.route('/:id')
    .get(getRecipe)

router.route('/:id/rating')
    .get(verifyJWT, getRating)
    .post(verifyJWT, newRating)

router.route('/:id/comment')
    .get(recipeComments)
    .post(verifyJWT, newComment)
    .delete(verifyJWT, deleteComment)

router.route('/dish/:dishName')
    .get(getRecipesByDish)

router.route('/category/:categoryName')
    .get(getRecipesByCategory)

router.route('/tag/:tagName')
    .get(getRecipesByTag)

export default router
import express from 'express';
import registerController from "../controllers/registration.controller";
import recipesController from "../controllers/recipes.controller";
import categoriesController from "../controllers/categories.controller";
import dishesController from "../controllers/dishes.controller";
import authRouter from "./auth.route";
import favouritesController from "../controllers/favourites.controller";
import tagsController from "../controllers/tags.controller";
import usersController from "../controllers/users.controller";
import activationRoute from "./activation.route";

const router = express.Router();

router.use('/dishes', dishesController);
router.use('/tags', tagsController);
router.use('/categories', categoriesController);
router.use('/recipes', recipesController);
router.use('/register', registerController);
router.use('/auth', authRouter);
router.use('/activate', activationRoute);
router.use('/favourites', favouritesController);
router.use('/users', usersController);

export { router };
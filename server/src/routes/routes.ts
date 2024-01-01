import express from 'express';
import registerController from "../controllers/registration.controller";
import recipesController from "../controllers/recipes.controller";
import authRouter from "./auth.route";
import tagsController from "../controllers/tags.controller";
import usersController from "../controllers/users.controller";
import activationRoute from "./activation.route";
import categoriesRouter from "./categories.route";
import dishesRoute from "./dishes.route";
import favouritesRoute from "./favourites.route";

const router = express.Router();

router.use('/activate', activationRoute);
router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/dishes', dishesRoute);
router.use('/favourites', favouritesRoute);
router.use('/recipes', recipesController);
router.use('/register', registerController);
router.use('/tags', tagsController);
router.use('/users', usersController);

export { router };
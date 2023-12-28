import express from 'express';
import registerController from "../controllers/registration.controller";
import activationController from "../controllers/activation.controller";
import recipesController from "../controllers/recipes.controller";
import categoriesController from "../controllers/categories.controller";
import dishesController from "../controllers/dishes.controller";
import authController from "./auth.route";

const router = express.Router();

router.use('/dishes', dishesController);
router.use('/categories', categoriesController);
router.use('/recipes', recipesController);
router.use('/register', registerController);
router.use('/auth', authController);
router.use('/activate', activationController);

export { router };
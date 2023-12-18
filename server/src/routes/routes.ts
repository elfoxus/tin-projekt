import express from 'express';
import registerController from "../controllers/registration.controller";
import activationController from "../controllers/activation.controller";
import recipesController from "../controllers/recipes.controller";

const router = express.Router();

router.use('/recipes', recipesController);
router.use('/register', registerController);
router.use('/activate', activationController);

export { router };
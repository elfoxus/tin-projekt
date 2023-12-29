import express from 'express'
import loginLimiter from "../middleware/loginLimiter";
import * as authController from "../controllers/auth.controller";
import verifyJWT from "../middleware/authRoutes";

const router = express.Router();

router.route('/')
    .post(loginLimiter, authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

export default router;
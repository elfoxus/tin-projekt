import express from "express";
import {registration} from "../controllers/registration.controller";

const router = express.Router();

router.route('/')
    .post(registration)

export default router
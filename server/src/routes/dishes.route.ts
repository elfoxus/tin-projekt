import express from "express";
import {allDishes} from "../controllers/dishes.controller";

const router = express.Router();

router.route('/')
    .get(allDishes)

export default router;
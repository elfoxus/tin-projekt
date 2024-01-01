import express from "express";
import {allCategories} from "../controllers/categories.controller";

const router = express.Router();

router.route('/')
    .get(allCategories)

export default router;
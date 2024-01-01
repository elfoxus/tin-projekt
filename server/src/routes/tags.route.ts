import express from "express";
import {allTags} from "../controllers/tags.controller";

const router = express.Router();

router.route('/')
    .get(allTags)

export default router
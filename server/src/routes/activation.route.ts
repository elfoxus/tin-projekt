import express from "express";
import {activate} from "../controllers/activation.controller";

const router = express.Router();

router.route('/:token')
    .get(activate)

export default router;
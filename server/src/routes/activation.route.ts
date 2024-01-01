import express from "express";
import {activate} from "../controllers/activation.controller";

const router = express.Router();

router.get('/:token', activate)

export default router;
import express from "express";
import {activate} from "../controllers/activation.controller";

const activationController = express.Router();

activationController.get('/:token', activate)

export default activationController;
import express from "express";
import getAllCategories from "../usecases/categories/get-all-categories.usecase";

const categoriesController = express.Router();

categoriesController.route('/')
    .get((req, res) => {
        getAllCategories().then(categories => {
            res.status(200).json(categories);
        });
    });

export default categoriesController;
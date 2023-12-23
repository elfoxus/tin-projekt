import express from "express";
import getAllDishes from "../usecases/dishes/get-all-dishes.usecase";

const dishesController = express.Router();

dishesController.route('/')
    .get((req, res) => {
        getAllDishes().then(dishes => {
            res.status(200).json(dishes);
        });
    });

export default dishesController;
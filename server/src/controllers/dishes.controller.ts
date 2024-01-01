import { Request, Response } from "express";
import getAllDishes from "../usecases/dishes/get-all-dishes.usecase";


const allDishes = (req: Request, res: Response) => {
        getAllDishes().then(dishes => {
            res.status(200).json(dishes);
        });
};

export { allDishes }
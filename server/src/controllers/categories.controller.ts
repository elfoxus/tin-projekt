import { Request, Response } from "express";
import getAllCategories from "../usecases/categories/get-all-categories.usecase";


const allCategories = (req: Request, res: Response) => {
        getAllCategories().then(categories => {
            res.status(200).json(categories);
        });
    };

export { allCategories }
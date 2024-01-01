import { Request, Response } from "express";
import getAllCategories from "../usecases/categories/get-all-categories.usecase";


const getCategories = (req: Request, res: Response) => {
        getAllCategories().then(categories => {
            res.status(200).json(categories);
        });
    };

export { getCategories }
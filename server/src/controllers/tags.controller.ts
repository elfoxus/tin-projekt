import { Request, Response } from "express";
import getAllTags from "../usecases/tags/get-all-tags.usecase";


const allTags = (req: Request, res: Response) => {
    getAllTags().then(tags => {
        res.status(200).json(tags);
    });
};

export {
    allTags
}

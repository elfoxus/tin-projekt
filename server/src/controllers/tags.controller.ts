import express from "express";
import getAllTags from "../usecases/tags/get-all-tags.usecase";

const tagsController = express.Router();

tagsController.route('/')
    .get((req, res) => {
        getAllTags().then(tags => {
            res.status(200).json(tags);
        });
    });

export default tagsController;
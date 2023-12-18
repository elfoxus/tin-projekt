import express from "express";

const recipesController = express.Router();

recipesController.get('/', (req, res) => {
    var page = req.query.page;
});

export default recipesController;
import express from "express";

const activationController = express.Router();

activationController.get('/:token', (req, res) => {
    const token = req.params.token;
    // todo: activate user and authenticate and authorize as user role
    res.status(200).end();
});

export default activationController;
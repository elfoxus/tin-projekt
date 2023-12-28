import express from "express";
import findActivationToken from "../usecases/registration/find-activation-token.usecase";
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken";
import {createNewUser} from "../usecases/registration/create-new-user.usecase";
import {UserActivationData} from "../model/user";

const activationController = express.Router();

activationController.get('/:token', asyncHandler( async (req, res) => {
    const token = req.params.token;

    if (!token) {
        res.status(400).json({ message: "Token is required." });
    }

    let userData: UserActivationData | null = await findActivationToken(token);
    if(!userData) {
        res.status(401).json({ message: "Unauthorized" });
    } else {
        createNewUser(userData).then(user => {
            const accessToken = jwt.sign(
                {
                    user: user
                },
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: '15m' }
            );

            const refreshToken = jwt.sign(
                { "username": user?.username },
                process.env.REFRESH_TOKEN_SECRET as string,
                { expiresIn: '1d' }
            );

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 // same as Refresh Token expiration,
            }).json({ accessToken });
        })
    }
}));

export default activationController;
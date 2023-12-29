import { Request, Response } from "express";
import {AuthRequest} from "../model/user";
import {validateCredentials} from "../usecases/auth/validate-credentials.usecase";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"
import {verifyUser} from "../usecases/auth/verify-user.usecase";


function basicValidation(authRequest: AuthRequest) {
    return !authRequest.username || !authRequest.password;
}

const login = asyncHandler(async (req: Request, res: Response) => {
    const authRequest: AuthRequest = req.body;
    if(basicValidation(authRequest)) {
        res.status(400).json({ message: "All fields are required" });
    }
    let userData = await validateCredentials(authRequest);
    if(!userData.validated || !userData.user) {
        res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = jwt.sign(
        {
            user: userData.user
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { "username": userData.user?.username },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '1d' }
    );

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 // same as Refresh Token expiration,
    }).json({ accessToken });
});

const refresh = asyncHandler(async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) {
        res.status(401).json({ message: "Unauthorized" });
        return; // must return to avoid sending response twice
    }
    const refreshToken: string = cookies.jwt as string;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        async (err: any, user: any) => {
            if (err) {
                res.status(403).json({ message: "Forbidden" });
            }

            const foundUser = await verifyUser(user.username);
            if(!foundUser) {
                res.status(401).json({ message: "Unauthorized" });
            }

            const accessToken = jwt.sign(
                {
                    user: foundUser
                },
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: '15m' }
            )
            res.json({ accessToken });

        }
    );
});


const logout = asyncHandler(async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) {
        res.sendStatus(204)
    }
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
        .json({ message: "Logged out" });
});


export { login, refresh, logout };
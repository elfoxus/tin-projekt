import express, { Request, Response } from 'express';
import {RegistrationRequest} from "../model/registration";
import register from "../usecases/registration/register.usecase";

const registerController = express.Router();

registerController.post('/', (req: Request<{}, {}, RegistrationRequest>, res: Response) => {
    const registrationRequest: RegistrationRequest = req.body;
    register(registrationRequest);
    res.status(200).end();
})

export default registerController;
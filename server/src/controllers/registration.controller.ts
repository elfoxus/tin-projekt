import express, { Request, Response } from 'express';
import {RegistrationRequest} from "../model/registration";
import register from "../usecases/registration/register.usecase";

const registerController = express.Router();

registerController.post('/', (req: Request<{}, {}, RegistrationRequest>, res: Response) => {
    const registrationRequest: RegistrationRequest = req.body;
    basicValidation(registrationRequest)
        .then(validated => {
            register(validated);
            res.status(201).json({message: 'User registered.'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message: err})
        });
})

export default registerController;

function basicValidation(registrationRequest: RegistrationRequest): Promise<RegistrationRequest> {
    return new Promise((resolve, reject) => {
        if (!registrationRequest.username) {
            reject('Username is required.');
        }
        if (!registrationRequest.email) {
            reject('Email is required.');
        }
        if (!registrationRequest.password) {
            reject('Password is required.');
        }
        if (!registrationRequest.name) {
            reject('Name is required.');
        }
        if (!registrationRequest.surname) {
            reject('Surname is required.');
        }
        if (!registrationRequest.birthdate) {
            reject('Birthdate is required.');
        }
        if(!registrationRequest.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
            reject('Email is not valid.');
        }
        if(!registrationRequest.username.match(/^[a-zA-Z0-9_.+-]{5,45}$/)) { // 5-45 characters
            reject('Username is not valid.');
        }
        resolve(registrationRequest);
    });
}
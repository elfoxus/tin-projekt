import { Request, Response } from "express";
import {RegistrationRequest} from "../model/registration";
import register from "../usecases/registration/register.usecase";


const registration = (req: Request<{}, {}, RegistrationRequest>, res: Response) => {
    const registrationRequest: RegistrationRequest = req.body;
    basicValidation(registrationRequest)
        .then(validated => {
            register(validated);
            res.status(201).json({message: 'User registered.'});
        })
        .catch(err => {
            res.status(400)
                .json({
                    message: err.message,
                    invalidFields: err.invalidFields
                })
        });
}

function basicValidation(registrationRequest: RegistrationRequest): Promise<RegistrationRequest> {
    return new Promise((resolve, reject) => {
        const invalidFields: string[] = [];

        if (!registrationRequest.username) {
            invalidFields.push('username');
        }
        if (!registrationRequest.email) {
            invalidFields.push('email');
        }
        if (!registrationRequest.password) {
            invalidFields.push('password');
        }
        if(!registrationRequest.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
            invalidFields.push('email');
        }
        if(!registrationRequest.username.match(/^[a-zA-Z0-9_.+-]{5,45}$/)) { // 5-45 characters
            invalidFields.push('username');
        }

        if (invalidFields.length > 0) {
            const error: RegistrationValidationError = new RegistrationValidationError('Invalid fields.', invalidFields);
            reject(error);
        }

        resolve(registrationRequest);
    });
}

class RegistrationValidationError extends Error {
    invalidFields: string[];
    constructor(message: string, invalidFields: string[]) {
        super(message);
        this.invalidFields = invalidFields;
    }
}

export {
    registration
}